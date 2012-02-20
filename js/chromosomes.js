/*!
 * Copyright (c) 2011 Genome Research Ltd.
 * Author: Evgeny Bragin
 * Released under the Modified-BSD license, see LICENSE.TXT
 */

var sizes = [
  249250621,
  243199373,
  198022430,
  191154276,
  180915260,
  171115067,
  159138663,
  146364022,
  141213431,
  135534747,
  135006516,
  133851895,
  115169878,
  107349540,
  102531392,
  90354753,
  81195210,
  78077248,
  59128983,
  63025520,
  48129895,
  51304566,
  155270560,
  59373566
]

var chromosomes = new Object;

for (var i = 0; i < sizes.length; i++) {
  chromosomes[i+1] = { id: (i+1), size: sizes[i] };
  chromosomes.X = chromosomes[23];
  chromosomes.Y = chromosomes[24];
}
