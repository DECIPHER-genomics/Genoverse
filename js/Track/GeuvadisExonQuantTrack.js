Genoverse.Track.GeuvadisExonQuantTrack = Genoverse.Track.extend({

    name          : 'ExonQuantifictionJsonTrack',
    url           : 'exon?r=__CHR__:__START__-__END__',
    height        : 100,
    featureHeight : 98,
    labels        : 'overlay',
    resizable     : false,
    dataType      : 'text',
    featureColor  : 'rgba(200,0,0,0.8)',

    makeFeature: function (line) {
        //alert("Geuvadis makeFeature " + line);

        var values = line.split(' ');
        var feature = {
            id      : values[0] + "_" + values[1] + "_" + values[2] + "_" + values[3],
            chr     : values[0],
            start   : parseInt(values[1], 10), // * 1,
            end     : parseInt(values[2], 10), // * 1,
            score   : values[3],
            gene    : values[4],
            logx10  : Math.log(parseFloat(values[3]) + 1) * 10,
            color   : this.featureColor,
            label   : values[0] + "_" + values[1] + "_" + values[2] + "_" + values[3],
            labelColor  : this.featureColor
        };

        return(feature);
    },

    parseData: function (data) {
        var lines = data.split("\r\n");
        for (var i=0; i<lines.length-2; i+=3) {
            //alert("Geuvadis parseData lines.length=" + lines.length);

            var feature1 = this.makeFeature(lines[i]);   // min
            var feature2 = this.makeFeature(lines[i+1]); // avg
            var feature3 = this.makeFeature(lines[i+2]); // max

            var min = feature1.score;
            var avg = feature2.score;
            var max = feature3.score;

            feature1.max = max;
            feature1.avg = avg;
            feature1.min = min;

            feature2.max = max;
            feature2.avg = avg;
            feature2.min = min;

            feature3.max = max;
            feature3.avg = avg;
            feature3.min = min;

            this.insertFeature(feature1);
            this.insertFeature(feature2);
            this.insertFeature(feature3);
        }
    },

    draw: function (features, context, scale) {
        //alert("Geuvadis draw features.length=" + features.length);

        for (var i=0; i<features.length; i++) {
            var feature = features[i];
            context.fillStyle = feature.color; //'black'

            context.fillRect(Math.round(feature.position[scale].X),
                    this.featureHeight - Math.round(feature.position[scale].Y),
                    feature.position[scale].width, -Math.round(feature.logx10));
        }
    },

    populateMenu : function (feature) {
        return {
            Location      : feature.chr + ':' + feature.start + '-' + feature.end,
            Max           : feature.max,
            Avg           : feature.avg,
            Min           : feature.min,
            'Log(x+1)*10' : feature.logx10,
            Score         : feature.score,
            Ensembl       : feature.gene ? '<a target=_blank href="http://www.ensembl.org/Homo_sapiens/Gene/Summary?g='+ feature.gene +'">'+ feature.gene +'</a>' : '-'
        };

        /*
                Synonyms : gene.synonyms,
                OMIM     : gene.id_omim ? '<a target=_blank href="http://omim.org/'+ gene.id_omim +'">'+ gene.id_omim +'</a>' : '-',
                Morbid   : gene.id_morbid ? '<a target=_blank href="http://omim.org/'+ gene.id_morbid +'">'+ gene.id_morbid +'</a>' : '-',
                'UCSC ID': gene.id_ucsc ? '<a target=_blank href="http://genome.cse.ucsc.edu/cgi-bin/hgGene?hgg_gene='+ gene.id_ucsc +'">'+ gene.id_ucsc +'</a>' : '-',
                Ensembl  : gene.id_ensembl ? '<a target=_blank href="http://www.ensembl.org/Homo_sapiens/Gene/Summary?g='+ gene.id_ensembl +'">'+ gene.id_ensembl +'</a>' : '-',
                Protein  : gene.id_uniprot ? '<a target=_blank href="http://www.uniprot.org/uniprot/'+ gene.id_uniprot +'">'+ gene.id_uniprot +'</a>' : '-'
        */
    }            
});