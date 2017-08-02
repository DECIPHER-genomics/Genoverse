(function () {
  var tabi_fmt = {
    string0: function (size) {
      return this.parse(['string', size]).replace(/\0+$/, '');
    },
    header: {
      magic   : ['string', 4],
      n_ref   : 'int32',
      format  : 'int32',
      col_seq : 'int32',
      col_beg : 'int32',
      col_end : 'int32',
      meta    : 'int32',
      skip    : 'int32',
      l_nm    : 'int32',
      names   : ['string0', function () { return this.current.l_nm; }]
    },
    chunk: {
      cnk_beg: 'uint64',
      cnk_end: 'uint64'
    },
    bin: {
      bin      : 'uint32',
      n_chunk  : 'int32',
      chunkseq : ['array', 'chunk', function () { return this.current.n_chunk; }]
    },
    index: {
      n_bin     : 'int32',
      binseq    : ['array', 'bin', function () { return this.current.n_bin; }],
      n_intv    : 'int32',
      intervseq : ['array', 'uint64', function () { return this.current.n_intv; }]
    },
    tabix: {
      head     : 'header',
      indexseq : ['array', 'index', function () { return this.current.head.n_ref; }]
    }
  };

  var bgzf_hd_fmt = {
    header: {
      id1   : 'uint8',
      id2   : 'uint8',
      cm    : 'uint8',
      flg   : 'uint8',
      mtime : 'uint32',
      xfl   : 'uint8',
      os    : 'uint8',
      xlen  : 'uint16'
    },
    subheader: {
      si1   : 'uint8',
      si2   : 'uint8',
      slen  : 'uint16',
      bsize : 'uint16'
    },
    bgzfHd: { head: 'header', subhead: 'subheader' }
  };

  var hdSize  = 18;
  var inflate = dallianceLib.inflateBuffer;
  var _2p16   = 1 << 16;

  var VCFReader = function (vcf, tbi) {
    this.vcf_data = vcf;
    this.tbi_data = tbi;
  };

  VCFReader.prototype.readTabix = function (cb) {
    var bins2hash = function (binseq) {
      var hash = {};
      var i    = 0;
      var b;

      for (var x in binseq) {
        b       = binseq[x].bin;
        hash[b] = i;
        i++;
      }

      return hash;
    };

    var parse_tabix = function (tabix_buffer) {
      var tabix = new jParser(tabix_buffer, tabi_fmt).parse('tabix');

      tabix.head.names = tabix.head.names.split('\0');
      tabix.bhash = {};

      for (var i = 0; i < tabix.head.n_ref; i++){
        tabix.bhash[i] = bins2hash(tabix.indexseq[i].binseq);
      }

      cb(tabix);
    };

    this.inflateRegion(this.tbi_data, 0, 100000000, parse_tabix);
  };

  VCFReader.prototype.getRecords = function (ref, beg, end, callback) {
    var records = [];
    var chunks  = this.getChunks(ref, beg, end);
    var vcfThis = this;

    if (chunks == -1) {
      return callback([]);
    }

    (function loop(x) {
      if (x < chunks.length) {
        vcfThis.inflateRegion(vcfThis.vcf_data, chunks[x].start, chunks[x].end, function (record, ebsz) {
          var last = record.byteLength - ebsz + chunks[x].inner_end;
          record = vcfThis.buffer2String(record).slice(chunks[x].inner_start, last);

          if (record.length > 0) {
            record = record.split('\n').filter(function (rec) {
              if (rec.length > 0) {
                var n = parseInt(rec.split('\t')[1]);
                return ((beg <= n) && (n <= end));
              }
            }).join('\n');

            records.push(record);
          }

          loop(++x);
        });
      } else {
        callback(records.join('\n'));
      }
    })(0);
  };

  VCFReader.prototype.getChunks = function (ref, beg, end) {
    var tbi     = this.tabix;
    var vcfThis = this;

    ref = tbi.head.names.indexOf(ref.toString());

    if (ref == -1) {
      return -1;
    }

    var bids  = this.reg2bins(beg, end + 1).filter(function (x) { return typeof tbi.bhash[ref][x] != 'undefined'; });
    var bcnks = bids.map(function (x) { return vcfThis.bin2Ranges(tbi, ref, x); });
    var cnks  = bcnks.reduce(function (V, ranges) {
      ranges.forEach(function (item) { V.push(item); });
      return V;
    }, []);

    cnks = this.remove_duplicates(cnks);

    return cnks;
  };

  VCFReader.prototype.inflateRegion = function (d, beg, end, cbfn) {
    var blocks  = [];
    var vcfThis = this;

    var cb = function (block, nextBlockOffset) {
      blocks.push(block);

      if (nextBlockOffset == -1) {
        cbfn(vcfThis.appendBuffers(blocks), blocks[blocks.length - 1].byteLength);
      } else if (nextBlockOffset <= end) {
        vcfThis.inflateBlock(d, nextBlockOffset, cb);
      } else {
        cbfn(vcfThis.appendBuffers(blocks), blocks[blocks.length - 1].byteLength);
      }
    };

    this.inflateBlock(d, beg, cb);
  };

  VCFReader.prototype.inflateBlock = function (d, blockOffset, cbfn) {
    var cb2 = function (hdobj) {
      d.slice(blockOffset, hdobj.subhead.bsize + 1).fetch(function (block) {
        var inflated_block  = inflate(block, hdSize, block.byteLength - hdSize);
        var nextBlockOffset = blockOffset + hdobj.subhead.bsize + 1;

        if (hdobj.subhead.bsize == 27) {
          nextBlockOffset = -1; // last bgzf block
        }

        cbfn(inflated_block, nextBlockOffset);
      });
    };

    this.getBGZFHD(d, blockOffset, cb2);
  };

  VCFReader.prototype.getBGZFHD = function (d, offset, cbfn) {
    d.slice(offset, hdSize + 1).fetch(function (buf) {
      var parser = new jParser(buf, bgzf_hd_fmt);
      var hdobj  = parser.parse('bgzfHd');
      cbfn(hdobj);
    });
  };

  VCFReader.prototype.appendBuffers = function (bufferVec) {
    var totalSize = 0;

    for (var i = 0; i < bufferVec.length; i++) {
      totalSize = totalSize + bufferVec[i].byteLength;
    }

    var tmp    = new Uint8Array(totalSize);
    var offset = 0;

    for (i = 0; i < bufferVec.length; i++) {
      tmp.set(new Uint8Array(bufferVec[i]), offset);
      offset = offset + bufferVec[i].byteLength;
    }

    return tmp.buffer;
  };

  VCFReader.prototype.buffer2String = function (resultBuffer) {
    var s        = '';
    var resultBB = new Uint8Array(resultBuffer);

    for (var i = 0; i < resultBB.length; ++i) {
      s += String.fromCharCode(resultBB[i]);
    }

    return s;
  };

  VCFReader.prototype.remove_duplicates = function (objectsArray) {
    var usedObjects = {};

    for (var i = objectsArray.length - 1; i >= 0; i--) {
      var so = JSON.stringify(objectsArray[i]);

      if (usedObjects[so]) {
        objectsArray.splice(i, 1);
      } else {
        usedObjects[so] = true;
      }
    }

    return objectsArray;
  };

  VCFReader.prototype.bin2Ranges = function (tbi, ref, binid) {
    var ranges = [];
    var bs     = tbi.indexseq[ref].binseq;
    var cnkseq = bs[tbi.bhash[ref][binid]].chunkseq;
    var cnk;

    for (var i = 0; i < cnkseq.length; i++) {
      cnk = cnkseq[i];

      ranges.push({
        start       : Math.floor(cnk.cnk_beg / _2p16),
        inner_start : cnk.cnk_beg % _2p16,
        end         : Math.floor(cnk.cnk_end / _2p16),
        inner_end   : cnk.cnk_end % _2p16
      });
    }

    return ranges;
  };

  VCFReader.prototype.reg2bins = function (beg, end) {
    var list = [];
    var i;

    --end;

    list.push(0);

    for (i = 1    + (beg >> 26); i <= 1    + (end >> 26); ++i) { list.push(i); }
    for (i = 9    + (beg >> 23); i <= 9    + (end >> 23); ++i) { list.push(i); }
    for (i = 73   + (beg >> 20); i <= 73   + (end >> 20); ++i) { list.push(i); }
    for (i = 585  + (beg >> 17); i <= 585  + (end >> 17); ++i) { list.push(i); }
    for (i = 4681 + (beg >> 14); i <= 4681 + (end >> 14); ++i) { list.push(i); }

    return list;
  };

  window.VCFReader = VCFReader;

  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = VCFReader;
  }
})();
