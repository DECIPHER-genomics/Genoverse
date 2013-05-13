#!/usr/bin/perl

use strict;
use Data::Dumper;

my @files = qw(
  lib/jquery.js 
  lib/jquery-ui.js 
  lib/lazyload.js 
  lib/jquery.mousewheel.js 
  lib/jquery.mousehold.js 
  lib/Base.js 
  lib/rtree.js 
  lib/FRegion.js

  genomes/grch37.js

  Genoverse.js
  Track.js
  Track/Scalebar.js
  Track/Sequence.js
  Track/Fasta.js

  Track/File.js
  Track/File/VCF.js
  Track/File/BED.js

  Track/DAS.js
  Track/DAS/colorMap.js
  Track/DAS/Transcript.js
);

chdir 'js' or die "ERROR: $!\n Please run me from the top folder genoverse";
open COMBINED, '>', 'latest.js' or die $!;

print COMBINED "(function () {\n";
for (@files) {
  local $|=1;  
  open my $FILE, '<', $_ or die "Can't open '$_' for read: $!";
  while (<$FILE>) {
    print COMBINED;
  }
  close $FILE;
  print COMBINED "\n\n\n\n";
}

print COMBINED q|
var thisScriptTag = $('script:last');          
var config = thisScriptTag.text();             
if (config) {                                  
  try {                                        
    config = eval('('+ config +')');           
    $(document).ready(function(){              
      window.genoverse = new Genoverse(config) 
    });                                        
  } catch (e) {                                
    throw('Configuration ERROR:' + e);         
  };                                           
}                                              
})();                                          
$.noConflict(true);|;

close COMBINED;