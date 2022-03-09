const { afterTest } = require('./utils');

describe('Changing width', () => {
  afterEach(afterTest);

  const genoverse = new Genoverse({
    chr            : 1,
    start          : 1,
    end            : 20,
    chromosomeSize : 9e99,
    width          : 100,
    tracks         : [ Genoverse.Track.extend({ 10: false, model: Genoverse.Track.Model.extend({ __test: true }) }) ],
  });

  const track = genoverse.tracks[0];

  it('Initial settings are correct', () => {
    expect(track.lengthMap.length).toBe(2);
    expect(track.lengthMap.map(l => l[0])).toEqual([ 10, -1 ]);

    expect(track.model).toEqual(track.models[10]);
    expect(track.model.__test).toBe(undefined);

    expect(genoverse.width).toBe(100);
  });

  it('Settings are correct after width change', (done) => {
    genoverse.setWidth(1000);

    setTimeout( // setWidth causes tracks to be reset after a 1ms delay, which we need to wait for here
      () => {
        try {
          expect(track.lengthMap.length).toBe(2);
          expect(track.lengthMap.map(l => l[0])).toEqual([ 10, -1 ]);

          expect(track.model).toEqual(track.models[10]);
          expect(track.model.__test).toBe(undefined);

          expect(genoverse.width).toBe(1000);

          done();
        } catch (e) {
          done(e);
        }
      },
      100
    );
  });

  it('Model changes correctly after width change + zoom out', (done) => {
    genoverse.setWidth(1000);

    setTimeout( // setWidth causes tracks to be reset after a 1ms delay, which we need to wait for here
      () => {
        genoverse.moveTo(1, 1, 5);

        try {
          expect(genoverse.width).toBe(1000);
          expect(genoverse.length).toBe(5);
          expect(track.model).toEqual(track.models[-1]);
          expect(track.model.__test).toBe(true);

          done();
        } catch (e) {
          done(e);
        }
      },
      100
    );
  });
});
