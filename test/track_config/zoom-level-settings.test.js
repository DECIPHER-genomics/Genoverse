const { afterTest } = require('../utils');

describe('Zoom level settings', () => {
  afterEach(afterTest);

  const genoverse = new Genoverse({
    chr            : 1,
    start          : 1,
    end            : 20,
    chromosomeSize : 9e99,
    tracks         : [ Genoverse.Track.Gene.extend({ data: [], url: false, legend: false }) ],
  });

  const track = genoverse.tracks[0];

  it('Initial models and views are correct', () => {
    track.model.__id = 1;
    track.view.__id  = 1;

    expect(track.lengthMap.length).toBe(4);
    expect(track.lengthMap.map(l => l[0])).toEqual([ 2000000, 100000, 1, -1 ]);

    expect(track.model).toBeInstanceOf(Genoverse.Track.Model.Transcript);
    expect(track.view).toBeInstanceOf(Genoverse.Track.View.Transcript);

    expect(track.model).toEqual(track.models[1]);
    expect(track.view).toEqual(track.views[1]);

    expect(track.view.labels).toBe(true);
  });

  it('Model and view changed after zoom out', () => {
    genoverse.moveTo(1, 1, 100001);

    track.model.__id = 2;
    track.view.__id  = 2;

    expect(genoverse.length).toBe(100001);

    expect(track.model).toBeInstanceOf(Genoverse.Track.Model.Gene);
    expect(track.view).toBeInstanceOf(Genoverse.Track.View.Gene);

    expect(track.model).toEqual(track.models[100000]);
    expect(track.view).toEqual(track.views[100000]);

    expect(track.view.labels).toBe(true);
  });

  it('View changed after zoom out further', () => {
    genoverse.moveTo(1, 1, 2000001);

    track.view.__id = 3;

    expect(genoverse.length).toBe(2000001);

    expect(track.model.__id).toBe(2);
    expect(track.model).toEqual(track.models[100000]);

    expect(track.view).not.toBeInstanceOf(Genoverse.Track.View.Gene);

    const proto1 = track.view.constructor.prototype;
    const proto2 = track.lengthMap[1][1].view.constructor.prototype;

    for (const i in proto1) { // eslint-disable-line no-restricted-syntax
      if (typeof proto1[i] === 'function') {
        expect(proto1[i].toString()).toBe(proto2[i].toString());
      } else {
        expect(proto1[i]).toBe(proto2[i]);
      }
    }

    expect(track.model).toEqual(track.models[2000000]);
    expect(track.view).toEqual(track.views[2000000]);

    expect(track.view.labels).toBe(false);
  });

  it('View changed after zooming in', () => {
    genoverse.moveTo(1, 200000, 300000);

    expect(track.model.__id).toBe(2);
    expect(track.view.__id).toBe(2);
  });

  it('Model and view changed after zooming in further', () => {
    genoverse.moveTo(1, 200000, 200001);

    expect(track.model.__id).toBe(1);
    expect(track.view.__id).toBe(1);
  });

  it('Model and view changed after zooming out as far as possible', () => {
    genoverse.moveTo(1, 1, 9e99);

    expect(track.model.__id).toBe(2);
    expect(track.view.__id).toBe(3);
  });
});
