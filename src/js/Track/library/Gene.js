import Track           from '../../Track';
import GeneModel       from '../Model/Gene/Ensembl';
import TranscriptModel from '../Model/Transcript/Ensembl';
import GeneView        from '../View/Gene/Ensembl';
import TranscriptView  from '../View/Transcript/Ensembl';
import Legend           from './Legend';

export default Track.extend({
  id     : 'genes',
  name   : 'Genes',
  height : 200,
  legend : Legend,

  populateMenu: function (feature) {
    const url  = `https://www.ensembl.org/Homo_sapiens/${feature.feature_type === 'transcript' ? 'Transcript' : 'Gene'}/Summary?${feature.feature_type === 'transcript' ? 't' : 'g'}=${feature.id}`;
    const menu = {
      title    : `<a target="_blank" href="${url}">${feature.external_name ? `${feature.external_name} (${feature.id})` : feature.id}</a>`,
      Location : `${feature.chr}:${feature.start}-${feature.end}`,
      Source   : feature.source,
      Biotype  : feature.biotype,
    };

    if (feature.feature_type === 'transcript') {
      menu.Gene = `<a target="_blank" href="https://www.ensembl.org/Homo_sapiens/Gene/Summary?g=${feature.Parent}">${feature.Parent}</a>`;
    }

    return menu;
  },

  // Different settings for different zoom level
  2000000: { // This one applies when > 2M base-pairs per screen
    labels: false,
  },
  100000: { // more than 100K but less then 2M
    labels : true,
    model  : GeneModel,
    view   : GeneView,
  },
  1: { // > 1 base-pair, but less then 100K
    labels : true,
    model  : TranscriptModel,
    view   : TranscriptView,
  },
});
