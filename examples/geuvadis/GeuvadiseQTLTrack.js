Genoverse.Track.GeuvadiseQTLTrack = Genoverse.Track.extend({

    // Defaults
    name           : 'eQTL',
    url            : 'eQTL?r=__CHR__:__START__-__END__',
    height         : 100,
    featureHeight  : 98,
    resizable      : false,
    normColor      : 'rgba(250,0,0,0.8)',
    bestColor      : 'rgba(0,0,250,0.8)',
    info           : 'eQTL',
    browser        : null,

    parseData      : function (data) {
        //alert("eQTL parseData data.length=" + data.length);

        var i = data.length;
        while (i--) {
            data[i].start      = parseInt(data[i].start, 10);
            data[i].end        = parseInt(data[i].end, 10);
            data[i].score      = parseFloat(data[i].score);
            data[i].color      = this.normColor;

            var j = data[i].linked.length;
            while (j--) {
                if (data[i].linked[j].best == "true") {
                    data[i].color  = this.bestColor;
                    break;
                }
            }

            this.insertFeature(data[i]);

            //alert("eQTL parseData adding feature " + data[i].id);
        }
    },

    draw: function (features, context, scale) {
       // alert("eQTL draw features.length=" + features.length);

        for (var i=0; i<features.length; i++) {
            var feature = features[i];
            context.fillStyle = feature.color; //'black'
            context.strokeStyle = feature.color; //'black'

            var x = Math.round(feature.position[scale].X);
            var y = Math.round(feature.position[scale].Y);
            var score = Math.round(feature.score);


            if (feature.featureType == "INDEL") {

                context.beginPath();
                context.moveTo(x, this.featureHeight - y);
                context.lineTo(x, this.featureHeight - y -score);
                context.stroke();
                context.closePath();

                context.fillRect(x, this.featureHeight - y - score/2,
                        feature.position[scale].width, -(score - score/2));
            } else {
                context.fillRect(x, this.featureHeight - y,
                        feature.position[scale].width, -score);
            }
        }
    },

    linkedToATable : function (feature, linked) {

        var string0 = "<table style='border:1px solid #aaa;'><tr><td>Score</td><td>Best</td><td>Position</td><td>Ensembl</td></tr>";
        string0 = string0 + "<tr>";

        var i = linked.length;
        while(i--) {

            var linkedStart = parseInt(linked[i].start, 10);
            var linkedEnd   = parseInt(linked[i].end, 10);

            var s0 = Math.min(feature.start, linkedStart);
            var e0 = Math.max(feature.end, linkedEnd);
            var d0 = Math.ceil((e0 - s0)/10);

            s0 -= d0;
            e0 += d0;

            string0 = string0 + "<tr>";
            string0 = string0 +
                "<td>" + linked[i].linkscore + "</td>" +
                "<td>" + (linked[i].best == "true" ? "best" : "-") + "</td>" +
                "<td>" + '<a href="javascript:track.browser.setRange(' + s0 + ',' + e0 + ',true)">' +
                    linked[i].chr + ":" + linked[i].start + "-" + linked[i].end + "</a>" + "</td>" +

                "<td>" + '<a target=_blank href="http://www.ensembl.org/Homo_sapiens/Gene/Summary?g='+
                    linked[i].id +'">'+ linked[i].id +'</a>' + "</td>";

            string0 = string0 + "</tr>";
        }

        string0 = string0 + "</table>";

        return string0;
    },

    populateMenu : function (feature) {
        var sr = feature.chr + ":" + (feature.start - 5)  + "-" + (feature.end + 5);
        var rr = feature.chr + ":" + (this.browser.start)  + "-" + (this.browser.end);

        return {
            Id           : feature.id,
            Type         : feature.type,
            Location     : feature.chr + ':' + feature.start + '-' + feature.end,
            Score        : feature.score,
            Width        : feature.width,
            Linked       : this.linkedToATable(feature, feature.linked),
            '1000Genomes' : ' ',
            '    SNIP': '<a target=_blank href="http://browser.1000genomes.org/Homo_sapiens/Location/View?db=core;r='+ sr +'">'+ sr +'</a>',
            '    Region': '<a target=_blank href="http://browser.1000genomes.org/Homo_sapiens/Location/View?db=core;r='+ rr +'">'+ rr +'</a>'
        };
    }

});