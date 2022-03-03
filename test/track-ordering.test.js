const { $, Genoverse, afterTest } = require('./utils');

// TODO: unsortable, particularly with unsortable order=9e99, then adding another track

describe('Track ordering', () => {
  afterAll(afterTest);

  // Want saveable to be able to run resetConfig, but don't actually want to be able to save anything
  window.sessionStorage = {
    setItem    : () => {},
    getItem    : () => {},
    removeItem : () => {},
  };

  const newGenoverse = (tracks) => {
    const g = new Genoverse({
      start          : 1,
      end            : 1,
      chromosomeSize : 1,
      isStatic       : true,
      saveable       : true,
      tracks         : tracks.map(t => Genoverse.Track.extend({ url: false, ...t })),
      _initDeferred  : $.Deferred(),
      saveConfig     : () => {},
      loadCSS        : () => {},
      loadGenome     : () => {},
      loadPlugins    : () => {},
    });

    setTimeout(g._initDeferred.resolve, 1);

    return g;
  };

  const doTest = (...args) => {
    const [ g, expected ] = args;

    let [ , , addTracks, after ] = args;

    const msg       = args.length > 2 && typeof args[args.length - 1] === 'string' ? args[args.length - 1] : '';
    const deferred  = $.Deferred();
    const genoverse = g instanceof Genoverse ? g : newGenoverse(g);

    if (addTracks === msg) addTracks = undefined;
    if (after     === msg) after = undefined;

    genoverse._initDeferred.done(() => {
      if (Array.isArray(addTracks)) {
        genoverse.addTracks(addTracks.map(t => Genoverse.Track.extend({ url: false, ...t })), after);
      } else if (addTracks) {
        genoverse.addTrack(Genoverse.Track.extend({ url: false, ...addTracks }), after);
      }

      setTimeout(() => {
        const orderedIds = genoverse.tracks.map(t => t.id).join(' ');

        if (addTracks) {
          addTracks = [].concat(addTracks);
          genoverse.removeTracks(addTracks.map(t => genoverse.tracksById[t.id]));
        }

        expect(orderedIds).toBe(expected); // Test must be after removing tracks, since if the test fails, nothing else executes

        deferred.resolve();
      }, 1);
    });

    return deferred;
  };

  const resetConfig = (g, reorder, expected) => {
    let order = 0;

    const newId     = reorder.length + 1;
    const deferred  = $.Deferred();
    const genoverse = newGenoverse(g);

    genoverse._initDeferred.done(() => {
      reorder.forEach((i) => { genoverse.tracksById[i].order = order++; });

      genoverse.addTrack(Genoverse.Track.extend({ id: newId }));

      setTimeout($.Deferred().done(() => {
        doTest(genoverse, reorder.concat(newId).join(' ')).done(() => {
          genoverse.resetConfig();

          setTimeout($.Deferred().done(() => {
            doTest(genoverse, expected).done(() => { deferred.resolve(); });
          }).resolve, 1);
        });
      }).resolve, 1);
    });

    return deferred;
  };

  const moveTrack = (genoverse, id, afterId) => {
    const track = genoverse.tracksById[id];

    if (afterId) {
      track.prop('label').insertAfter(genoverse.tracksById[afterId].prop('label'));
    } else {
      track.prop('label').prependTo(genoverse.labelContainer);
    }

    genoverse.updateTrackOrder({}, { item: track.prop('label') });
  };

  const legendTrack = (id, legendConf) => ({
    id     : id,
    legend : legendConf ? Genoverse.Track.Legend.extend(legendConf) : Genoverse.Track.Legend,
  });

  describe('Simple tracks', () => {
    describe('Without explicit order', () => {
      const tracks = [{ id: 1 }, { id: 2 }, { id: 3 }];

      it('initial track order', () => doTest(tracks, '1 2 3'));

      describe('After adding a track', () => {
        it('without an after argument', () => doTest(tracks, '1 2 3 4', { id: 4 }));
        it('with an after argument',    () => doTest(tracks, '1 2 4 3', { id: 4 }, 2));
      });

      describe('After adding multiple tracks', () => {
        it('without an after argument', () => doTest(tracks, '1 2 3 4 5 6', [{ id: 4 }, { id: 5 }, { id: 6 }]));
        it('with an after argument',    () => doTest(tracks, '1 4 5 6 2 3', [{ id: 4 }, { id: 5 }, { id: 6 }], 1));
      });

      describe('After reset config', () => {
        it('initial track order restored', () => resetConfig(tracks, [ 2, 3, 1 ], '1 2 3'));
      });
    });

    describe('With explicit order', () => {
      const tracks = [
        { id: 1              },
        { id: 2, order: 3    },
        { id: 3, order: 2    },
        { id: 4, order: 9e99 },
        { id: 5              },
        { id: 6, order: -1   },
      ];

      it('initial track order', () => doTest(tracks, '6 1 3 2 5 4'));

      describe('After adding a track', () => {
        it('without an after argument',                   () => doTest(tracks, '6 1 3 2 5 4 7', { id: 7           }));
        it('without an after argument, with track.order', () => doTest(tracks, '6 1 3 2 7 5 4', { id: 7, order: 3 })); // order after initialization is used as a 0-based index, with the track being inserted after existing track [order + 1]
        it('with an after argument',                      () => doTest(tracks, '6 1 3 7 2 5 4', { id: 7           }, 3));
        it('with an after argument and track.order',      () => doTest(tracks, '6 1 3 2 5 7 4', { id: 7, order: 4 }, 2, 'Track order should take precedence over after argument'));
      });

      describe('After adding multiple tracks', () => {
        it('without an after argument',                   () => doTest(tracks, '6 1 3 2 5 4 7 8', [{ id: 7           }, { id: 8           }]));
        it('without an after argument, with track.order', () => doTest(tracks, '6 1 3 8 2 5 7 4', [{ id: 7, order: 4 }, { id: 8, order: 2 }]));
        it('with an after argument',                      () => doTest(tracks, '6 1 3 2 7 8 5 4', [{ id: 7           }, { id: 8           }], 4));
        it('with an after argument and track.order',      () => doTest(tracks, '6 1 7 3 2 5 8 4', [{ id: 7, order: 1 }, { id: 8, order: 4 }], 2, 'Track order should take precedence over after argument'));
      });

      describe('After reset config', () => {
        it('initial track order restored', () => resetConfig(tracks, [ 4, 2, 5, 1, 3, 6 ], '6 1 3 2 5 4'));
      });
    });
  });

  describe('Tracks with legends', () => {
    describe('Legend locked to track', () => {
      describe('Legend unsortable', () => {
        const tracks = [{ id: 1 }, legendTrack(2), { id: 3 }];

        it('initial track order', () => doTest(tracks, '1 2 2Legend 3'));

        describe('After adding a track', () => {
          it('before the track with the legend', () => doTest(tracks, '1 4 2 2Legend 3',         { id: 4 },      1));
          it('between the track and its legend', () => doTest(tracks, '1 2 2Legend 4 3',         { id: 4 },      2, 'The legend is locked to its track, so adding between 2 and 2Legend is impossible'));
          it('after the legend',                 () => doTest(tracks, '1 2 2Legend 4 3',         { id: 4 },      3));
          it('with a legend',                    () => doTest(tracks, '1 2 2Legend 4 4Legend 3', legendTrack(4), 3));
        });

        describe('After adding multiple tracks', () => {
          it('before the track with the legend', () => doTest(tracks, '1 4 5 2 2Legend 3',                 [{ id: 4 }, { id: 5 }],             1));
          it('between the track and its legend', () => doTest(tracks, '1 2 2Legend 4 5 3',                 [{ id: 4 }, { id: 5 }],             2, 'The legend is locked to its track, so adding between 2 and 2Legend is impossible'));
          it('after the legend',                 () => doTest(tracks, '1 2 2Legend 4 5 3',                 [{ id: 4 }, { id: 5 }],             3));
          it('with legends',                     () => doTest(tracks, '1 2 2Legend 4 4Legend 5 5Legend 3', [ legendTrack(4), legendTrack(5) ], 3)); // FIXME track 5 gets added before track 4
        });

        describe('After sorting tracks', () => {
          it('moving the track with the legend', () => {
            const genoverse = newGenoverse.call(this, tracks);
            const deferred  = $.Deferred();

            genoverse._initDeferred.done(() => {
              moveTrack(genoverse, 3, 2);

              doTest(genoverse, '1 2 2Legend 3', 'The legend is locked to its track, so moving a track between 2 and 2Legend is impossible').done(() => {
                moveTrack(genoverse, 2);

                doTest(genoverse, '2 2Legend 1 3', 'The legend should still be after its track').done(() => {
                  doTest(genoverse, '2 2Legend 4 1 3', { id: 4 }, 1, 'Adding a new track between 2 and 2Legend should still be impossible').done(deferred.resolve);
                });
              });
            });

            return deferred;
          });

          it('moving the legend', () => {
            const genoverse = newGenoverse.call(this, tracks);
            const deferred  = $.Deferred();

            genoverse._initDeferred.done(() => {
              moveTrack(genoverse, 3, 2);

              doTest(genoverse, '1 2 2Legend 3', 'The legend is locked to its track, so moving a track between 2 and 2Legend is impossible').done(() => {
                moveTrack(genoverse, '2Legend', 3);

                doTest(genoverse, '1 2 2Legend 3', 'Trying to move an unsortable track should have no effect').done(() => {
                  doTest(genoverse, '1 2 2Legend 4 3', { id: 4 }, 2, 'Adding a new track between 2 and 2Legend should still be impossible').done(deferred.resolve);
                });
              });
            });

            return deferred;
          });
        });

        describe('After reset config', () => {
          it('initial track order restored', () => resetConfig(tracks, [ 3, 1, 2, '2Legend' ], '1 2 2Legend 3'));
        });

        describe('Legend with order', () => {
          it('initial track order', () => doTest([{ id: 1 }, legendTrack(2, { order: 9e99 }), { id: 3 }], '1 2 2Legend 3', 'Legend order property should be ignored'));
        });
      });

      describe('Legend sortable', () => {
        const tracks = [{ id: 1 }, legendTrack(2, { unsortable: false }), { id: 3 }];

        it('initial track order', () => doTest(tracks, '1 2 2Legend 3'));

        describe('After adding a track', () => {
          it('before the track with the legend', () => doTest(tracks, '1 4 2 2Legend 3', { id: 4 }, 1));
          it('between the track and its legend', () => doTest(tracks, '1 2 2Legend 4 3', { id: 4 }, 2, 'The legend is locked to its track, so adding between 2 and 2Legend is impossible'));
          it('after the legend',                 () => doTest(tracks, '1 2 2Legend 4 3', { id: 4 }, 3));
        });

        describe('After adding multiple tracks', () => {
          it('before the track with the legend', () => doTest(tracks, '1 4 5 2 2Legend 3', [{ id: 4 }, { id: 5 }], 1));
          it('between the track and its legend', () => doTest(tracks, '1 2 2Legend 4 5 3', [{ id: 4 }, { id: 5 }], 2, 'The legend is locked to its track, so adding between 2 and 2Legend is impossible'));
          it('after the legend',                 () => doTest(tracks, '1 2 2Legend 4 5 3', [{ id: 4 }, { id: 5 }], 3));
        });

        describe('After sorting tracks', () => {
          it('moving the track with the legend', () => {
            const genoverse = newGenoverse.call(this, tracks);
            const deferred  = $.Deferred();

            genoverse._initDeferred.done(() => {
              moveTrack(genoverse, 3, 2);

              doTest(genoverse, '1 2 2Legend 3', 'The legend is locked to its track, so moving a track between 2 and 2Legend is impossible').done(() => {
                moveTrack(genoverse, 2);

                doTest(genoverse, '2 1 2Legend 3', 'Once the track has been moved, its legend is no longer locked to it, and should be unaffected').done(() => {
                  doTest(genoverse, '2 1 4 2Legend 3', { id: 4 }, 2, 'Adding a new track between 2 and 2Legend should now be possible').done(deferred.resolve);
                });
              });
            });

            return deferred;
          });

          it('moving the legend', () => {
            const genoverse = newGenoverse.call(this, tracks);
            const deferred  = $.Deferred();

            genoverse._initDeferred.done(() => {
              moveTrack(genoverse, 3, 2);

              doTest(genoverse, '1 2 2Legend 3', 'The legend is locked to its track, so moving a track between 2 and 2Legend is impossible').done(() => {
                moveTrack(genoverse, '2Legend', 3);

                doTest(genoverse, '1 2 3 2Legend', 'The legend should be movable').done(() => {
                  moveTrack(genoverse, 2);

                  doTest(genoverse, '2 1 3 2Legend', 'Once the legend has been moved, it is no longer locked to its track, and should be unaffected by moving its track').done(() => {
                    doTest(genoverse, '2 1 4 3 2Legend', { id: 4 }, 2, 'Adding a new track between 2 and 2Legend should now be possible').done(deferred.resolve);
                  });
                });
              });
            });

            return deferred;
          });
        });

        describe('After reset config', () => {
          it('initial track order restored', () => resetConfig(tracks, [ 3, 1, 2, '2Legend' ], '1 2 2Legend 3'));
        });

        describe('Legend with order', () => {
          it('initial track order', () => doTest([{ id: 1 }, legendTrack(2, { unsortable: false, order: 9e99 }), { id: 3 }], '1 2 2Legend 3', 'Legend order property should be ignored'));
        });
      });
    });

    describe('Legend not locked to track', () => {
      describe('Legend unsortable', () => {
        const tracks = [{ id: 1 }, legendTrack(2, { lockToTrack: false }), { id: 3 }];

        it('initial track order', () => doTest(tracks, '1 2 3 2Legend'));

        describe('After adding a track', () => {
          it('before the track with the legend', () => doTest(tracks, '1 4 2 3 2Legend', { id: 4 }, 1));
          it('between the track and its legend', () => doTest(tracks, '1 2 4 3 2Legend', { id: 4 }, 2));
          it('after the legend',                 () => doTest(tracks, '1 2 3 2Legend 4', { id: 4 }, 4));

          it('with an ordered legend', () => doTest(tracks, '4Legend 1 2 3 4 2Legend', legendTrack(4, { lockToTrack: false, order: -1 }), 3));
        });

        describe('After adding multiple tracks', () => {
          it('before the track with the legend', () => doTest(tracks, '1 4 5 2 3 2Legend', [{ id: 4 }, { id: 5 }], 1));
          it('between the track and its legend', () => doTest(tracks, '1 2 4 5 3 2Legend', [{ id: 4 }, { id: 5 }], 2));
          it('after the legend',                 () => doTest(tracks, '1 2 3 2Legend 4 5', [{ id: 4 }, { id: 5 }], 4));

          it('with ordered legends', () => doTest(tracks, '4Legend 1 2 4 5 3 2Legend 5Legend', [
            legendTrack(4, { lockToTrack: false, order: -1 }),
            legendTrack(5, { lockToTrack: false, order: 9e99 }),
          ], 2, 'New tracks should be added between 2Legend and 3, new legends at the start and end'));
        });

        describe('After sorting tracks', () => {
          it('moving the track with the legend', () => {
            const genoverse = newGenoverse.call(this, tracks);
            const deferred  = $.Deferred();

            genoverse._initDeferred.done(() => {
              moveTrack(genoverse, 1, 2);

              doTest(genoverse, '2 1 3 2Legend', 'The legend is not locked to its track, so moving a track between 2 and 2Legend is possible').done(() => {
                moveTrack(genoverse, 2, 1);

                doTest(genoverse, '1 2 3 2Legend', 'The legend should be unaffected by moving its track').done(() => {
                  doTest(genoverse, '1 2 4 3 2Legend', { id: 4 }, 2, 'Adding a new track between 2 and 2Legend should be possible').done(deferred.resolve);
                });
              });
            });

            return deferred;
          });

          it('moving the legend', () => {
            const genoverse = newGenoverse.call(this, tracks);
            const deferred  = $.Deferred();

            genoverse._initDeferred.done(() => {
              moveTrack(genoverse, 1, 2);

              doTest(genoverse, '2 1 3 2Legend', 'The legend is not locked to its track, so moving a track between 2 and 2Legend is possible').done(() => {
                moveTrack(genoverse, '2Legend', 1);

                doTest(genoverse, '2 1 3 2Legend', 'Trying to move an unsortable track should have no effect').done(() => {
                  doTest(genoverse, '2 4 1 3 2Legend', { id: 4 }, 1, 'Adding a new track between 2 and 2Legend should be possible').done(deferred.resolve);
                });
              });
            });

            return deferred;
          });
        });

        describe('After reset config', () => {
          it('initial track order restored', () => resetConfig(tracks, [ 3, '2Legend', 1, 2 ], '1 2 3 2Legend'));
        });

        describe('Legend with order', () => {
          it('initial track order', () => doTest([{ id: 1 }, legendTrack(2, { lockToTrack: false, order: -1 }), { id: 3 }], '2Legend 1 2 3', 'Legend should be at the start'));
        });
      });

      describe('Legend sortable', () => {
        const tracks = [{ id: 1 }, legendTrack(2, { lockToTrack: false, unsortable: false }), { id: 3 }];

        it('initial track order', () => doTest(tracks, '1 2 3 2Legend'));

        describe('After adding a track', () => {
          it('before the track with the legend', () => doTest(tracks, '1 4 2 3 2Legend', { id: 4 }, 1));
          it('between the track and its legend', () => doTest(tracks, '1 2 4 3 2Legend', { id: 4 }, 2));
          it('after the legend',                 () => doTest(tracks, '1 2 3 2Legend 4', { id: 4 }, 4));
        });

        describe('After adding multiple tracks', () => {
          it('before the track with the legend', () => doTest(tracks, '1 4 5 2 3 2Legend', [{ id: 4 }, { id: 5 }], 1));
          it('between the track and its legend', () => doTest(tracks, '1 2 4 5 3 2Legend', [{ id: 4 }, { id: 5 }], 2));
          it('after the legend',                 () => doTest(tracks, '1 2 3 2Legend 4 5', [{ id: 4 }, { id: 5 }], 4));
        });

        describe('After sorting tracks', () => {
          it('moving the track with the legend', () => {
            const genoverse = newGenoverse.call(this, tracks);
            const deferred  = $.Deferred();

            genoverse._initDeferred.done(() => {
              moveTrack(genoverse, 1, 2);

              doTest(genoverse, '2 1 3 2Legend', 'The legend is not locked to its track, so moving a track between 2 and 2Legend is possible').done(() => {
                moveTrack(genoverse, 2, 1);

                doTest(genoverse, '1 2 3 2Legend', 'The legend should be unaffected by moving its track').done(() => {
                  doTest(genoverse, '1 2 4 3 2Legend', { id: 4 }, 2, 'Adding a new track between 2 and 2Legend should be possible').done(deferred.resolve);
                });
              });
            });

            return deferred;
          });

          it('moving the legend', () => {
            const genoverse = newGenoverse.call(this, tracks);
            const deferred  = $.Deferred();

            genoverse._initDeferred.done(() => {
              moveTrack(genoverse, 1, 2);

              doTest(genoverse, '2 1 3 2Legend', 'The legend is not locked to its track, so moving a track between 2 and 2Legend is possible').done(() => {
                moveTrack(genoverse, '2Legend', 1);

                doTest(genoverse, '2 1 2Legend 3', 'Legend should be between 1 and 3').done(() => {
                  doTest(genoverse, '2 4 1 2Legend 3', { id: 4 }, 1, 'Adding a new track between 2 and 2Legend should be possible').done(deferred.resolve);
                });
              });
            });

            return deferred;
          });
        });

        describe('After reset config', () => {
          it('initial track order restored', () => resetConfig(tracks, [ 3, '2Legend', 1, 2 ], '1 2 3 2Legend'));
        });

        describe('Legend with order', () => {
          it('initial track order', () => doTest([{ id: 1 }, legendTrack(2, { lockToTrack: false, unsortable: false, order: -1 }), { id: 3 }], '2Legend 1 2 3', 'Legend should be at the start'));
        });
      });
    });
  });

  describe('Stranded tracks', () => {
    describe('Without explicit order', () => {
      const tracks = [{ id: 1 }, { id: 2, stranded: true }, { id: 3 }];

      it('initial track order', () => doTest(tracks, '1 2 2Reverse 3'));

      describe('After adding a track', () => {
        it('without an after argument', () => doTest(tracks, '1 2 2Reverse 3 4 4Reverse', { id: 4, stranded: true }));
        it('with an after argument',    () => doTest(tracks, '1 2 4 4Reverse 2Reverse 3', { id: 4, stranded: true }, 2));
      });

      describe('After adding multiple tracks', () => {
        it('without an after argument', () => doTest(tracks, '1 2 2Reverse 3 4 4Reverse 5 5Reverse', [{ id: 4, stranded: true }, { id: 5, stranded: true }]));
        it('with an after argument',    () => doTest(tracks, '1 2 4 4Reverse 5 5Reverse 2Reverse 3', [{ id: 4, stranded: true }, { id: 5, stranded: true }], 2));
      });

      describe('After reset config', () => {
        it('initial track order restored', () => resetConfig(tracks, [ 2, 3, 1, '2Reverse' ], '1 2 2Reverse 3'));
      });
    });

    describe('With explicit order', () => {
      const tracks = [{ id: 1 }, { id: 2, stranded: true, order: -1 }, { id: 3 }];

      it('initial track order', () => doTest(tracks, '2 2Reverse 1 3'));

      describe('After adding a track', () => {
        it('without an after argument', () => doTest(tracks, '2 2Reverse 1 4 4Reverse 3', { id: 4, stranded: true, order: 2 }));
        it('with an after argument',    () => doTest(tracks, '2 2Reverse 1 4 4Reverse 3', { id: 4, stranded: true, order: 2 }, 1, 'Track order should take precedence over after argument'));
      });

      describe('After adding multiple tracks', () => {
        const add = [{ id: 4, stranded: true, order: 2 }, { id: 5, stranded: true, order: -1 }];

        it('without an after argument', () => doTest(tracks, '5 5Reverse 2 2Reverse 1 4 4Reverse 3', add));
        it('with an after argument',    () => doTest(tracks, '5 5Reverse 2 2Reverse 1 4 4Reverse 3', add, 1, 'Track order should take precedence over after argument'));
      });

      describe('After reset config', () => {
        it('initial track order restored', () => resetConfig(tracks, [ 3, 2, 1, '2Reverse' ], '2 2Reverse 1 3'));
      });
    });

    describe('With explicit order and orderReverse', () => {
      const tracks = [{ id: 1 }, { id: 2, stranded: true, order: -1, orderReverse: 9e99 }, { id: 3 }];

      it('initial track order', () => doTest(tracks, '2 1 3 2Reverse'));

      describe('After adding a track', () => {
        it('without an after argument', () => doTest(tracks, '2 1 4Reverse 3 4 2Reverse', { id: 4, stranded: true, order: 2, orderReverse: 1 }));
        it('with an after argument',    () => doTest(tracks, '2 1 4Reverse 3 4 2Reverse', { id: 4, stranded: true, order: 2, orderReverse: 1 }, 1, 'Track order should take precedence over after argument'));
      });

      describe('After adding multiple tracks', () => {
        const add = [{ id: 4, stranded: true, order: 2, orderReverse: 9e99 }, { id: 5, stranded: true, order: -1, orderReverse: 1 }];

        it('without an after argument', () => doTest(tracks, '5 2 5Reverse 1 3 4 2Reverse 4Reverse', add));
        it('with an after argument',    () => doTest(tracks, '5 2 5Reverse 1 3 4 2Reverse 4Reverse', add, 1, 'Track order should take precedence over after argument'));
      });

      describe('After reset config', () => {
        it('initial track order restored', () => resetConfig(tracks, [ 3, 2, 1, '2Reverse' ], '2 1 3 2Reverse'));
      });
    });
  });
});
