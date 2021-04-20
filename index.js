'use strict';

require('jquery-ui-bundle');
require(__dirname + '/js/lib/jquery.mousewheel.js');
require(__dirname + '/js/lib/jquery.mousehold.js');
require(__dirname + '/js/lib/jquery.tipsy.js');

let Genoverse = require(__dirname + '/js/Genoverse.js');
const {Track, Static, Legend }  = require(__dirname + '/js/Track.js');
Genoverse.Track = Track;

Genoverse.Track.Controller = require(__dirname + '/js/Track/Controller.js');
Genoverse.Track.Model = require(__dirname + '/js/Track/Model.js');
Genoverse.Track.View = require(__dirname + '/js/Track/View.js');

Genoverse.Track.Static = Static.Track;
Genoverse.Track.View.Static = Static.View;
Genoverse.Track.Model.Static = Static.Model;
Genoverse.Track.Controller.Static = Static.Controller;

Genoverse.Track.Controller.Stranded = require(__dirname + '/js/Track/Controller/Stranded.js');
Genoverse.Track.Model.Stranded = require(__dirname + '/js/Track/Model/Stranded.js');

const Graph = require(__dirname + '/js/Track/library/Graph.js');
Genoverse.Track.Graph = Graph.Track;
Genoverse.Track.View.Graph = Graph.View;
Genoverse.Track.Model.Graph = Graph.Model;
Genoverse.Track.Controller.Graph = Graph.Controller;

const Line = require(__dirname + '/js/Track/library/Graph/Line.js');
Genoverse.Track.Graph.Line = Line.Track;
Genoverse.Track.View.Graph.Line = Line.View;
Genoverse.Track.Model.Graph.Line = Line.Model;
Genoverse.Track.Controller.Graph.Line = Line.Controller;

const Bar = require(__dirname + '/js/Track/library/Graph/Bar.js'); // Graph.Bar depends on Graph.Line
Genoverse.Track.Graph.Bar = Bar.Track;
Genoverse.Track.View.Graph.Bar = Bar.View;
Genoverse.Track.Model.Graph.Bar = Bar.Model;
Genoverse.Track.Controller.Graph.Bar = Bar.Controller;

Genoverse.Track.Controller.Sequence = require(__dirname + '/js/Track/Controller/Sequence.js');
Genoverse.Track.Model.Sequence = require(__dirname + '/js/Track/Model/Sequence.js');
Genoverse.Track.Model.Sequence.Fasta = require(__dirname + '/js/Track/Model/Sequence/Fasta.js');
Genoverse.Track.Model.Sequence.Ensembl = require(__dirname + '/js/Track/Model/Sequence/Ensembl.js');
Genoverse.Track.View.Sequence = require(__dirname + '/js/Track/View/Sequence.js');
Genoverse.Track.View.Sequence.SequenceVariation = require(__dirname + '/js/Track/View/Sequence/Variation.js');

Genoverse.Track.Model.Sequence.SequenceVariation = require(__dirname + '/js/Track/Model/SequenceVariation.js');

Genoverse.Track.Model.Gene = require(__dirname + '/js/Track/Model/Gene.js');
Genoverse.Track.Model.Gene.Ensembl = require(__dirname + '/js/Track/Model/Gene/Ensembl.js');
Genoverse.Track.View.Gene = require(__dirname + '/js/Track/View/Gene.js');
Genoverse.Track.View.Gene.Ensembl = require(__dirname + '/js/Track/View/Gene/Ensembl.js');

Genoverse.Track.Model.Transcript = require(__dirname + '/js/Track/Model/Transcript.js');
Genoverse.Track.Model.Transcript.Ensembl = require(__dirname + '/js/Track/Model/Transcript/Ensembl.js');
Genoverse.Track.View.Transcript = require(__dirname + '/js/Track/View/Transcript.js');
Genoverse.Track.View.Transcript.Ensembl = require(__dirname + '/js/Track/View/Transcript/Ensembl.js');

Genoverse.Track.Model.File = require(__dirname + '/js/Track/Model/File.js');
Genoverse.Track.Model.File.BAM = require(__dirname + '/js/Track/Model/File/BAM.js');
Genoverse.Track.Model.File.BED = require(__dirname + '/js/Track/Model/File/BED.js');
Genoverse.Track.Model.File.GFF = require(__dirname + '/js/Track/Model/File/GFF.js');
Genoverse.Track.Model.File.GTF = Genoverse.Track.Model.File.GFF;
Genoverse.Track.Model.File.VCF = require(__dirname + '/js/Track/Model/File/VCF.js');
Genoverse.Track.Model.File.WIG = require(__dirname + '/js/Track/Model/File/WIG.js');

Genoverse.Track.Chromosome = require(__dirname + '/js/Track/library/Chromosome.js');
Genoverse.Track.dbSNP = require(__dirname + '/js/Track/library/dbSNP.js');
Genoverse.Track.File = require(__dirname + '/js/Track/library/File.js');

Genoverse.Track.File.BAM = require(__dirname + '/js/Track/library/File/BAM.js');
Genoverse.Track.File.BED = require(__dirname + '/js/Track/library/File/BED.js');
Genoverse.Track.File.BIGBED = require(__dirname + '/js/Track/library/File/BIGBED.js');
Genoverse.Track.File.BB = Genoverse.Track.File.BIGBED;
Genoverse.Track.File.BIGWIG = require(__dirname + '/js/Track/library/File/BIGWIG.js');
Genoverse.Track.File.BW = Genoverse.Track.File.BIGWIG;
Genoverse.Track.File.GFF = require(__dirname + '/js/Track/library/File/GFF.js');
Genoverse.Track.File.GTF = Genoverse.Track.File.GFF;
Genoverse.Track.File.VCF = require(__dirname + '/js/Track/library/File/VCF.js');
Genoverse.Track.File.WIG = require(__dirname + '/js/Track/library/File/WIG.js');

Genoverse.Track.Gene = require(__dirname + '/js/Track/library/Gene.js');
Genoverse.Track.HighlightRegion = require(__dirname + '/js/Track/library/HighlightRegion.js');
// Legend
Genoverse.Track.Legend = Legend.Track;
Genoverse.Track.View.Legend = Legend.View;
Genoverse.Track.Model.Legend = Legend.Model;
Genoverse.Track.Controller.Legend = Legend.Controller;

Genoverse.Track.Scaleline = require(__dirname + '/js/Track/library/Scaleline.js');
Genoverse.Track.Scalebar = require(__dirname + '/js/Track/library/Scalebar.js');

Genoverse.Plugins.controlPanel = require('Plugins/controlPanel.js');
Genoverse.Plugins.focusRegion = require('Plugins/focusRegion.js');
Genoverse.Plugins.fullscreen = require('Plugins/fullscreen.js');
Genoverse.Plugins.tooltips = require('Plugins/tooltips.js');
Genoverse.Plugins.fileDrop = require('Plugins/fileDrop.js');
Genoverse.Plugins.karyotype = require('Plugins/karyotype.js');
Genoverse.Plugins.resizer = require('Plugins/resizer.js');
Genoverse.Plugins.trackControls = require('Plugins/trackControls.js');

// CSS:
require(__dirname + '/css/genoverse.css');
require(__dirname + '/css/controlPanel.css');
require(__dirname + '/css/trackControls.css');
require(__dirname + '/css/tooltips.css');
require(__dirname + '/css/resizer.css');
require(__dirname + '/css/karyotype.css');
require(__dirname + '/css/fileDrop.css');
require(__dirname + '/css/fullscreen.css');

module.exports = Genoverse;
