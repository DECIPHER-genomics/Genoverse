Genoverse.Track.Model.Sequence.Ensembl = Genoverse.Track.Model.Sequence.extend({

  // Defaults 
  name : 'e! Sequence',
  url  : 'http://beta.rest.ensembl.org/sequence/region/human/__CHR__:__START__-__END__?content-type=text/plain', // Example url

  // TODO: Ensembl REST API has limit of 10 million for seqeunce, which is fine as long as the threshold is lower
  threshold : 100000

});