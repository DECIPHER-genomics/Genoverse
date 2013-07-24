#!/usr/bin/perl

use strict;
use Data::Dumper;

my @files;

open INDEX, 'expanded.html' or die $!;
while (<INDEX>) {
  if ($_ =~ /<script[^>]+src="(.*)"/) {
    push @files, $1;
  }
}

open COMBINED, '>', 'js/genoverse.combined.js' or die $!;

print COMBINED "(function () {\n";
for (@files) {
  local $|=1;  
  open my $FILE, '<', $_ or warn "Can't open '$_' for read: $!";
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