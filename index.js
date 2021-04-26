'use strict';

require('jquery-ui-bundle');
require('./js/lib/jquery.mousewheel.js');
require('./js/lib/jquery.mousehold.js');
require('./js/lib/jquery.tipsy.js');

const GenoverseClass = require('./js/Genoverse.js');
const { Track, Static, Legend }  = require('./js/Track.js');
GenoverseClass.Track = Track;

GenoverseClass.Track.Controller = require('./js/Track/Controller.js');
GenoverseClass.Track.Model = require('./js/Track/Model.js');
GenoverseClass.Track.View = require('./js/Track/View.js');

GenoverseClass.Track.Static = Static.Track;
GenoverseClass.Track.View.Static = Static.View;
GenoverseClass.Track.Model.Static = Static.Model;
GenoverseClass.Track.Controller.Static = Static.Controller;

GenoverseClass.Track.Controller.Stranded = require('./js/Track/Controller/Stranded.js');
GenoverseClass.Track.Model.Stranded = require('./js/Track/Model/Stranded.js');

const Graph = require('./js/Track/library/Graph.js');
GenoverseClass.Track.Graph = Graph.Track;
GenoverseClass.Track.View.Graph = Graph.View;
GenoverseClass.Track.Model.Graph = Graph.Model;
GenoverseClass.Track.Controller.Graph = Graph.Controller;

const Line = require('./js/Track/library/Graph/Line.js');
GenoverseClass.Track.Graph.Line = Line.Track;
GenoverseClass.Track.View.Graph.Line = Line.View;
GenoverseClass.Track.Model.Graph.Line = Line.Model;
GenoverseClass.Track.Controller.Graph.Line = Line.Controller;

const Bar = require('./js/Track/library/Graph/Bar.js'); // Graph.Bar depends on Graph.Line
GenoverseClass.Track.Graph.Bar = Bar.Track;
GenoverseClass.Track.View.Graph.Bar = Bar.View;
GenoverseClass.Track.Model.Graph.Bar = Bar.Model;
GenoverseClass.Track.Controller.Graph.Bar = Bar.Controller;

GenoverseClass.Track.Controller.Sequence = require('./js/Track/Controller/Sequence.js');
GenoverseClass.Track.Model.Sequence = require('./js/Track/Model/Sequence.js');
GenoverseClass.Track.Model.Sequence.Fasta = require('./js/Track/Model/Sequence/Fasta.js');
GenoverseClass.Track.Model.Sequence.Ensembl = require('./js/Track/Model/Sequence/Ensembl.js');
GenoverseClass.Track.View.Sequence = require('./js/Track/View/Sequence.js');
GenoverseClass.Track.View.Sequence.SequenceVariation = require('./js/Track/View/Sequence/Variation.js');

GenoverseClass.Track.Model.Sequence.SequenceVariation = require('./js/Track/Model/SequenceVariation.js');

GenoverseClass.Track.Model.Gene = require('./js/Track/Model/Gene.js');
GenoverseClass.Track.Model.Gene.Ensembl = require('./js/Track/Model/Gene/Ensembl.js');
GenoverseClass.Track.View.Gene = require('./js/Track/View/Gene.js');
GenoverseClass.Track.View.Gene.Ensembl = require('./js/Track/View/Gene/Ensembl.js');

GenoverseClass.Track.Model.Transcript = require('./js/Track/Model/Transcript.js');
GenoverseClass.Track.Model.Transcript.Ensembl = require('./js/Track/Model/Transcript/Ensembl.js');
GenoverseClass.Track.View.Transcript = require('./js/Track/View/Transcript.js');
GenoverseClass.Track.View.Transcript.Ensembl = require('./js/Track/View/Transcript/Ensembl.js');

GenoverseClass.Track.Model.File = require('./js/Track/Model/File.js');
GenoverseClass.Track.Model.File.BAM = require('./js/Track/Model/File/BAM.js');
GenoverseClass.Track.Model.File.BED = require('./js/Track/Model/File/BED.js');
GenoverseClass.Track.Model.File.GFF = require('./js/Track/Model/File/GFF.js');
GenoverseClass.Track.Model.File.GTF = GenoverseClass.Track.Model.File.GFF;
GenoverseClass.Track.Model.File.VCF = require('./js/Track/Model/File/VCF.js');
GenoverseClass.Track.Model.File.WIG = require('./js/Track/Model/File/WIG.js');

GenoverseClass.Track.Chromosome = require('./js/Track/library/Chromosome.js');
GenoverseClass.Track.dbSNP = require('./js/Track/library/dbSNP.js');
GenoverseClass.Track.File = require('./js/Track/library/File.js');

GenoverseClass.Track.File.BAM = require('./js/Track/library/File/BAM.js');
GenoverseClass.Track.File.BED = require('./js/Track/library/File/BED.js');
GenoverseClass.Track.File.BIGBED = require('./js/Track/library/File/BIGBED.js');
GenoverseClass.Track.File.BB = GenoverseClass.Track.File.BIGBED;
GenoverseClass.Track.File.BIGWIG = require('./js/Track/library/File/BIGWIG.js');
GenoverseClass.Track.File.BW = GenoverseClass.Track.File.BIGWIG;
GenoverseClass.Track.File.GFF = require('./js/Track/library/File/GFF.js');
GenoverseClass.Track.File.GTF = GenoverseClass.Track.File.GFF;
GenoverseClass.Track.File.VCF = require('./js/Track/library/File/VCF.js');
GenoverseClass.Track.File.WIG = require('./js/Track/library/File/WIG.js');

GenoverseClass.Track.Gene = require('./js/Track/library/Gene.js');
GenoverseClass.Track.HighlightRegion = require('./js/Track/library/HighlightRegion.js');
// Legend
GenoverseClass.Track.Legend = Legend.Track;
GenoverseClass.Track.View.Legend = Legend.View;
GenoverseClass.Track.Model.Legend = Legend.Model;
GenoverseClass.Track.Controller.Legend = Legend.Controller;

GenoverseClass.Track.Scaleline = require('./js/Track/library/Scaleline.js');
GenoverseClass.Track.Scalebar = require('./js/Track/library/Scalebar.js');

GenoverseClass.Plugins.controlPanel = require('Plugins/controlPanel.js');
GenoverseClass.Plugins.focusRegion = require('Plugins/focusRegion.js');
GenoverseClass.Plugins.fullscreen = require('Plugins/fullscreen.js');
GenoverseClass.Plugins.tooltips = require('Plugins/tooltips.js');
GenoverseClass.Plugins.fileDrop = require('Plugins/fileDrop.js');
GenoverseClass.Plugins.karyotype = require('Plugins/karyotype.js');
GenoverseClass.Plugins.resizer = require('Plugins/resizer.js');
GenoverseClass.Plugins.trackControls = require('Plugins/trackControls.js');

// CSS:
require('./css/genoverse.css');

// Plugins:
require('./plugins.index.js')

console.log(GenoverseClass)
module.exports = GenoverseClass;
