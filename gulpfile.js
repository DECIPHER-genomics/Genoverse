'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var del = require('del');
var browserSync = require('browser-sync');
var gulpLoadPlugins = require('gulp-load-plugins');

var $ = gulpLoadPlugins();
var reload = browserSync.reload;


// Copy files at the root level to dest folder
gulp.task('copy', function() {
  gulp.src(['index.html'], { dot: true}) // copies index.html and index.js for testing purposes
    .pipe(gulp.dest('dist')) // writes them to /dist folder
    .pipe(gulp.dest('.tmp')) // writes them to /.tmp folder for development server
    .pipe($.size({title: 'copy'})) // reports size of those files to the console
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
    .pipe($.newer('.tmp/css')) // re-build only if .tmp/css contains older versions
    .pipe($.sourcemaps.init()) // create sitemaps
    .pipe($.sass({ precision: 10 }).on('error', $.sass.logError)) // if any SASS in sources, compile it to css
    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS)) // add browser-specific prefixes
    .pipe(gulp.dest('.tmp/css')) // output results to .tmp/css
    // Concatenate and minify styles
    .pipe($.if('*.css', $.cssnano())) // uglify css with cssnano
    .pipe($.size({title: 'styles'})) // report bundle size to the console
    .pipe($.sourcemaps.write('./')) // not sure about this, it's supposed to write sourcemaps file, but I can't see it
    .pipe(gulp.dest('dist/css'))  // output results to /dist/css
    .pipe(gulp.dest('.tmp/css')); // also output results to /.tmp/css
});

// Copy-paste fonts to /.tmp and /dist
gulp.task('fonts', function() {
  return gulp.src(['fonts/**/*'])
    .pipe($.newer('.tmp/fonts')) // re-build only if .tmp/fonts contains older versions
    .pipe($.size({title: 'fonts'})) // report size to the console
    .pipe(gulp.dest('dist/fonts'))  // output results to /dist/fonts
    .pipe(gulp.dest('.tmp/fonts'))  // also output results to /.tmp/fonts
});

// Copy-paste images to /.tmp and /dist
gulp.task('images', function() {
  return gulp.src(['i/**/*'])
    .pipe($.newer('.tmp/i')) // re-build only if .tmp/i contains older versions
    .pipe($.size({title: 'images'})) // report size to the console
    .pipe(gulp.dest('dist/i'))  // output results to /dist/i
    .pipe(gulp.dest('.tmp/i'))  // also output results to /.tmp/i
});

// genoverseFiles array includes all the modules of Genoverse, except by plugins
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
  'js/Track/library/Scalebar.js',
];

// standard jquery & friends, available from npm
var genoverseDependencies = [
  'js/lib/jquery.js',
  'js/lib/jquery-ui.js',
  'js/lib/jquery.mousewheel.js',
  'js/lib/jquery.mousehold.js',
  'js/lib/jquery.tipsy.js'
];

// Genoverse plugins that Genoverse itself can asynchronously download from server
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

// Genoverse attempts to download genomes from ./genomes subfolder of the same folder, where its bundle resides
var genoverseGenomes = [
  'js/genomes/*.js'
];

// Concatenate and minify JavaScript.
gulp.task('scripts:all', function () {
  gulp.src(
    genoverseDependencies.concat(genoverseFiles).concat(genoversePlugins), {base: './js/'}
  )
    .pipe($.newer('.tmp/js')) // re-build only if .tmp/js contains older versions
    .pipe($.sourcemaps.init()) // make sitemaps track the initial files
    // .pipe($.sourcemaps.write()) // create inline sitemaps within the input stream files
    .pipe(gulp.dest('.tmp/js')) // output raw files to /.tmp/js folder
    .pipe($.concat('genoverse.concat.js')) // create a concatenated bundle
    .pipe(gulp.dest('dist/js')) // output concatenated, but non-minified
    .pipe($.rename('genoverse.min.js')) // rename output stream to min.js
    .pipe($.uglify().on('error', function(e) { console.log(e); })) // uglify bundle; if error, report it to console
    // Output files
    .pipe($.size({title: 'scripts:all'})) // report bundle size to the console
    .pipe($.sourcemaps.write('.')) // write sourcemaps as standalone .maps files
    .pipe(gulp.dest('dist/js')) // write results to /dist/js
    .pipe(gulp.dest('.tmp/js')); // write results to ./tmp/js

  gulp.src(genoverseGenomes, {base: './js/'})
    .pipe($.newer('.tmp/js/'))
    .pipe(gulp.dest('dist/js'))
    .pipe(gulp.dest('.tmp/js/'));
});

// The scripts:nodeps bundles do NOT contain:
// - standard javascript libraries (jquery, jquery-ui, jquery-mousewheel, jquery-mousehold and jquery.tipsy)
// - Genoverse plugins (Genoverse can load them asynchronously)
gulp.task('scripts:nodeps', function() {
  gulp.src(genoverseFiles.concat(genoversePlugins), {base: './js/'})
    .pipe($.newer('.tmp/js/nodeps')) // re-build only if .tmp/js/nodeps contains older versions
    .pipe($.sourcemaps.init())
    // .pipe($.sourcemaps.write()) // create inline sitemaps within the input stream files
    .pipe(gulp.dest('.tmp/js/nodeps')) // write javascript subtree into a separate .tmp/js/nodeps subfolder
    .pipe($.concat('genoverse.concat.nodeps.js')) // create a concatenated bundle
    .pipe(gulp.dest('dist/js')) // output concatenated, but non-minified
    .pipe($.rename('genoverse.min.nodeps.js')) // concatenate only Genoverse without jquery and Genoverse plugins
    .pipe($.uglify().on('error', function(e) { console.log(e); })) // uglify js; report error to the console, if any
    // Output files
    .pipe($.size({title: 'scripts:nodeps'})) // report bundle size to the console
    .pipe($.sourcemaps.write('.')) // write sourcemaps as standalone .maps files
    .pipe(gulp.dest('dist/js')) // write results to /dist/js
    .pipe(gulp.dest('.tmp/js/nodeps')); // write results to .tmp/js/nodeps

  gulp.src(genoverseGenomes, {base: './js/'})
    .pipe($.newer('.tmp/js/'))
    .pipe(gulp.dest('dist/js'))
    .pipe(gulp.dest('.tmp/js/'));
});

// Clean /dist and /.tmp directories
gulp.task('clean', function () { return del(['.tmp', 'dist/*', '!dist/.git'], {dot: true}) });

// Watch files for changes & reload
gulp.task('serve', ['copy', 'styles', 'fonts', 'images', 'scripts:all', 'scripts:nodeps'], function () {
  browserSync({ // see: https://browsersync.io/docs/gulp
    notify: false,
    logPrefix: 'WSK', // Customize the Browsersync console logging prefix
    scrollElementMapping: ['main', '.mdl-layout'], // Allow scroll syncing across breakpoints
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: '.tmp',
    port: 3000
  });

  // if any source files change, call BrowserSync's reload() to reflect changes
  gulp.watch(['index.html'], reload);
  gulp.watch(['css/**/*.{scss,css}'], ['styles', reload]);
  gulp.watch(['fonts/**/*'], reload);
  gulp.watch(['i/**/*'], reload);
  gulp.watch(['js/**/*.js'], ['scripts:all', reload]);
});

// Build and serve the output from the dist build
gulp.task('serve:dist', ['default'], function () {
  browserSync({ // see: https://browsersync.io/docs/gulp
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
    'fonts',
    'images',
    ['scripts:all', 'scripts:nodeps', 'copy'],
    cb
  )
});
