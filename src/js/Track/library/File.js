import Track from 'js/Track';

export default Track.extend({
  setInterface: function () {
    this.base();

    this._interface.isLocal   = 'model';
    this._interface.dataFile  = 'model';
    this._interface.indexFile = 'model';
    this._interface.largeFile = 'model';
  },
});
