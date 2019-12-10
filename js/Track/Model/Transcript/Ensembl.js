// Ensembl REST API Transcript model
Genoverse.Track.Model.Transcript.Ensembl = Genoverse.Track.Model.Transcript.extend({
  url              : '//rest.ensembl.org/overlap/region/human/__CHR__:__START__-__END__?feature=transcript;feature=exon;feature=cds;content-type=application/json',
  dataRequestLimit : 5000000, // As per e! REST API restrictions

  setDefaults: function () {
    this.geneIds   = {};
    this.seenGenes = 0;

    this.base.apply(this, arguments);
  },

  // The url above responds in json format, data is an array
  // See rest.ensembl.org/documentation/info/overlap_region for more details
  parseData: function (data, chr) {
    var model        = this;
    var featuresById = this.featuresById;
    var ids          = [];

    data.filter(function (d) { return d.feature_type === 'transcript'; }).forEach(function (feature, i) {
      if (!featuresById[feature.id]) {
        model.geneIds[feature.Parent] = model.geneIds[feature.Parent] || ++model.seenGenes;

        feature.chr         = feature.chr || chr;
        feature.label       = parseInt(feature.strand, 10) === 1 ? (feature.external_name || feature.id) + ' >' : '< ' + (feature.external_name || feature.id);
        feature.sort        = (model.geneIds[feature.Parent] * 1e10) + (feature.logic_name.indexOf('ensembl_havana') === 0 ? 0 : 2e9) + (feature.biotype === 'protein_coding' ? 0 : 1e9) + feature.start + i;
        feature.cdsStart    = Infinity;
        feature.cdsEnd      = -Infinity;
        feature.exons       = {};
        feature.subFeatures = [];

        model.insertFeature(feature);
      }

      ids.push(feature.id);
    });

    data.filter(function (d) { return d.feature_type === 'cds' && featuresById[d.Parent]; }).forEach(function (cds) {
      featuresById[cds.Parent].cdsStart = Math.min(featuresById[cds.Parent].cdsStart, cds.start);
      featuresById[cds.Parent].cdsEnd   = Math.max(featuresById[cds.Parent].cdsEnd,   cds.end);
    });

    data.filter(function (d) { return d.feature_type === 'exon' && featuresById[d.Parent] && !featuresById[d.Parent].exons[d.id]; }).forEach(function (exon) {
      if (exon.end < featuresById[exon.Parent].cdsStart || exon.start > featuresById[exon.Parent].cdsEnd) {
        featuresById[exon.Parent].subFeatures.push($.extend({ utr: true }, exon));
      } else {
        if (exon.start < featuresById[exon.Parent].cdsStart) {
          featuresById[exon.Parent].subFeatures.push($.extend({ utr: true }, exon, { end: featuresById[exon.Parent].cdsStart }));
        }

        featuresById[exon.Parent].subFeatures.push($.extend({}, exon, {
          start  : Math.max(exon.start, featuresById[exon.Parent].cdsStart),
          end    : Math.min(exon.end,   featuresById[exon.Parent].cdsEnd),
          strand : featuresById[exon.Parent].strand,
        }));

        if (exon.end > featuresById[exon.Parent].cdsEnd) {
          featuresById[exon.Parent].subFeatures.push($.extend({ utr: true }, exon, { start: featuresById[exon.Parent].cdsEnd }));
        }
      }
    });

    ids.forEach(function (id) {
      featuresById[id].subFeatures.sort(function (a, b) { return a.start - b.start; });
    });
  }
});
