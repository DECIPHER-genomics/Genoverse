import Model from 'js/Track/Model/File/GFF';
import Track from 'js/Track/library/File';

export default Track.extend({
  name          : 'GFF',
  model         : Model,
  bump          : true,
  height        : 100,
  featureHeight : 5,
});
