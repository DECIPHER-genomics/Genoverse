import JParser       from 'jParser';
import inflateBuffer from 'js/lib/dalliance/jszlib-inflate';

JParser.prototype.structure.uint64 = function () { return parseInt(this.view.getUint64(), 10); };

const tabiFmt = {
  string0: function (size) {
    return this.parse([ 'string', size ]).replace(/\0+$/, '');
  },
  header: {
    magic   : [ 'string', 4 ],
    n_ref   : 'int32',
    format  : 'int32',
    col_seq : 'int32',
    col_beg : 'int32',
    col_end : 'int32',
    meta    : 'int32',
    skip    : 'int32',
    l_nm    : 'int32',
    names   : [ 'string0', function () { return this.current.l_nm; } ],
  },
  chunk: {
    cnk_beg : 'uint64',
    cnk_end : 'uint64',
  },
  bin: {
    bin      : 'uint32',
    n_chunk  : 'int32',
    chunkseq : [ 'array', 'chunk', function () { return this.current.n_chunk; } ],
  },
  index: {
    n_bin     : 'int32',
    binseq    : [ 'array', 'bin', function () { return this.current.n_bin; } ],
    n_intv    : 'int32',
    intervseq : [ 'array', 'uint64', function () { return this.current.n_intv; } ],
  },
  tabix: {
    head     : 'header',
    indexseq : [ 'array', 'index', function () { return this.current.head.n_ref; } ],
  },
};

const bgzfHdFmt = {
  header: {
    id1   : 'uint8',
    id2   : 'uint8',
    cm    : 'uint8',
    flg   : 'uint8',
    mtime : 'uint32',
    xfl   : 'uint8',
    os    : 'uint8',
    xlen  : 'uint16',
  },
  subheader: {
    si1   : 'uint8',
    si2   : 'uint8',
    slen  : 'uint16',
    bsize : 'uint16',
  },
  bgzfHd: { head: 'header', subhead: 'subheader' },
};

const hdSize = 18;
const _2p16  = 1 << 16;

const VCFReader = function (vcf, tbi) {
  this.vcf_data = vcf;
  this.tbi_data = tbi;
};

VCFReader.prototype.readTabix = function (cb) {
  const bins2hash = (binseq) => {
    const hash = {};

    let i = 0;
    let b;

    for (const x in binseq) { // eslint-disable-line no-restricted-syntax, guard-for-in
      b       = binseq[x].bin;
      hash[b] = i;
      i++;
    }

    return hash;
  };

  const parseTabix = (tabixBuffer) => {
    const tabix = new JParser(tabixBuffer, tabiFmt).parse('tabix');

    tabix.head.names = tabix.head.names.split('\0');
    tabix.bhash      = {};

    for (let i = 0; i < tabix.head.n_ref; i++) {
      tabix.bhash[i] = bins2hash(tabix.indexseq[i].binseq);
    }

    cb(tabix);
  };

  this.inflateRegion(this.tbi_data, 0, 100000000, parseTabix);
};

VCFReader.prototype.getRecords = function (ref, beg, end, callback) {
  const records = [];
  const chunks  = this.getChunks(ref, beg, end);

  if (chunks === -1) {
    return callback([]);
  }

  const loop = (x) => {
    if (x < chunks.length) {
      this.inflateRegion(this.vcf_data, chunks[x].start, chunks[x].end, (record, ebsz) => {
        const last = record.byteLength - ebsz + chunks[x].inner_end;

        record = this.buffer2String(record).slice(chunks[x].inner_start, last);

        if (record.length > 0) {
          record = record.split('\n').filter((rec) => {
            if (rec.length > 0) {
              const n = parseInt(rec.split('\t')[1], 10);

              return beg <= n && n <= end;
            }

            return false;
          }).join('\n');

          records.push(record);
        }

        loop(++x);
      });
    } else {
      callback(records.join('\n'));
    }
  };

  loop(0);
};

VCFReader.prototype.getChunks = function (ref, beg, end) {
  const tbi = this.tabix;

  ref = tbi.head.names.indexOf(ref.toString());

  if (ref === -1) {
    return -1;
  }

  const bids  = this.reg2bins(beg, end + 1).filter(x => typeof tbi.bhash[ref][x] !== 'undefined');
  const bcnks = bids.map(x => this.bin2Ranges(tbi, ref, x));

  let cnks = bcnks.reduce((V, ranges) => {
    ranges.forEach((item) => { V.push(item); });

    return V;
  }, []);

  cnks = this.remove_duplicates(cnks);

  return cnks;
};

VCFReader.prototype.inflateRegion = function (d, beg, end, cbfn) {
  const blocks = [];

  const cb = (block, nextBlockOffset) => {
    blocks.push(block);

    if (nextBlockOffset === -1) {
      cbfn(this.appendBuffers(blocks), blocks[blocks.length - 1].byteLength);
    } else if (nextBlockOffset <= end) {
      this.inflateBlock(d, nextBlockOffset, cb);
    } else {
      cbfn(this.appendBuffers(blocks), blocks[blocks.length - 1].byteLength);
    }
  };

  this.inflateBlock(d, beg, cb);
};

VCFReader.prototype.inflateBlock = function (d, blockOffset, cbfn) {
  const cb2 = (hdobj) => {
    d.slice(blockOffset, hdobj.subhead.bsize + 1).fetch((block) => {
      const inflatedBlock = inflateBuffer(block, hdSize, block.byteLength - hdSize);

      let nextBlockOffset = blockOffset + hdobj.subhead.bsize + 1;

      if (hdobj.subhead.bsize === 27) {
        nextBlockOffset = -1; // last bgzf block
      }

      cbfn(inflatedBlock, nextBlockOffset);
    });
  };

  this.getBGZFHD(d, blockOffset, cb2);
};

VCFReader.prototype.getBGZFHD = function (d, offset, cbfn) {
  d.slice(offset, hdSize + 1).fetch((buf) => {
    const parser = new JParser(buf, bgzfHdFmt);
    const hdobj  = parser.parse('bgzfHd');

    cbfn(hdobj);
  });
};

VCFReader.prototype.appendBuffers = function (bufferVec) {
  let totalSize = 0;

  for (let i = 0; i < bufferVec.length; i++) {
    totalSize += bufferVec[i].byteLength;
  }

  const tmp = new Uint8Array(totalSize);

  let offset = 0;

  for (let i = 0; i < bufferVec.length; i++) {
    tmp.set(new Uint8Array(bufferVec[i]), offset);
    offset += bufferVec[i].byteLength;
  }

  return tmp.buffer;
};

VCFReader.prototype.buffer2String = function (resultBuffer) {
  let s = '';

  const resultBB = new Uint8Array(resultBuffer);

  for (let i = 0; i < resultBB.length; ++i) {
    s += String.fromCharCode(resultBB[i]);
  }

  return s;
};

VCFReader.prototype.remove_duplicates = function (objectsArray) {
  const usedObjects = {};

  for (let i = objectsArray.length - 1; i >= 0; i--) {
    const so = JSON.stringify(objectsArray[i]);

    if (usedObjects[so]) {
      objectsArray.splice(i, 1);
    } else {
      usedObjects[so] = true;
    }
  }

  return objectsArray;
};

VCFReader.prototype.bin2Ranges = function (tbi, ref, binid) {
  const ranges = [];
  const bs     = tbi.indexseq[ref].binseq;
  const cnkseq = bs[tbi.bhash[ref][binid]].chunkseq;

  let cnk;

  for (let i = 0; i < cnkseq.length; i++) {
    cnk = cnkseq[i];

    ranges.push({
      start       : Math.floor(cnk.cnk_beg / _2p16),
      inner_start : cnk.cnk_beg % _2p16,
      end         : Math.floor(cnk.cnk_end / _2p16),
      inner_end   : cnk.cnk_end % _2p16,
    });
  }

  return ranges;
};

VCFReader.prototype.reg2bins = function (beg, end) {
  const list = [];

  let i;

  --end;

  list.push(0);

  for (i = 1    + (beg >> 26); i <= 1    + (end >> 26); ++i) { list.push(i); }
  for (i = 9    + (beg >> 23); i <= 9    + (end >> 23); ++i) { list.push(i); }
  for (i = 73   + (beg >> 20); i <= 73   + (end >> 20); ++i) { list.push(i); }
  for (i = 585  + (beg >> 17); i <= 585  + (end >> 17); ++i) { list.push(i); }
  for (i = 4681 + (beg >> 14); i <= 4681 + (end >> 14); ++i) { list.push(i); }

  return list;
};

export default VCFReader;
