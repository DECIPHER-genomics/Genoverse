Genoverse.Track.DAS.Transcript.Geuvadis = Genoverse.Track.DAS.Transcript.extend({

    populateExons : function (exons) {
        var s0 = "<table style='border:1px solid #aaa;'><tr><td>Type</td><td>Position</td><td>Method</td><td>Ori</td><td>Width</td></tr>";
        var i = 0;
        while(i < exons.length) {
            s0 += "<tr>" +
                "<td>" + exons[i].type + "</td>" +
                "<td>" + exons[i].start + "-" + exons[i].end + "</td>" +
                "<td>" + exons[i].method + "</td>" +
                "<td>" + exons[i].orientation + "</td>" +
                "<td>" + exons[i].width + "</td>" + "</tr>";
            i++;
        }
        s0 = s0 + "</table>";
        return s0;
    },

    populateMenu : function (feature) {
        return {
            Transcript: '<a target=_blank href="http://www.ensembl.org/Homo_sapiens/Transcript/Summary?t=' +
                        feature.id + ';db=core">'+ feature.id +'</a>',
            Location  : feature.start + '-' + feature.end, // feature.chr + ':' +
            Width     : feature.width,
            Type      : feature.type,
            Exons     : feature.exons.length,
            ' '       : this.populateExons(feature.exons)
        };
    }            
});

