var FileModel = require('../File')

module.exports = FileModel.extend({
  getData: function (chr, start, end) {
    var deferred = $.Deferred();
    var model    = this;

    if (!this.prop('gz')) {
      return this.base.apply(this, arguments);
    }

    if (!this.vcfFile) {
      if (this.url) {
        this.vcfFile = new dallianceLib.URLFetchable(this.url);
        this.tbiFile = new dallianceLib.URLFetchable(this.url + this.prop('indexExt'));
      } else if (this.dataFile && this.indexFile) {
        this.vcfFile = new dallianceLib.BlobFetchable(this.dataFile);
        this.tbiFile = new dallianceLib.BlobFetchable(this.indexFile);
      } else {
        return deferred.rejectWith(model, [ 'GZipped VCF files must be accompanied by a .tbi index file' ]);
      }
    }

    this.makeVCF(this.vcfFile, this.tbiFile).then(function (vcf) {
      model.cachedVCF = vcf;

      vcf.getRecords(chr, start, end, function (records) {
        model.receiveData(records, chr, start, end);
        deferred.resolveWith(model);
      });
    });

    return deferred;
  },

  makeVCF: function (vcfFile, tbiFile) {
    var deferred = $.Deferred();

    if (this.cachedVCF) {
      deferred.resolve(this.cachedVCF);
    } else {
      var vcf = new VCFReader(vcfFile, tbiFile);

      vcf.readTabix(function (tabix) {
        vcf.tabix = tabix;
        deferred.resolve(vcf);
      });
    }

    return deferred;
  },

  parseData: function (text, chr) {
    var lines   = text.split('\n');
    var maxQual = this.allData ? this.prop('maxQual') || 0 : false;

    for (var i = 0; i < lines.length; i++) {
      if (!lines[i].length || lines[i].indexOf('#') === 0) {
        continue;
      }

      var fields = lines[i].split('\t');

      if (fields.length < 5) {
        continue;
      }

      if (fields[0] == chr || fields[0] === 'chr' + chr) {
        var id      = fields.slice(0, 3).join('|');
        var start   = parseInt(fields[1], 10);
        var alleles = fields[4].split(',');

        alleles.unshift(fields[3]);

        for (var j = 0; j < alleles.length; j++) {
          var end = start + alleles[j].length - 1;

          this.insertFeature({
            id              : id + '|' + alleles[j],
            sort            : j,
            chr             : chr,
            start           : start,
            end             : end,
            width           : end - start,
            allele          : j === 0 ? 'REF' : 'ALT',
            sequence        : alleles[j],
            label           : alleles[j],
            labelColor      : '#FFFFFF',
            originalFeature : fields
          });
        }

        if (maxQual !== false) {
          maxQual = Math.max(maxQual, fields[5]);
        }
      }
    }

    if (maxQual) {
      this.prop('maxQual', maxQual);
    }
  }
});
