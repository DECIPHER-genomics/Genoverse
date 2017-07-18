Genoverse.Track.Model.File.VCF = Genoverse.Track.Model.File.extend({
  cachedVCF : false,
  getData : function(chr, start, end){
    var deferred = $.Deferred();
    var model = this;

    if(!this.prop('gz')){
      return this.base.apply(this, arguments);
    }

    console.log("gzipped VCF");
    if (!this.vcfFile) {
	    if (this.url) {
	      this.vcfFile = new dallianceLib.URLFetchable(this.url);
	      this.tbiFile = new dallianceLib.URLFetchable(this.url + this.prop('indexExt'));
	    } else if (this.dataFile && this.indexFile) {
	      this.vcfFile = new dallianceLib.BlobFetchable(this.dataFile);
	      this.tbiFile = new dallianceLib.BlobFetchable(this.indexFile);
	    }
	  }

    this.makeVCF(this.vcfFile, this.tbiFile).then(function(vcf){
			model.cachedVCF = vcf;
			console.log(vcf.tabix.head.names);
			console.log(chr, start, end);

      vcf.getRecords(chr, start, end, function(records){
				console.log(records);
				model.receiveData(records, chr, start, end);
				deferred.resolveWith(model);
			});
		});

    return deferred;
  },
  parseData: function (text, chr) {
    var lines = text.split('\n');

    for (var i = 0; i < lines.length; i++) {
      if (!lines[i].length || lines[i].indexOf('#') === 0) {
        continue;
      }

      var fields = lines[i].split('\t');

      if (fields.length < 5) {
        continue;
      }

      if (fields[0] == chr || fields[0] == 'chr' + chr) {
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
      }
    }
  },
  makeVCF : function(vcfFile, tbiFile){
		var d = $.Deferred();

		if(!this.cachedVCF){
			var vcf = new VCFReader(vcfFile, tbiFile);
			vcf.readTabix(function(tabix){
				vcf.tabix = tabix;
				d.resolve(vcf);
			});
		}else{
			d.resolve(this.cachedVCF);
		}
		return d;
	}
});
