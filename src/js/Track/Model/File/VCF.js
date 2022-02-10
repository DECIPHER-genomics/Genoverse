import Model                           from 'js/Track/Model/File';
import VCFReader                       from 'js/lib/VCFReader';
import { URLFetchable, BlobFetchable } from 'js/lib/dalliance/bin';

export default Model.extend({
  getData: function (chr, start, end, done) {
    if (!this.prop('gz')) {
      return this.base(chr, start, end, done);
    }

    const deferred = $.Deferred();

    if (!this.vcfFile) {
      if (this.url) {
        this.vcfFile = new URLFetchable(this.url);
        this.tbiFile = new URLFetchable(this.url + this.prop('indexExt'));
      } else if (this.dataFile && this.indexFile) {
        this.vcfFile = new BlobFetchable(this.dataFile);
        this.tbiFile = new BlobFetchable(this.indexFile);
      } else {
        return deferred.rejectWith(this, [ 'GZipped VCF files must be accompanied by a .tbi index file' ]);
      }
    }

    this.makeVCF(this.vcfFile, this.tbiFile).then((vcf) => {
      this.cachedVCF = vcf;

      vcf.getRecords(chr, start, end, (records) => {
        this.receiveData(records, chr, start, end);
        deferred.resolveWith(this);
      });
    });

    return deferred;
  },

  makeVCF: function (vcfFile, tbiFile) {
    const deferred = $.Deferred();

    if (this.cachedVCF) {
      deferred.resolve(this.cachedVCF);
    } else {
      const vcf = new VCFReader(vcfFile, tbiFile);

      vcf.readTabix((tabix) => {
        vcf.tabix = tabix;
        deferred.resolve(vcf);
      });
    }

    return deferred;
  },

  parseData: function (text, chr) {
    const lines = text.split('\n');

    let maxQual = this.allData ? this.prop('maxQual') || 0 : false;

    lines.forEach(
      (line) => {
        if (!line.length || line.indexOf('#') === 0) {
          return;
        }

        const fields = line.split('\t');

        if (fields.length < 5) {
          return;
        }

        if (fields[0] === String(chr) || fields[0] === `chr${chr}`) {
          const id      = fields.slice(0, 3).join('|');
          const start   = parseInt(fields[1], 10);
          const alleles = fields[4].split(',');

          alleles.unshift(fields[3]);

          alleles.forEach(
            (allele, i) => {
              const end = start + allele.length - 1;

              this.insertFeature({
                id              : `${id}|${allele}`,
                sort            : i,
                chr             : chr,
                start           : start,
                end             : end,
                width           : end - start,
                allele          : i === 0 ? 'REF' : 'ALT',
                sequence        : allele,
                label           : allele,
                labelColor      : '#FFFFFF',
                originalFeature : fields,
              });
            }
          );

          if (maxQual !== false) {
            maxQual = Math.max(maxQual, fields[5]);
          }
        }
      }
    );

    if (maxQual) {
      this.prop('maxQual', maxQual);
    }
  },
});
