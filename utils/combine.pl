#!/usr/bin/perl

use strict;
use Data::Dumper;

my @files;

open INDEX, 'expanded.html' or die $!;

while (<INDEX>) {
  push @files, $1 if /<script[^>]+src="(.*)"/;
}

my $wrapper = q|(function () {

%s

var config = $('script:last').text();

if (config) {
  try {
    config = eval('('+ config +')');
    $(document).ready(function(){
      window.genoverse = new Genoverse(config);
    });
  } catch (e) {
    throw('Configuration ERROR:' + e);
  };
}
})();
|;

my ($jquery, $js);

foreach (@files) {
  my $file = $_ eq 'js/lib/jquery.js' ? \$jquery : \$js;

  local $/ = undef;

  open FH, '<', $_ or warn "Can't open '$_' for read: $!";

  $$file .= <FH>;
  $$file .= "\n\n";

  close FH;
}

open COMBINED,           '>', 'js/genoverse.combined.js'          or die $!;
open COMBINED_NO_JQUERY, '>', 'js/genoverse.combined.nojquery.js' or die $!;

printf COMBINED           $wrapper, "$jquery$js";
printf COMBINED_NO_JQUERY $wrapper, $js;

close COMBINED;
close COMBINED_NO_JQUERY;