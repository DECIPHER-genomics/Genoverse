(function(){
  var BWReader = function(data, callback){
    // constants : bigwig/bigbed file header signatures (magic numbers) (32 bit) , can be swapped ( big-endian | BE )
    var BIG_WIG_MAGIC = 0x888FFC26;
    var BIG_WIG_MAGIC_BE = 0x26FC8F88;

    var BIG_BED_MAGIC = 0x8789F2EB;
    var BIG_BED_MAGIC_BE = 0xEBF28987;

    var CIRTREE_MAGIC = 0x78ca8c91;
    var IDXTREE_MAGIC = 0x2468ace0;

    //type of file converted to bigwig bedgraph |variable step wiggle | fixed step wiggle
    var BIG_WIG_TYPE_GRAPH = 1;
    var BIG_WIG_TYPE_VSTEP = 2;
    var BIG_WIG_TYPE_FSTEP = 3;

    //bigbed data color regex
    var BED_COLOR_REGEXP = new RegExp("^[0-9]+,[0-9]+,[0-9]+");

    var M1 = 256;
    var M2 = 256*256;
    var M3 = 256*256*256;
    var M4 = 256*256*256*256;

    var bbi = {};

    function init(){
      checkSignature();
    }

    function getData(start, length, cb){
      data.slice(start,length).fetch(function(d){
        cb(d);
      });
    }

    function checkSignature(){

      getData(0, 512, function(header){
        var ba = new Uint8Array(header);
        var sa = new Uint16Array(header);
        var la = new Uint32Array(header);
        var error;
        var magic = la[0];

        if(magic == BIG_WIG_MAGIC) bbi.type = "bigwig";
        else if(magic == BIG_BED_MAGIC) bbi.type= "bigbed";
        else if(magic == BIG_WIG_MAGIC_BE || magic == BIG_BED_MAGIC_BE){
          error = "big-endian files not supported yet!";
        }else{
          error = "unsupported file format";
        }
        if(error) callback(null,error);

        bbi.version = sa[2];
        bbi.numZoomLevels = sa[3];
        bbi.chromTreeOffset = read64Bit(ba,8);
        bbi.unzoomedDataOffset = read64Bit(ba,16);
        bbi.unzoomedIndexOffset = read64Bit(ba,24);
        bbi.fieldCount = sa[16]
        bbi.definedFieldCount = sa[17]
        bbi.asOffset = read64Bit(ba,36);
        bbi.totalSummaryOffset = read64Bit(ba,44);
        bbi.uncompressBufSize = la[13];
        bbi.extHeaderOffset = read64Bit(ba,56);
        bbi.zoomHeaders = [];

        if(bbi.uncompressBufSize>0) bbi.compressed = true;
        if(bbi.totalSummaryOffset>0) bbi.summary = true;
        if(bbi.extHeaderOffset>0) bbi.extHeader = true;

        for(var i=0; i < bbi.numZoomLevels; i++){
          var reduction = la[16+6*i];
          var dataOffset    = read64Bit(ba,72+24*i);
          var indexOffset    = read64Bit(ba,80+24*i);
          bbi.zoomHeaders.push({reductionLevel :reduction, dataOffset:dataOffset, indexOffset:indexOffset});
        }

        readAutoSQL(readChromTree); // reading autoSQL passing next task as callback
      });
    }

    // autoSQL could be present in some bigbed files
    function readAutoSQL(cb){
      var s = performance.now();
      if(bbi.asOffset==0) cb();  //no autoSQL present
      else{
        //autoSQL present!, need to parse"
        getData(bbi.asOffset,2048,function(d){
          var ba = new Uint8Array(d);
          var s = '';
          for(var i=0;i < ba.length;i++){
            if(ba[i]==0) break;
            s += String.fromCharCode(ba[i]);
          }

          var header_re = /(\w+)\s+(\w+)\s+("([^"]+)")?\s+\(\s*/;
          var field_re = /([\w\[\]]+)\s+(\w+)\s*;\s*("([^"]+)")?\s*/g;

          var headerMatch = header_re.exec(s);
          if(headerMatch){
            var as = {
              declType: headerMatch[1],
              name: headerMatch[2],
              comment: headerMatch[4],

              fields: []
            };
          }
          s = s.substring(headerMatch[0]);
          for (var m = field_re.exec(s); m != null; m = field_re.exec(s)) {
            as.fields.push({type: m[1],
              name: m[2],
              comment: m[4]});
          }
          bbi.schema = as;
          cb();
        })
      }
    }

    //reading B+ tree which maps chrom names to ids used in R-tree
    function readChromTree(){
      var len = bbi.unzoomedDataOffset - bbi.chromTreeOffset;
      len = len + (4-len%4);

      getData(bbi.chromTreeOffset,len,function(d){
        var ba = new Uint8Array(d);
        var sa = new Uint16Array(d);
        var la = new Uint32Array(d);
        var error;
        var magic = la[0];

        if(magic == CIRTREE_MAGIC){
          bbi.bpTree = {};
          bbi.bpTree.itemsPerBlock = la[1];
          bbi.bpTree.keySize = la[2];
          bbi.bpTree.valueSize = la[3];
          bbi.bpTree.itemCount = read64Bit(ba,16);

          bbi.chroms = new Array(bbi.bpTree.itemCount);
          bbi.lengths = new Array(bbi.bpTree.itemCount);
        }
        else error = "chromosome id B+ tree not found!";

        function readChromTreeLeaf(nodeOffset){
          var isLeaf = ba[nodeOffset];
          //padding 8 byte
          var children = sa[(nodeOffset/2)+1];
          var offset = nodeOffset+4;

          while(children>0){
            children--;
            var chrom = "";

            for(var j=0;j<bbi.bpTree.keySize;j++){
              var c = ba[offset+j];
              if(c!=0) chrom += String.fromCharCode(c);
            }

            offset+=bbi.bpTree.keySize;
            var idx = (ba[offset+3]<<24) | (ba[offset+2]<<16) | (ba[offset+1]<<8) | (ba[offset+0]);
            var len = (ba[offset + 7]<<24) | (ba[offset+6]<<16) | (ba[offset+5]<<8) | (ba[offset+4]);
            offset+=8;

            bbi.chroms[idx] = chrom;
            bbi.lengths[idx] = len;
          }

        }

        error ? callback(null,error) : readChromTreeLeaf(32);
        readRTreeIndex();
      });
    }

    function readRTreeIndex(){
      getData(bbi.unzoomedIndexOffset, 48, function(d){
        var ba = new Uint8Array(d);
        var sa = new Uint16Array(d);
        var la = new Uint32Array(d);
        var magic = la[0];

        var readRTreeHeader = function(){
        var Rheader = {};
          Rheader.blockSize = la[1];
          Rheader.nItems = read64Bit(ba,8);
          Rheader.chrIdxStart = la[4];
          Rheader.baseStart = la[5];
          Rheader.chrIdxEnd = la[6];
          Rheader.baseEnd = la[7];
          Rheader.endFileOffset = read64Bit(ba,32);
          Rheader.nItemsPerSlot = la[10];

          //read32Bit(ba,44); // padding 4  byte
          return Rheader;
        }

        if(magic==IDXTREE_MAGIC){
          bbi.Rheader = readRTreeHeader();
          bbi.rootOffset = bbi.unzoomedIndexOffset+48;
          bbi.getValues = getValues;
          callback(bbi);
        }else{
          callback(null,"R-tree not found!");
        }

      });
    }

    function getRTreeNode(treedata, offset){
      var ba = new Uint8Array(treedata);
      var sa = new Uint16Array(treedata);
      var la = new Uint32Array(treedata);

      var node = {};
      node.isLeaf = ba[offset];
      node.children = sa[offset/2 +1];
      offset += 4;

      node.chrIdxStart = new Array(node.children);
      node.baseStart = new Array(node.children);
      node.chrIdxEnd = new Array(node.children);
      node.baseEnd = new Array(node.children);
      node.dataOffset = new Array(node.children);
      node.x = {};

      if(node.isLeaf){
        node.x.size = new Array(node.children);
      } else {
        node.x.child = new Array(node.children);
        node.x.child.fill(-1);
      }

      for(var i = 0; i< node.children; i++){
        var lo = offset / 4;
        node.chrIdxStart[i] = la[lo];
        node.baseStart[i] = la[lo + 1];
        node.chrIdxEnd[i] = la[lo + 2];
        node.baseEnd[i] = la[lo + 3];
        node.dataOffset[i] = read64Bit(ba, offset+16);
        offset += 24;

        if(node.isLeaf){
          node.x.size[i] = read64Bit(ba, offset);
          offset += 8;
        }
      }

      return node;
    }

    function getValues(chrom, start, end, cb){
      var vals = [];
      var chromid = bbi.chroms.indexOf(chrom);
      if(chromid == -1) chromid = bbi.chroms.indexOf("chr" + chrom);
      if(chromid == -1) cb([], "chrom not found");

      var query = {
        chrom : chromid,
        start : start,
        end   : end
      };

      var traverseRTree = function(){
        var outstanding = 0;

        var fetchRTreeKids = function(offset, level){
          outstanding += offset.length;
          var min = offset[0];
          var maxNodeSize = (4 + bbi.Rheader.blockSize*32);
          var max = offset[offset.length - 1] + maxNodeSize;

          getData(min, max - min, function(treedata){
            //traverse kids
            for(var k = 0; k < offset.length; k++){
              traverseRTreeKids(treedata, offset[k] - min, level);
              --outstanding;
              if(outstanding == 0) fetchblocks();
            }
          });
        };

        var traverseRTreeKids = function(treedata, offset, level){
          var node = getRTreeNode(treedata, offset);
          var overlaps = findOverlaps(node);

          if(node.isLeaf){
            for(var j = 0; j < overlaps.length; j++){
              var key = overlaps[j];
              vals.push({offset : node.dataOffset[key], size : node.x.size[key]});
            }
            return [];
          }else{
            var recurOffsets = [];

            for(var j = 0; j< overlaps.length; j++){
              var key = overlaps[j];
              recurOffsets.push(node.dataOffset[key]);
            }

            fetchRTreeKids(recurOffsets, level+1);
          }
        }

        var findOverlaps = function(node){
          var children = node.children;
          var overlaps = [];

          for(var j = 0; j< children; j++){
            var startChrom = node.chrIdxStart[j];
            var startBase = node.baseStart[j];
            var endChrom = node.chrIdxEnd[j];
            var endBase = node.baseEnd[j];

            if (((startChrom < query.chrom) || (startChrom == query.chrom && startBase <= query.end)) && (( endChrom  > query.chrom) || (endChrom == query.chrom && endBase >= query.start))){
              overlaps.push(j);
            }
          }

          return overlaps;
        }

        fetchRTreeKids([bbi.rootOffset], 1);
      }

      var fetchblocks = function (){
        vals.sort(function(b0, b1) {
          return (b0.offset|0) - (b1.offset|0);
        });

        if(vals.length == 0) return getBlocks();

        var totalSize = 0;
        var base = vals[0].offset;

        for(var i = 0; i < vals.length; i++) totalSize += vals[i].size;

        getData(base, totalSize, function(buffer){
          var ioffset = 0;
          var bi = 0;

          while(ioffset < totalSize){
            var fb = vals[bi];
            var blockData;

            if(bbi.uncompressBufSize > 0) blockData = dallianceLib.inflateBuffer(buffer, ioffset + 2, fb.size - 2);
            else blockData = buffer.slice(ioffset, ioffset + fb.size );

            vals[bi].data = blockData;
            ioffset += fb.size;
            bi++;
          }

          getBlocks();
        });
      }

      var getBlocks = function(){
        if(vals.length == 0){
          cb([]);
        }else{
          var result = [];

          for(var i = 0; i < vals.length; i++){
            result = result.concat(processBlocks(vals[i].data, query));
          }

          cb(result);
        }
      }

      function processBlocks(data){
        if(bbi.type == "bigwig") return WiggleParser(data, query);
        else if(bbi.type == "bigbed") return BEDparser();
        else return [];
      }

      traverseRTree();
    }

    function WiggleParser(data, query){
      var arr = [];
      var ba = new Uint8Array(data);
      var sa = new Int16Array(data);
      var la = new Int32Array(data);
      var fa = new Float32Array(data);


      var chromId = la[0];
      var blockStart = la[1];
      var blockEnd = la[2];
      var itemStep = la[3];
      var itemSpan = la[4];
      var blockType = ba[20];
      var itemCount = sa[11];

      // fixedStep wiggle
      if(blockType == BIG_WIG_TYPE_FSTEP){
        for(var j = 0; j < itemCount; j++){
          var score = fa[j+6];
          var start = blockStart + j*itemStep + 1;
          var end = start + itemSpan - 1;
          if(start <= query.end && end >= query.start && chromId == query.chrom) arr.push({ chr : parseInt(bbi.chroms[chromId].replace("chr", "")), start : start, end : end, height : score});
        }
      }// variable step wiggle
      else if(blockType == BIG_WIG_TYPE_VSTEP){
        for(var j = 0; j < itemCount; j++){
          var start = la[(j*2) + 6] + 1;
          var end = start + itemSpan - 1;
          var score = fa[(j*2) + 7];
          if(start <= query.end && end >= query.start && chromId == query.chrom){
            arr.push({ chr : parseInt(bbi.chroms[chromId].replace("chr", "")), start : start, end : end, height : score });
          }
        }
      }// bedGraph
      else if(blockType == BIG_WIG_TYPE_GRAPH){
        for(var j = 0; j < itemCount; j++){
          var start = la[(j*3)+6] +1;
          var end   = la[(j*3)+7];
          var score = fa[(j*3)+8];
          if(start > end) start = end;
          if(start <= query.end && end >= query.start && chromId == query.chrom) arr.push({ chr : parseInt(bbi.chroms[chromId].replace("chr", "")), start : start, end : end, height : score});
        }
      }

      return arr;
    }

    // this huge chunk of code handles BED data parsing and should totally go into its own module for the
    // well being of our eyes >_< ( TODO : BEDparser and readAutoSQL to be shifted to BED module)
    function BEDparser(){
      while(pos < ba.length){
        var bbRecord = {};
        var dfc = bbi.definedFieldCount;

        bbRecord.chromid = read32Bit();
        bbRecord.start = read32Bit()+1;
        bbRecord.end = read32Bit();

        var customFields = [];
        var extraFields = "";
        var bedColumns;

        while(true){
          var ch = ba[pos++];
          if(ch != 0) extraFields += String.fromCharCode(ch);
          else break;
        }

        if(bbRecord.start <= bbi.query.end && bbRecord.end >= bbi.query.start && bbRecord.chromid == bbi.query.chromid){
          bbRecord.chrom = bbi.query.chromid;
          if(extraFields) bedColumns = extraFields.split('\t');

          //parsing extrafields
          if(bedColumns.length > 0 && dfc > 3) bbRecord.name = bedColumns[0];
          if(bedColumns.length > 1 && dfc > 4) bbRecord.score = parseInt(bedColumns[1]);
          if(bedColumns.length > 2 && dfc > 5) bbRecord.strand = bedColumns[2];
          if(bedColumns.length > 3 && dfc > 6) bbRecord.thickStart = parseInt(bedColumns[3]);
          if(bedColumns.length > 4 && dfc > 7) bbRecord.thickEnd = parseInt(bedColumns[4]);
          if(bedColumns.length > 5 && dfc > 8) bbRecord.itemRGB = bedColumns[5];
          if(bedColumns.length > 6 && dfc > 9) bbRecord.blockCount = bedColumns[6];
          if(bedColumns.length > 7 && dfc > 10) bbRecord.blockSizes = bedColumns[7].split(',');
          if(bedColumns.length > 8 && dfc > 11) bbRecord.blockStarts = bedColumns[8].split(',');

          if(bedColumns.length > dfc-3 && bbi.schema){
            for(var col = dfc-3; col < bedColumns.length; col++){
              customFields[bbi.schema.fields[col+3].name] = bedColumns[col];
            }
            bbRecord.customFields = customFields;
          }

          if(dfc < 12){
            bbRecord.type = 'bigbed';
            vals.push(bbRecord);
          }else{
            var spans = [];
            for(var i=0; i< parseInt(bbRecord.blockCount); i++){
              var bbRecordChild = {};
              bbRecordChild.strand = bbRecord.strand;
              bbRecordChild.score = bbRecord.score;
              bbRecordChild.chrom = bbRecord.chrom;
              bbRecordChild.start = parseInt(bbRecord.blockStarts[i])+parseInt(bbRecord.start);
              bbRecordChild.end = bbRecordChild.start + parseInt(bbRecord.blockSizes[i]) -1;
              bbRecordChild.name = bbRecord.name;
              if(bbRecord.customFields) bbRecordChild.customFields = bbRecord.customFields;
              bbRecordChild.itemRGB = bbRecord.itemRGB;
              vals.push(bbRecordChild);
              spans.push([bbRecordChild.start, bbRecordChild.end]);
            }

            if(bbRecord.thickStart && bbRecord.thickEnd > bbRecord.thickStart){
              //find intersections with blocks with [thickStart, thickEnd]
              var intersecion = [];

              for(var l = 0; l < spans.length; l++){
                if(bbRecord.thickEnd < spans[l][0]) break;
                else if(bbRecord.thickStart > spans[l][1]) continue;
                else{
                  intersecion.push(spans[l]);
                }
              }

              for(var i = 0; i < intersecion.length; i++){
                var bbRecordChild = {};
                bbRecordChild.strand = bbRecord.strand;
                bbRecordChild.score = bbRecord.score;
                bbRecordChild.chrom = bbRecord.chrom;
                bbRecordChild.type = 'translation';
                bbRecordChild.start = intersecion[i][0];
                bbRecordChild.end = intersecion[i][1];
                bbRecordChild.name = bbRecord.name;
                vals.push(bbRecordChild);
              }
            }
          }

        }
      }
    }

    function show64Bit(ba, o){
      console.log(ba[o],ba[o+1],ba[o+2],ba[o+3],ba[o+4],ba[o+5],ba[o+6],ba[o+7]);
    }

    //reads 8 bytes from data
    function read64Bit(ba, o){
      var val = ba[o] + ba[o+1]*M1 + ba[o+2]*M2 + ba[o+3]*M3 + ba[o+4]*M4;
      return val;
    }

    function readFloat(ba, o){
      var a = new Uint8Array([ba[o],ba[o+1],ba[o+2],ba[o+3]]);
      var b = a.buffer;
      var c = new Float32Array(b);
      return c[0];
    }
    //reads 4bytes from data
    function read32Bit(ba, o){
      var a = ba[o], b = ba[o+1],c=ba[o+2],d= ba[o+3];
      var r = (a | ((b<<8)>>>0) | ((c<<16)>>>0) | ((d<<24)>>>0))>>>0;
      return r;
    }

     //reads 2 bytes from data
    function read16Bit(ba, o){
      var r = (ba[o])|(ba[o+1]<<8);
      return r;
    }

    //reads 1 byte from data
    function read8Bit(ba, o){
      return ba[o];
    }

    init();
  }

  window.BWReader = BWReader;
})();
