(function () {
  var BWReader = function (data, callback) {
    // constants: bigwig/bigbed file header signatures (magic numbers) (32 bit) , can be swapped ( big-endian | BE )
    var BIG_WIG_MAGIC    = 0x888FFC26;
    var BIG_WIG_MAGIC_BE = 0x26FC8F88;

    var BIG_BED_MAGIC    = 0x8789F2EB;
    var BIG_BED_MAGIC_BE = 0xEBF28987;

    var CIRTREE_MAGIC = 0x78ca8c91;
    var IDXTREE_MAGIC = 0x2468ace0;

    // type of file converted to bigwig bedgraph |variable step wiggle | fixed step wiggle
    var BIG_WIG_TYPE_GRAPH = 1;
    var BIG_WIG_TYPE_VSTEP = 2;
    var BIG_WIG_TYPE_FSTEP = 3;

    // bigbed data color regex
    var BED_COLOR_REGEXP = new RegExp("^[0-9]+,[0-9]+,[0-9]+");

    var M1 = 256;
    var M2 = 256*256;
    var M3 = 256*256*256;
    var M4 = 256*256*256*256;

    var bbi = {
      fetchedData: new RTree()
    };

    function init() {
      checkSignature();
    }

    function getData(start, length, cb) {
      var end     = start + length;
      var fetched = bbi.fetchedData.search({ x: start, w: length, y: 0, h: 1 }).filter(function (d) { return d[0] <= start && d[1] >= end; });

      if (fetched.length == 1) {
        cb(fetched[0][2].slice(start - fetched[0][0], start + length));
      } else {
        data.slice(start, length).fetch(function (d) {
          bbi.fetchedData.insert({ x: start, w: length, y: 0, h: 1 }, [ start, start + length, d ]);
          cb(d);
        });
      }
    }

    function checkSignature() {
      getData(0, 512, function (header) {
        var ba    = new Uint8Array(header);
        var sa    = new Uint16Array(header);
        var la    = new Uint32Array(header);
        var magic = la[0];
        var error, reduction, dataOffset, indexOffset;

        if (magic === BIG_WIG_MAGIC) {
          bbi.type = 'bigwig';
        } else if (magic === BIG_BED_MAGIC) {
          bbi.type = 'bigbed';
        } else if (magic === BIG_WIG_MAGIC_BE || magic === BIG_BED_MAGIC_BE) {
          error = 'big-endian files not supported yet!';
        } else{
          error = 'unsupported file format';
        }

        if (error) {
          callback(null, error);
        }

        bbi.version             = sa[2];
        bbi.numZoomLevels       = sa[3];
        bbi.chromTreeOffset     = read64Bit(ba, 8);
        bbi.unzoomedDataOffset  = read64Bit(ba, 16);
        bbi.unzoomedIndexOffset = read64Bit(ba, 24);
        bbi.fieldCount          = sa[16];
        bbi.definedFieldCount   = sa[17];
        bbi.asOffset            = read64Bit(ba, 36);
        bbi.totalSummaryOffset  = read64Bit(ba, 44);
        bbi.uncompressBufSize   = la[13];
        bbi.extHeaderOffset     = read64Bit(ba, 56);
        bbi.compressed          = bbi.uncompressBufSize  > 0;
        bbi.summary             = bbi.totalSummaryOffset > 0;
        bbi.extHeader           = bbi.extHeaderOffset    > 0;
        bbi.zoomHeaders         = [];

        for (var i = 0; i < bbi.numZoomLevels; i++) {
          reduction   = la[16 + 6*i];
          dataOffset  = read64Bit(ba, 72 + 24*i);
          indexOffset = read64Bit(ba, 80 + 24*i);

          bbi.zoomHeaders.push({
            reductionLevel : reduction,
            dataOffset     : dataOffset,
            indexOffset    : indexOffset
          });
        }

        readAutoSQL(readChromTree); // reading autoSQL passing next task as callback
      });
    }

    // autoSQL could be present in some bigbed files
    function readAutoSQL(cb) {
      if (bbi.asOffset === 0) {
        cb(); // no autoSQL present
      } else {
        // autoSQL present, need to parse
        getData(bbi.asOffset, 2048, function (d) {
          var ba = new Uint8Array(d);
          var s  = '';

          for (var i = 0; i < ba.length; i++) {
            if (ba[i] === 0) {
              break;
            }

            s += String.fromCharCode(ba[i]);
          }

          var header_re   = /(\w+)\s+(\w+)\s+("([^"]+)")?\s*\(\s*/;
          var field_re    = /([\w\[\]]+)\s+(\w+)\s*;\s*("([^"]+)")?\s*/g;
          var headerMatch = header_re.exec(s);

          if (headerMatch) {
            var as = {
              declType : headerMatch[1],
              name     : headerMatch[2],
              comment  : headerMatch[4],
              fields   : []
            };

            s = s.substring(headerMatch[0]);

            for (var m = field_re.exec(s); m !== null; m = field_re.exec(s)) {
              as.fields.push({
                type    : m[1],
                name    : m[2],
                comment : m[4]
              });
            }

            bbi.schema = as;
          }

          cb();
        });
      }
    }

    // reading B+ tree which maps chrom names to ids used in R-tree
    function readChromTree() {
      var len = bbi.unzoomedDataOffset - bbi.chromTreeOffset;
          len = len + (4 - len%4);

      getData(bbi.chromTreeOffset, len, function (d) {
        var ba    = new Uint8Array(d);
        var sa    = new Uint16Array(d);
        var la    = new Uint32Array(d);
        var magic = la[0];
        var error;

        function readChromTreeLeaf(nodeOffset) {
          // padding 8 byte
          var children = sa[(nodeOffset/2) + 1];
          var offset   = nodeOffset + 4;
          var chrom, i, c, idx, len;

          while (children > 0) {
            children--;
            chrom = '';

            for (i = 0; i < bbi.bpTree.keySize; i++) {
              c = ba[offset + i];

              if (c !== 0) {
                chrom += String.fromCharCode(c);
              }
            }

            offset += bbi.bpTree.keySize;

            idx = (ba[offset + 3] << 24) | (ba[offset + 2] << 16) | (ba[offset + 1] << 8) | (ba[offset + 0]);
            len = (ba[offset + 7] << 24) | (ba[offset + 6] << 16) | (ba[offset + 5] << 8) | (ba[offset + 4]);

            offset += 8;

            bbi.chroms[idx]  = chrom;
            bbi.lengths[idx] = len;
          }
        }

        if (magic === CIRTREE_MAGIC) {
          bbi.bpTree = {
            itemsPerBlock : la[1],
            keySize       : la[2],
            valueSize     : la[3],
            itemCount     : read64Bit(ba, 16)
          };

          bbi.chroms  = new Array(bbi.bpTree.itemCount);
          bbi.lengths = new Array(bbi.bpTree.itemCount);
        } else {
          error = 'chromosome id B+ tree not found!';
        }

        if (error) {
          callback(null, error);
        } else {
          readChromTreeLeaf(32);
        }

        readRTreeIndex();
      });
    }

    function readRTreeIndex() {
      getData(bbi.unzoomedIndexOffset, 48, function (d) {
        var ba    = new Uint8Array(d);
        var la    = new Uint32Array(d);
        var magic = la[0];

        if (magic === IDXTREE_MAGIC) {
          bbi.Rheader = {
            blockSize     : la[1],
            nItems        : read64Bit(ba, 8),
            chrIdxStart   : la[4],
            baseStart     : la[5],
            chrIdxEnd     : la[6],
            baseEnd       : la[7],
            endFileOffset : read64Bit(ba, 32),
            nItemsPerSlot : la[10]
          };

          bbi.rootOffset = bbi.unzoomedIndexOffset + 48;
          bbi.getValues  = getValues;

          callback(bbi);
        } else {
          callback(null, 'R-tree not found!');
        }
      });
    }

    function getRTreeNode(treedata, offset) {
      var ba       = new Uint8Array(treedata);
      var sa       = new Uint16Array(treedata);
      var la       = new Uint32Array(treedata);
      var children = sa[offset/2 + 1];
      var lo, i;

      var node = {
        isLeaf      : ba[offset],
        children    : children,
        chrIdxStart : new Array(children),
        baseStart   : new Array(children),
        chrIdxEnd   : new Array(children),
        baseEnd     : new Array(children),
        dataOffset  : new Array(children),
        x           : {}
      };

      if (node.isLeaf) {
        node.x.size = new Array(children);
      } else {
        node.x.child = new Array(children);

        for (i = 0; i < children; i++) {
          node.x.child[i] = -1;
        }
      }

      offset += 4;

      for (i = 0; i < children; i++) {
        lo = offset / 4;

        node.chrIdxStart[i] = la[lo];
        node.baseStart[i]   = la[lo + 1];
        node.chrIdxEnd[i]   = la[lo + 2];
        node.baseEnd[i]     = la[lo + 3];
        node.dataOffset[i]  = read64Bit(ba, offset + 16);

        offset += 24;

        if (node.isLeaf) {
          node.x.size[i] = read64Bit(ba, offset);
          offset += 8;
        }
      }

      return node;
    }

    function getValues(chrom, start, end, cb) {
      var vals    = [];
      var chromid = bbi.chroms.indexOf(chrom);

      if (chromid == -1) {
        chromid = bbi.chroms.indexOf('chr' + chrom);

        if (chromid == -1) {
          return cb([], 'chrom not found');
        }
      }

      var query = {
        chrom : chromid,
        start : start,
        end   : end
      };

      function traverseRTree() {
        var outstanding = 0;

        function fetchRTreeKids(offset, level) {
          outstanding += offset.length;

          var min         = offset[0];
          var maxNodeSize = 4 + bbi.Rheader.blockSize*32;
          var max         = offset[offset.length - 1] + maxNodeSize;

          getData(min, max - min, function (treedata) {
            // traverse kids
            for (var i = 0; i < offset.length; i++) {
              traverseRTreeKids(treedata, offset[i] - min, level);

              if (--outstanding === 0) {
                fetchBlocks();
              }
            }
          });
        }

        function traverseRTreeKids(treedata, offset, level) {
          var node     = getRTreeNode(treedata, offset);
          var overlaps = findOverlaps(node);
          var i;

          if (node.isLeaf) {
            for (i = 0; i < overlaps.length; i++){
              vals.push({
                offset : node.dataOffset[overlaps[i]],
                size   : node.x.size[overlaps[i]]
              });
            }

            return [];
          } else {
            fetchRTreeKids(overlaps.map(function (o) { return node.dataOffset[o]; }), level + 1);
          }
        }

        function findOverlaps(node) {
          var children = node.children;
          var overlaps = [];

          for (var i = 0; i < children; i++) {
            var startChrom = node.chrIdxStart[i];
            var startBase  = node.baseStart[i];
            var endChrom   = node.chrIdxEnd[i];
            var endBase    = node.baseEnd[i];

            if (
              ((startChrom < query.chrom) || (startChrom == query.chrom && startBase <= query.end)) &&
              ((endChrom   > query.chrom) || (endChrom   == query.chrom && endBase   >= query.start))
            ) {
              overlaps.push(i);
            }
          }

          return overlaps;
        }

        fetchRTreeKids([bbi.rootOffset], 1);
      }

      function fetchBlocks() {
        vals.sort(function (b0, b1) {
          return (b0.offset | 0) - (b1.offset | 0);
        });

        if (vals.length === 0) {
          return getBlocks();
        }

        var totalSize = 0;
        var base      = vals[0].offset;

        for (var i = 0; i < vals.length; i++) {
          totalSize += vals[i].size;
        }

        getData(base, totalSize, function (buffer) {
          var ioffset = 0;
          var bi      = 0;
          var fb, blockData;

          while (ioffset < totalSize) {
            fb = vals[bi];

            if (bbi.uncompressBufSize > 0) {
              blockData = dallianceLib.inflateBuffer(buffer, ioffset + 2, fb.size - 2);
            } else {
              blockData = buffer.slice(ioffset, ioffset + fb.size);
            }

            vals[bi].data = blockData;
            ioffset      += fb.size;
            bi++;
          }

          getBlocks();
        });
      }

      function getBlocks() {
        var parser = bbi.type == 'bigwig' ? WiggleParser : bbi.type == 'bigbed' ? BEDParser : false;
        var result = [];

        if (parser && vals.length) {
          for (var i = 0; i < vals.length; i++) {
            result = result.concat(parser(vals[i].data, query));
          }
        }

        cb(result);
      }

      traverseRTree();
    }

    function WiggleParser(data, query) {
      var arr        = [];
      var ba         = new Uint8Array(data);
      var sa         = new Int16Array(data);
      var la         = new Int32Array(data);
      var fa         = new Float32Array(data);
      var chromId    = la[0];
      var chr        = parseInt(bbi.chroms[chromId].replace('chr', ''), 10);
      var blockStart = la[1] + 1;
      var itemStep   = la[3];
      var itemSpan   = la[4];
      var blockType  = ba[20];
      var itemCount  = sa[11];
      var i, start, end, score;

      if (blockType === BIG_WIG_TYPE_FSTEP) { // fixedStep wiggle
        for (i = 0; i < itemCount; i++) {
          start = blockStart + i*itemStep;
          end   = start + itemSpan - 1;
          score = fa[i + 6];

          if (chromId == query.chrom) {
            arr.push({
              chr    : chr,
              start  : start,
              end    : end,
              height : score
            });
          }
        }
      } else if (blockType === BIG_WIG_TYPE_VSTEP) { // variable step wiggle
        for (i = 0; i < itemCount; i++) {
          start = la[i*2 + 6] + 1;
          end   = start + itemSpan - 1;
          score = fa[i*2 + 7];

          if (chromId == query.chrom) {
            arr.push({
              chr    : chr,
              start  : start,
              end    : end,
              height : score
            });
          }
        }
      } else if (blockType === BIG_WIG_TYPE_GRAPH) { // bedGraph
        for (i = 0; i < itemCount; i++) {
          start = la[i*3 + 6] + 1;
          end   = la[i*3 + 7];
          score = fa[i*3 + 8];

          if (start > end) {
            start = end;
          }

          if (chromId == query.chrom) {
            arr.push({
              chr    : chr,
              start  : start,
              end    : end,
              height : score
            });
          }
        }
      }

      return arr;
    }

    function BEDParser(data, query) {
      var arr      = [];
      var ba       = new Uint8Array(data);
      var la       = new Int32Array(data);
      var offset   = 0;
      var bbRecord, ch, rest;

      while (offset < la.length) {
        bbRecord = {
          chromid : la[offset],
          chr     : bbi.chroms[la[offset]],
          start   : la[offset + 1],
          end     : la[offset + 2]
        };

        offset += 12;

        while (true) {
          ch = ba[offset++];

          if (ch !== 0) {
            rest += String.fromCharCode(ch);
          } else {
            break;
          }
        }

        if (bbRecord.chromid === query.chrom) {
          arr.push([ bbRecord.chr, bbRecord.start, bbRecord.end, rest ].join('\t'));
        }
      }

      return arr;
    }

    // reads 8 bytes from data
    function read64Bit(ba, o) {
      var val = ba[o] + ba[o+1]*M1 + ba[o+2]*M2 + ba[o+3]*M3 + ba[o+4]*M4;
      return val;
    }

    function readFloat(ba, o) {
      var a = new Uint8Array([ ba[o], ba[o+1], ba[o+2], ba[o+3] ]);
      var b = a.buffer;
      var c = new Float32Array(b);
      return c[0];
    }

    // reads 4 bytes from data
    function read32Bit(ba, o) {
      var a = ba[o];
      var b = ba[o+1];
      var c = ba[o+2];
      var d = ba[o+3];
      var r = (a | ((b << 8) >>> 0) | ((c << 16) >>> 0) | ((d << 24) >>> 0)) >>> 0;
      return r;
    }

     // reads 2 bytes from data
    function read16Bit(ba, o) {
      var r = ba[o] | (ba[o+1] << 8);
      return r;
    }

    // reads 1 byte from data
    function read8Bit(ba, o) {
      return ba[o];
    }

    init();
  };

  window.BWReader = BWReader;

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = BWReader;
  }
})();
