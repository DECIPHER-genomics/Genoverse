import Model from 'js/Track/Model/Sequence';

export default Model.extend({
  url              : '//rest.ensembl.org/sequence/region/human/__CHR__:__START__-__END__?content-type=text/plain', // Example url
  dataRequestLimit : 10000000 // As per e! REST API restrictions
});
