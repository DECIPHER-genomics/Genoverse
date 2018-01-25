'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var browserSync = require('browser-sync');
var gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins();
var reload = browserSync.reload;


// Copy all files at the root level to dest folder
gulp.task('copy', function() {
  gulp.src(['index.html', 'index.js'], { dot: true})
    .pipe(gulp.dest('dist'))
    .pipe($.size({title: 'copy'}))
});

// Compile and automatically prefix stylesheets
gulp.task('styles', function () {
  var AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
  ];

  // For best performance, don't add Sass partials to `gulp.src`
  return gulp.src(['css/**/*.scss', 'css/**/*.css'])
    .pipe($.newer('.tmp/styles'))
    .pipe($.sourcemaps.init())
    .pipe($.sass({
      precision: 10
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
    .pipe(gulp.dest('.tmp/styles'))
    // Concatenate and minify styles
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.size({title: 'styles'}))
    .pipe($.sourcemaps.write('./'))
    .pipe(gulp.dest('dist/styles'))
    .pipe(gulp.dest('.tmp/styles'));
});

var genoverseFiles = [
  'js/lib/Base.js',
  'js/lib/rtree.js',
  'js/lib/dalliance-lib.min.js',
  'js/lib/jDataView.js',
  'js/lib/jParser.js',
  'js/lib/BWReader.js',
  'js/lib/VCFReader.js',

  'js/Genoverse.js',

  'js/Track.js',

  'js/Track/Controller.js',
  'js/Track/Model.js',
  'js/Track/View.js',

  'js/Track/library/Static.js',

  'js/Track/Controller/Stranded.js',
  'js/Track/Model/Stranded.js',

  'js/Track/library/Graph.js',
  'js/Track/library/Graph/Line.js',
  'js/Track/library/Graph/Bar.js', // Graph.Bar depends on Graph.Line

  'js/Track/Controller/Sequence.js',
  'js/Track/Model/Sequence.js',
  'js/Track/Model/Sequence/Fasta.js',
  'js/Track/Model/Sequence/Ensembl.js',
  'js/Track/View/Sequence.js',
  'js/Track/View/Sequence/Variation.js',

  'js/Track/Model/SequenceVariation.js',

  'js/Track/Model/Gene.js',
  'js/Track/Model/Gene/Ensembl.js',
  'js/Track/View/Gene.js',
  'js/Track/View/Gene/Ensembl.js',

  'js/Track/Model/Transcript.js',
  'js/Track/Model/Transcript/Ensembl.js',
  'js/Track/View/Transcript.js',
  'js/Track/View/Transcript/Ensembl.js',

  'js/Track/Model/File.js',
  'js/Track/Model/File/BAM.js',
  'js/Track/Model/File/BED.js',
  'js/Track/Model/File/GFF.js',
  'js/Track/Model/File/VCF.js',
  'js/Track/Model/File/WIG.js',

  'js/Track/library/Chromosome.js',
  'js/Track/library/dbSNP.js',
  'js/Track/library/File.js',
  'js/Track/library/File/BAM.js',
  'js/Track/library/File/BED.js',
  'js/Track/library/File/BIGBED.js',
  'js/Track/library/File/BIGWIG.js',
  'js/Track/library/File/GFF.js',
  'js/Track/library/File/VCF.js',
  'js/Track/library/File/WIG.js',
  'js/Track/library/Gene.js',
  'js/Track/library/HighlightRegion.js',
  'js/Track/library/Legend.js',
  'js/Track/library/Scaleline.js',
  'js/Track/library/Scalebar.js'
];

var genoverseDependencies = [
  'js/lib/jquery.js',
  'js/lib/jquery-ui.js',
  'js/lib/jquery.mousewheel.js',
  'js/lib/jquery.mousehold.js',
  'js/lib/jquery.tipsy.js'
];

var genoversePlugins = [
  'js/plugins/controlPanel.js',
  'js/plugins/fileDrop.js',
  'js/plugins/focusRegion.js',
  'js/plugins/fullscreen.js',
  'js/plugins/karyotype.js',
  'js/plugins/resizer.js',
  'js/plugins/tooltips.js',
  'js/plugins/trackControls.js'
];

// Concatenate and minify JavaScript.
gulp.task('scripts:all', function () {
  gulp.src(
    genoverseDependencies.concat(genoverseFiles).concat(genoversePlugins)
  )
    .pipe($.newer('.tmp/scripts'))
    .pipe($.sourcemaps.init())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/scripts'))
    .pipe($.concat('genoverse.min.js'))
    .pipe($.uglify().on('error', function(e) {
      console.log(e);
    }))
    // Output files
    .pipe($.size({title: 'scripts'}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(gulp.dest('.tmp/scripts'))
});

// The scripts:nodeps bundles do NOT contain:
// - standard javascript libraries:
//   - jquery
//   - jquery-ui
//   - jquery-mousewheel
//   - jquery-mousehold
//   - jquery.tipsy.js
// - Genoverse plugins (Genoverse can load them asynchronously)
gulp.task('scripts:nodeps', function() {
  gulp.src(genoverseFiles)
    .pipe($.newer('.tmp/scripts/nodeps'))
    .pipe($.sourcemaps.init())
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest('.tmp/scripts/nodeps'))
    .pipe($.concat('genoverse.nodeps.min.js'))
    .pipe($.uglify().on('error', function(e) {
      console.log(e);
    }))
    // Output files
    .pipe($.size({title: 'scripts'}))
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(gulp.dest('.tmp/scripts/nodeps'))
});

// Clean output directory
gulp.task('clean', function () { del(['.tmp', 'dist/*', '!dist/.git'], {dot: true}) });

// Watch files for changes & reload
gulp.task('serve', ['copy', 'scripts:all', 'scripts:nodeps', 'styles'], function () {
  browserSync({
    notify: false,
    logPrefix: 'WSK', // Customize the Browsersync console logging prefix
    scrollElementMapping: ['main', '.mdl-layout'], // Allow scroll syncing across breakpoints
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: ['.tmp', 'app'],
    port: 3000
  });

  gulp.watch(['index.html'], reload);
  gulp.watch(['css/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['js/**/*.js'], ['scripts', reload]);
  gulp.watch(['i/**/*'], reload);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function () {
  browserSync({
    notify: false,
    logPrefix: 'WSK',
    scrollElementMapping: ['main', '.mdl-layout'], // Allow scroll syncing across breakpoints
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: 'dist',
    port: 3001
  })}
);

// Build production files, the default task
gulp.task('default', ['clean'], function(cb) {
  runSequence(
    'styles',
    ['scripts:all', 'scripts:nodeps', 'copy'],
    cb
  )
});
