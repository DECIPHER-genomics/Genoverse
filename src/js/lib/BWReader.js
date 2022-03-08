import RTree         from 'rtree';
import inflateBuffer from './dalliance/jszlib-inflate';

export default function (fileData, callback) {
  const bbi = {
    fetchedData: new RTree(),
  };

  // constants: bigwig/bigbed file header signatures (magic numbers) (32 bit) , can be swapped ( big-endian | BE )
  const BIG_WIG_MAGIC    = 0x888FFC26;
  const BIG_WIG_MAGIC_BE = 0x26FC8F88;

  const BIG_BED_MAGIC    = 0x8789F2EB;
  const BIG_BED_MAGIC_BE = 0xEBF28987;

  const CIRTREE_MAGIC = 0x78ca8c91;
  const IDXTREE_MAGIC = 0x2468ace0;

  // type of file converted to bigwig bedgraph |variable step wiggle | fixed step wiggle
  const BIG_WIG_TYPE_GRAPH = 1;
  const BIG_WIG_TYPE_VSTEP = 2;
  const BIG_WIG_TYPE_FSTEP = 3;

  const M1 = 256;
  const M2 = 256 * 256;
  const M3 = 256 * 256 * 256;
  const M4 = 256 * 256 * 256 * 256;

  // reads 8 bytes from data
  const read64Bit = (ba, o) => {
    const val = ba[o] + ba[o + 1] * M1 + ba[o + 2] * M2 + ba[o + 3] * M3 + ba[o + 4] * M4;

    return val;
  };

  const WiggleParser = (data, query) => {
    const arr        = [];
    const ba         = new Uint8Array(data);
    const sa         = new Int16Array(data);
    const la         = new Int32Array(data);
    const fa         = new Float32Array(data);
    const chromId    = la[0];
    const chr        = parseInt(bbi.chroms[chromId].replace('chr', ''), 10);
    const blockStart = la[1] + 1;
    const itemStep   = la[3];
    const itemSpan   = la[4];
    const blockType  = ba[20];
    const itemCount  = sa[11];

    let i;
    let start;
    let end;
    let score;

    if (blockType === BIG_WIG_TYPE_FSTEP) { // fixedStep wiggle
      for (i = 0; i < itemCount; i++) {
        start = blockStart + i * itemStep;
        end   = start + itemSpan - 1;
        score = fa[i + 6];

        if (chromId == query.chrom) { // eslint-disable-line eqeqeq
          arr.push({
            chr    : chr,
            start  : start,
            end    : end,
            height : score,
          });
        }
      }
    } else if (blockType === BIG_WIG_TYPE_VSTEP) { // variable step wiggle
      for (i = 0; i < itemCount; i++) {
        start = la[i * 2 + 6] + 1;
        end   = start + itemSpan - 1;
        score = fa[i * 2 + 7];

        if (chromId == query.chrom) { // eslint-disable-line eqeqeq
          arr.push({
            chr    : chr,
            start  : start,
            end    : end,
            height : score,
          });
        }
      }
    } else if (blockType === BIG_WIG_TYPE_GRAPH) { // bedGraph
      for (i = 0; i < itemCount; i++) {
        start = la[i * 3 + 6] + 1;
        end   = la[i * 3 + 7];
        score = fa[i * 3 + 8];

        if (start > end) {
          start = end;
        }

        if (chromId == query.chrom) { // eslint-disable-line eqeqeq
          arr.push({
            chr    : chr,
            start  : start,
            end    : end,
            height : score,
          });
        }
      }
    }

    return arr;
  };

  const BEDParser = (data, query) => {
    const arr = [];
    const ba  = new Uint8Array(data);
    const la  = new Int32Array(data);

    let offset = 0;
    let bbRecord;
    let ch;
    let rest;

    while (offset < la.length) {
      bbRecord = {
        chromid : la[offset],
        chr     : bbi.chroms[la[offset]],
        start   : la[offset + 1],
        end     : la[offset + 2],
      };

      offset += 12;

      while (true) { // eslint-disable-line no-constant-condition
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
  };

  const getData = (start, length, cb) => {
    const end     = start + length;
    const fetched = bbi.fetchedData.search({ x: start, w: length, y: 0, h: 1 }).filter(d => d[0] <= start && d[1] >= end);

    if (fetched.length === 1) {
      cb(fetched[0][2].slice(start - fetched[0][0], start + length));
    } else {
      fileData.slice(start, length).fetch((d) => {
        bbi.fetchedData.insert({ x: start, w: length, y: 0, h: 1 }, [ start, start + length, d ]);
        cb(d);
      });
    }
  };

  const getRTreeNode = (treedata, offset) => {
    const ba       = new Uint8Array(treedata);
    const sa       = new Uint16Array(treedata);
    const la       = new Uint32Array(treedata);
    const children = sa[offset / 2 + 1];

    let lo;
    let i;

    const node = {
      isLeaf      : ba[offset],
      children    : children,
      chrIdxStart : new Array(children),
      baseStart   : new Array(children),
      chrIdxEnd   : new Array(children),
      baseEnd     : new Array(children),
      dataOffset  : new Array(children),
      x           : {},
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
        offset        += 8;
      }
    }

    return node;
  };

  const getValues = (chrom, start, end, cb) => {
    const vals = [];

    let chromid = bbi.chroms.indexOf(chrom);

    if (chromid === -1) {
      chromid = bbi.chroms.indexOf(`chr${chrom}`);

      if (chromid === -1) {
        return cb([], 'chrom not found');
      }
    }

    const query = {
      chrom : chromid,
      start : start,
      end   : end,
    };

    const findOverlaps = (node) => {
      const children = node.children;
      const overlaps = [];

      for (let i = 0; i < children; i++) {
        const startChrom = node.chrIdxStart[i];
        const startBase  = node.baseStart[i];
        const endChrom   = node.chrIdxEnd[i];
        const endBase    = node.baseEnd[i];

        if (
          ((startChrom < query.chrom) || (startChrom == query.chrom && startBase <= query.end)) && // eslint-disable-line eqeqeq
          ((endChrom   > query.chrom) || (endChrom   == query.chrom && endBase   >= query.start))  // eslint-disable-line eqeqeq
        ) {
          overlaps.push(i);
        }
      }

      return overlaps;
    };

    function traverseRTree() {
      let outstanding = 0;

      const getBlocks = () => {
        const parser = bbi.type === 'bigwig' ? WiggleParser : bbi.type === 'bigbed' ? BEDParser : false;

        let result = [];

        if (parser && vals.length) {
          for (let i = 0; i < vals.length; i++) {
            result = result.concat(parser(vals[i].data, query));
          }
        }

        cb(result);
      };

      const fetchBlocks = () => {
        vals.sort((b0, b1) => (b0.offset | 0) - (b1.offset | 0));

        if (vals.length === 0) {
          return getBlocks();
        }

        let totalSize = 0;

        const base = vals[0].offset;

        for (let i = 0; i < vals.length; i++) {
          totalSize += vals[i].size;
        }

        getData(base, totalSize, (buffer) => {
          let ioffset = 0;
          let bi      = 0;
          let fb;

          let
            blockData;

          while (ioffset < totalSize) {
            fb = vals[bi];

            if (bbi.uncompressBufSize > 0) {
              blockData = inflateBuffer(buffer, ioffset + 2, fb.size - 2);
            } else {
              blockData = buffer.slice(ioffset, ioffset + fb.size);
            }

            vals[bi].data = blockData;
            ioffset      += fb.size;
            bi++;
          }

          getBlocks();
        });
      };

      const traverseRTreeChildren = (treedata, offset, level, fetchChildren) => {
        const node     = getRTreeNode(treedata, offset);
        const overlaps = findOverlaps(node);

        let i;

        if (node.isLeaf) {
          for (i = 0; i < overlaps.length; i++) {
            vals.push({
              offset : node.dataOffset[overlaps[i]],
              size   : node.x.size[overlaps[i]],
            });
          }

          return [];
        }

        fetchChildren(overlaps.map(o => node.dataOffset[o]), level + 1);
      };

      const fetchRTreeChildren = (offset, level) => {
        outstanding += offset.length;

        const min         = offset[0];
        const maxNodeSize = 4 + bbi.Rheader.blockSize * 32;
        const max         = offset[offset.length - 1] + maxNodeSize;

        getData(min, max - min, (treedata) => {
          // traverse children
          for (let i = 0; i < offset.length; i++) {
            traverseRTreeChildren(treedata, offset[i] - min, level, fetchRTreeChildren);

            if (--outstanding === 0) {
              fetchBlocks();
            }
          }
        });
      };

      fetchRTreeChildren([ bbi.rootOffset ], 1);
    }

    traverseRTree();
  };

  // autoSQL could be present in some bigbed files
  const readAutoSQL = (cb) => {
    if (bbi.asOffset === 0) {
      cb(); // no autoSQL present
    } else {
      // autoSQL present, need to parse
      getData(bbi.asOffset, 2048, (d) => {
        const ba = new Uint8Array(d);

        let s = '';

        for (let i = 0; i < ba.length; i++) {
          if (ba[i] === 0) {
            break;
          }

          s += String.fromCharCode(ba[i]);
        }

        const headerRe    = /(\w+)\s+(\w+)\s+("([^"]+)")?\s*\(\s*/;
        const fieldRe     = /([\w[]]+)\s+(\w+)\s*;\s*("([^"]+)")?\s*/g;
        const headerMatch = headerRe.exec(s);

        if (headerMatch) {
          const as = {
            declType : headerMatch[1],
            name     : headerMatch[2],
            comment  : headerMatch[4],
            fields   : [],
          };

          s = s.substring(headerMatch[0]);

          for (let m = fieldRe.exec(s); m !== null; m = fieldRe.exec(s)) {
            as.fields.push({
              type    : m[1],
              name    : m[2],
              comment : m[4],
            });
          }

          bbi.schema = as;
        }

        cb();
      });
    }
  };

  const readRTreeIndex = () => {
    getData(bbi.unzoomedIndexOffset, 48, (d) => {
      const ba    = new Uint8Array(d);
      const la    = new Uint32Array(d);
      const magic = la[0];

      if (magic === IDXTREE_MAGIC) {
        bbi.Rheader = {
          blockSize     : la[1],
          nItems        : read64Bit(ba, 8),
          chrIdxStart   : la[4],
          baseStart     : la[5],
          chrIdxEnd     : la[6],
          baseEnd       : la[7],
          endFileOffset : read64Bit(ba, 32),
          nItemsPerSlot : la[10],
        };

        bbi.rootOffset = bbi.unzoomedIndexOffset + 48;
        bbi.getValues  = getValues;

        callback(bbi);
      } else {
        callback(null, 'R-tree not found!');
      }
    });
  };

  // reading B+ tree which maps chrom names to ids used in R-tree
  const readChromTree = () => {
    const length = bbi.unzoomedDataOffset - bbi.chromTreeOffset;

    getData(bbi.chromTreeOffset, length + 4 - (length % 4), (d) => {
      const ba    = new Uint8Array(d);
      const sa    = new Uint16Array(d);
      const la    = new Uint32Array(d);
      const magic = la[0];

      let error;

      const readChromTreeLeaf = (nodeOffset) => {
        // padding 8 byte
        let children = sa[(nodeOffset / 2) + 1];
        let offset   = nodeOffset + 4;
        let chrom;
        let i;
        let c;
        let idx;
        let len;

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
      };

      if (magic === CIRTREE_MAGIC) {
        bbi.bpTree = {
          itemsPerBlock : la[1],
          keySize       : la[2],
          valueSize     : la[3],
          itemCount     : read64Bit(ba, 16),
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
  };

  const checkSignature = () => {
    getData(0, 512, (header) => {
      const ba    = new Uint8Array(header);
      const sa    = new Uint16Array(header);
      const la    = new Uint32Array(header);
      const magic = la[0];

      let error;
      let reduction;
      let dataOffset;
      let indexOffset;

      if (magic === BIG_WIG_MAGIC) {
        bbi.type = 'bigwig';
      } else if (magic === BIG_BED_MAGIC) {
        bbi.type = 'bigbed';
      } else if (magic === BIG_WIG_MAGIC_BE || magic === BIG_BED_MAGIC_BE) {
        error = 'big-endian files not supported yet!';
      } else {
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

      for (let i = 0; i < bbi.numZoomLevels; i++) {
        reduction   = la[16 + 6 * i];
        dataOffset  = read64Bit(ba, 72 + 24 * i);
        indexOffset = read64Bit(ba, 80 + 24 * i);

        bbi.zoomHeaders.push({
          reductionLevel : reduction,
          dataOffset     : dataOffset,
          indexOffset    : indexOffset,
        });
      }

      readAutoSQL(readChromTree); // reading autoSQL passing next task as callback
    });
  };

  checkSignature();
}
