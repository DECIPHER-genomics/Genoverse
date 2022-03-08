import Model from '../../Model/File/GFF';
import Track from '../File';

export default Track.extend({
  name          : 'GFF',
  model         : Model,
  bump          : true,
  height        : 100,
  featureHeight : 5,
});
