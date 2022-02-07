import Track from 'js/Track/library/File';
import Model from 'js/Track/Model/File/GFF';

export default Track.extend({
  name          : 'GFF',
  model         : Model,
  bump          : true,
  height        : 100,
  featureHeight : 5
});
