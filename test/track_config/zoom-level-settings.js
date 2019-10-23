'use strict';

describe('Zoom level settings', function () {
  afterEach(afterTest);

  var genoverse = new Genoverse({
    chr            : 1,
    start          : 1,
    end            : 20,
    chromosomeSize : 9e99,
    tracks         : [ Genoverse.Track.Gene.extend({ data: [], url: false, legend: false }) ]
  });

  var track = genoverse.tracks[0];

  it('Initial models and views are correct', function () {
    track.model.__id = 1;
    track.view.__id  = 1;

    expect(track.lengthMap.length).to.equal(4, 'Incorrect lengthMap length');
    expect(track.lengthMap.map(function (l) { return l[0]; })).to.eql([ 2000000, 100000, 1, -1 ], 'Incorrect lengthMap thresholds');

    expect(track.model).to.be.an.instanceOf(Genoverse.Track.Model.Transcript, 'Incorrect model class');
    expect(track.view).to.be.an.instanceOf(Genoverse.Track.View.Transcript,   'Incorrect view class');

    expect(track.model).to.eql(track.models[1], 'Model is in track.models with the correct key');
    expect(track.view).to.eql(track.views[1],   'View is in track.views with the correct key');

    expect(track.view.labels).to.equal(true, 'Labels should be shown');
  });

  it('Model and view changed after zoom out', function () {
    genoverse.moveTo(1, 1, 100001);

    track.model.__id = 2;
    track.view.__id  = 2;

    expect(genoverse.length).to.equal(100001, 'Incorrect genoverse.length');

    expect(track.model).to.be.an.instanceOf(Genoverse.Track.Model.Gene, 'Incorrect model class');
    expect(track.view).to.be.an.instanceOf(Genoverse.Track.View.Gene,   'Incorrect view class');

    expect(track.model).to.eql(track.models[100000], 'Model is in track.models with the correct key');
    expect(track.view).to.eql(track.views[100000],   'View is in track.views with the correct key');

    expect(track.view.labels).to.equal(true, 'Labels should be shown');
  });

  it('View changed after zoom out further', function () {
    genoverse.moveTo(1, 1, 2000001);

    track.view.__id = 3;

    expect(genoverse.length).to.equal(2000001, 'Incorrect genoverse.length');

    expect(track.model.__id).to.equal(2,             'Model should be reused between 100000 and 2000000');
    expect(track.model).to.eql(track.models[100000], 'Model should be reused between 100000 and 2000000');

    expect(track.view).to.not.be.an.instanceOf(Genoverse.Track.View.Gene, '2000000 inherits from 100000, but uses the base class, extended with a the prototype of Genoverse.Track.View.Gene');

    var proto1 = track.view.constructor.prototype;
    var proto2 = track.lengthMap[1][1].view.constructor.prototype;

    for (var i in proto1) {
      if (typeof proto1[i] === 'function') {
        expect(proto1[i].toString()).to.equal(proto2[i].toString(), i + ' should be the same in the prototypes of 100000 and 2000000');
      } else {
        expect(proto1[i]).to.equal(proto2[i], i + ' should be the same in the prototypes of 100000 and 2000000');
      }
    }

    expect(track.model).to.eql(track.models[2000000], 'Model is in track.models with the correct key');
    expect(track.view).to.eql(track.views[2000000],   'View is in track.views with the correct key');

    expect(track.view.labels).to.equal(false, 'Labels should not be shown');
  });

  it('View changed after zooming in', function () {
    genoverse.moveTo(1, 200000, 300000);

    expect(track.model.__id).to.equal(2, 'Model should be reused');
    expect(track.view.__id).to.equal(2,  'View should be reused');
  });

  it('Model and view changed after zooming in further', function () {
    genoverse.moveTo(1, 200000, 200001);

    expect(track.model.__id).to.equal(1, 'Model should be reused');
    expect(track.view.__id).to.equal(1,  'View should be reused');
  });

  it('Model and view changed after zooming out as far as possible', function () {
    genoverse.moveTo(1, 1, 9e99);

    expect(track.model.__id).to.equal(2, 'Model should be reused');
    expect(track.view.__id).to.equal(3,  'View should be reused');
  });
});
