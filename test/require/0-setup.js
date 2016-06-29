'use strict';

global.document  = require('jsdom').jsdom('');
global.window    = document.defaultView;
global.navigator = window.navigator;
global.expect    = require('expect');

global.Base      = require('basejs');
global.RTree     = require('rtree');
global.jdataview = require('jdataview');
global.jParser   = require('jParser');

global.jQuery = global.$ = require('jquery');

require('../../js/lib/jquery-ui');

global.dallianceLib = require('../../js/lib/dalliance-lib.min.js');
global.VCFReader    = require('../../js/lib/VCFReader.js');

global.Genoverse = require('../../js/Genoverse');

require('../../js/Track');

require('../../js/Track/Controller');
require('../../js/Track/Model');
require('../../js/Track/View');

require('../../js/Track/library/Static.js');

require('../../js/Track/Controller/Stranded.js');
require('../../js/Track/Model/Stranded.js');

require('../../js/Track/library/Graph.js');
require('../../js/Track/library/Graph/Bar.js');
require('../../js/Track/library/Graph/Line.js');

require('../../js/Track/Controller/Sequence.js');
require('../../js/Track/Model/Sequence.js');
require('../../js/Track/Model/Sequence/Fasta.js');
require('../../js/Track/Model/Sequence/Ensembl.js');
require('../../js/Track/View/Sequence.js');
require('../../js/Track/View/Sequence/Variation.js');

require('../../js/Track/Model/SequenceVariation.js');

require('../../js/Track/Model/Gene.js');
require('../../js/Track/Model/Gene/Ensembl.js');
require('../../js/Track/View/Gene.js');
require('../../js/Track/View/Gene/Ensembl.js');

require('../../js/Track/Model/Transcript.js');
require('../../js/Track/Model/Transcript/Ensembl.js');
require('../../js/Track/View/Transcript.js');
require('../../js/Track/View/Transcript/Ensembl.js');

require('../../js/Track/Model/File.js');
require('../../js/Track/Model/File/BAM.js');
require('../../js/Track/Model/File/BED.js');
require('../../js/Track/Model/File/GFF.js');
require('../../js/Track/Model/File/VCF.js');

require('../../js/Track/library/Chromosome.js');
require('../../js/Track/library/dbSNP.js');
require('../../js/Track/library/File.js');
require('../../js/Track/library/File/BAM.js');
require('../../js/Track/library/File/BED.js');
require('../../js/Track/library/File/GFF.js');
require('../../js/Track/library/File/VCF.js');
require('../../js/Track/library/Gene.js');
require('../../js/Track/library/HighlightRegion.js');
require('../../js/Track/library/Legend.js');
require('../../js/Track/library/Scaleline.js');
require('../../js/Track/library/Scalebar.js');
