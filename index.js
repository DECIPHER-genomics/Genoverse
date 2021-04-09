'use strict';

global.jQuery = global.$ = require('jquery');
require('jquery-ui-bundle');
require(__dirname + '/js/lib/jquery.mousewheel.js');
require(__dirname + '/js/lib/jquery.mousehold.js');
require(__dirname + '/js/lib/jquery.tipsy.js');

require(__dirname + '/js/lib/Base.js');
require(__dirname + '/js/lib/rtree.js');
require(__dirname + '/js/lib/dalliance-lib.min.js');
require(__dirname + '/js/lib/jDataView.js');
require(__dirname + '/js/lib/jParser.js');
require(__dirname + '/js/lib/BWReader.js');
require(__dirname + '/js/lib/VCFReader.js');

global.genomeHash = {
  grch37: require(__dirname + '/js/genomes/grch37.json'),
  grch38: require(__dirname + '/js/genomes/grch38.json')
};

const Genoverse = require(__dirname + '/js/Genoverse.js');

require(__dirname + '/js/Track.js');

require(__dirname + '/js/Track/Controller.js');
require(__dirname + '/js/Track/Model.js');
require(__dirname + '/js/Track/View.js');

require(__dirname + '/js/Track/library/Static.js');

require(__dirname + '/js/Track/Controller/Stranded.js');
require(__dirname + '/js/Track/Model/Stranded.js');

require(__dirname + '/js/Track/library/Graph.js');
require(__dirname + '/js/Track/library/Graph/Line.js');
require(__dirname + '/js/Track/library/Graph/Bar.js'); // Graph.Bar depends on Graph.Line

require(__dirname + '/js/Track/Controller/Sequence.js');
require(__dirname + '/js/Track/Model/Sequence.js');
require(__dirname + '/js/Track/Model/Sequence/Fasta.js');
require(__dirname + '/js/Track/Model/Sequence/Ensembl.js');
require(__dirname + '/js/Track/View/Sequence.js');
require(__dirname + '/js/Track/View/Sequence/Variation.js');

require(__dirname + '/js/Track/Model/SequenceVariation.js');

require(__dirname + '/js/Track/Model/Gene.js');
require(__dirname + '/js/Track/Model/Gene/Ensembl.js');
require(__dirname + '/js/Track/View/Gene.js');
require(__dirname + '/js/Track/View/Gene/Ensembl.js');

require(__dirname + '/js/Track/Model/Transcript.js');
require(__dirname + '/js/Track/Model/Transcript/Ensembl.js');
require(__dirname + '/js/Track/View/Transcript.js');
require(__dirname + '/js/Track/View/Transcript/Ensembl.js');

require(__dirname + '/js/Track/Model/File.js');
require(__dirname + '/js/Track/Model/File/BAM.js');
require(__dirname + '/js/Track/Model/File/BED.js');
require(__dirname + '/js/Track/Model/File/GFF.js');
require(__dirname + '/js/Track/Model/File/VCF.js');
require(__dirname + '/js/Track/Model/File/WIG.js');

require(__dirname + '/js/Track/library/Chromosome.js');
require(__dirname + '/js/Track/library/dbSNP.js');
require(__dirname + '/js/Track/library/File.js');
require(__dirname + '/js/Track/library/File/BAM.js');
require(__dirname + '/js/Track/library/File/BED.js');
require(__dirname + '/js/Track/library/File/BIGBED.js');
require(__dirname + '/js/Track/library/File/BIGWIG.js');
require(__dirname + '/js/Track/library/File/GFF.js');
require(__dirname + '/js/Track/library/File/VCF.js');
require(__dirname + '/js/Track/library/File/WIG.js');
require(__dirname + '/js/Track/library/Gene.js');
require(__dirname + '/js/Track/library/HighlightRegion.js');
require(__dirname + '/js/Track/library/Legend.js');
require(__dirname + '/js/Track/library/Scaleline.js');
require(__dirname + '/js/Track/library/Scalebar.js');

require(__dirname + '/js/plugins/controlPanel.js');
require(__dirname + '/js/plugins/fileDrop.js');
require(__dirname + '/js/plugins/focusRegion.js');
require(__dirname + '/js/plugins/fullscreen.js');
require(__dirname + '/js/plugins/karyotype.js');
require(__dirname + '/js/plugins/resizer.js');
require(__dirname + '/js/plugins/tooltips.js');
require(__dirname + '/js/plugins/trackControls.js');

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
