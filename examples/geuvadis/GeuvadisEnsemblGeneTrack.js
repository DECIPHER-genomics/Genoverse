Genoverse.Track.GeuvadisEnsemblGeneTrack = Genoverse.Track.extend({

    name           : "Genes Ensembl",
    url            : "gene?r=__CHR__:__START__-__END__",
    height         : 100,
    featureHeight  : 6,
    featureSpacing : 2,
    bump           : true,
    labels         : true,
    resizable      : true,
    featureNormal  : "rgba(250,0,0,0.8)",
    featureDark    : "rgba(100,0,0,0.8)",
    info           : "Genes Ensembl",

    parseData      : function (data) {
        var i = data.length;
        while (i--) {
            data[i].label      = data[i].name;
            data[i].color      = this.featureNormal;
            data[i].labelColor = this.featureNormal;

            if (data[i].biotype == "protein_coding" || data[i].biotype == "lincRNA") {
                data[i].color      = this.featureDark;
                data[i].labelColor = this.featureDark;
            }

            data[i].start      = parseInt(data[i].start, 10);
            data[i].end        = parseInt(data[i].end, 10);
            this.insertFeature(data[i]);
        }
    },

    packDescription      : function (desc) {
        if (desc.length > 38) {
            var i0 = desc.indexOf(" ", 38);

            if (i0 != -1) {
                desc = desc.substring(0, i0) + "</br>" + desc.substring(i0);
            }

            return desc;
        }
    },

    populateMenu : function (gene) {
        return {
            Gene         : '<a target=_blank href="http://www.genenames.org/data/hgnc_data.php?match='+ gene.name+ '">' + gene.name + '</a>',
            Description  : gene.description ? this.packDescription( gene.description ) : '-' ,
            Location     : gene.chr + ':' + gene.start + '-' + gene.end,
            Biotype      : gene.biotype,
            Ensembl      : gene.id ? '<a target=_blank href="http://www.ensembl.org/Homo_sapiens/Gene/Summary?g='+ gene.id +'">'+ gene.id +'</a>' : '-'
        };
    }
});

