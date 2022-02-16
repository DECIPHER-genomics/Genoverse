import Base          from 'basejs';
import RTree         from 'rtree';
import wrapFunctions from '../lib/wrap-functions';

export default Base.extend({
  dataType           : 'json',
  allData            : false,
  dataBuffer         : undefined, // e.g. { start: 0, end: 0 } - basepairs to extend data region for, when getting data from the origin
  xhrFields          : undefined,
  url                : undefined,
  urlParams          : undefined, // hash of URL params
  urlParamsGenerator : function () { return {}; }, // function to return URL params (only used if urlParams property is falsy)
  data               : undefined, // if defined, will be used instead of fetching data from a source
  dataRequestLimit   : undefined, // if defined, multiple requests will be made by getData if the region size exceeds its value
  showServerErrors   : false,     // if true, error messages return from the server by getData requests will be shown on the track

  constructor: function (properties) {
    Object.assign(this, properties);
    wrapFunctions(this, 'Model');
    this.init();
  },

  init: function (reset) {
    this.setDefaults(reset);

    if (reset) {
      Object.values(this.featuresById).forEach((feature) => { delete feature.position; });
    }

    if (!reset || this.data) {
      delete this.dataRangesByChr;
      delete this.featuresByChr;
      this.featuresById = {};
      this.setChrProps();
    }

    this.dataLoading = []; // tracks incomplete requests for data
  },

  setDefaults: function (reset) {
    this.dataBuffer = this.dataBuffer || { start: 0, end: 0 };      // basepairs to extend data region for, when getting data from the origin
    this.urlParams  = this.urlParams  || this.urlParamsGenerator(); // hash of URL params
    this.xhrFields  = this.xhrFields  || {};

    this.dataBufferStart = this.dataBuffer.start; // Remember original dataBuffer.start, since dataBuffer.start is updated based on browser scale, in setLabelBuffer

    if (!this._url) {
      this._url = this.url; // Remember original url
    }

    if (reset && !this.url && this._url) {
      this.url = this._url;
    }
  },

  setChrProps: function () {
    const chr = this.browser.chr;

    this.dataRangesByChr = this.dataRangesByChr || {};
    this.featuresByChr   = this.featuresByChr   || {};

    this.dataRangesByChr[chr] = this.dataRangesByChr[chr] || new RTree();
    this.featuresByChr[chr]   = this.featuresByChr[chr]   || new RTree();
  },

  features   : function (chr) { return this.featuresByChr[chr];   },
  dataRanges : function (chr) { return this.dataRangesByChr[chr]; },

  parseURL: function (chr, start, end, url) {
    if (this.allData) {
      start = 1;
      end   = this.browser.getChromosomeSize(chr);
    }

    return (url || this.url).replace(/__ASSEMBLY__/, this.browser.assembly).replace(/__CHR__/, chr).replace(/__START__/, start).replace(/__END__/, end);
  },

  setLabelBuffer: function (buffer) {
    this.dataBuffer.start = Math.max(this.dataBufferStart, buffer);
  },

  getData: function (chr, start, end, done) {
    start = Math.max(1, start);
    end   = Math.min(this.browser.getChromosomeSize(chr), end);

    const deferred = $.Deferred();

    if (typeof this.data !== 'undefined') {
      this.receiveData(typeof this.data.sort === 'function' ? this.data.sort((a, b) => a.start - b.start) : this.data, chr, start, end);

      return deferred.resolveWith(this);
    }

    const model  = this;
    const bins   = [];
    const length = end - start + 1;

    if (!this.url) {
      return deferred.resolveWith(this);
    }

    if (this.dataRequestLimit && length > this.dataRequestLimit) {
      let i = Math.ceil(length / this.dataRequestLimit);

      while (i--) {
        bins.push([ start, i ? start += this.dataRequestLimit - 1 : end ]);
        start++;
      }
    } else {
      bins.push([ start, end ]);
    }

    $.when(
      ...bins.map(
        (bin) => {
          const request = $.ajax({
            url       : model.parseURL(chr, bin[0], bin[1]),
            data      : model.urlParams,
            dataType  : model.dataType,
            context   : model,
            xhrFields : model.xhrFields,
            success   : function (data) {
              this.receiveData(data, chr, bin[0], bin[1]);
            },
            error: function (xhr, statusText, ...args) {
              this.track.controller.showError(
                this.showServerErrors && (xhr.responseJSON || {}).message
                  ? xhr.responseJSON.message
                  : `${statusText} while getting the data, see console for more details`,
                [ xhr, statusText, ...args ]
              );
            },
            complete: function (xhr) {
              this.dataLoading = this.dataLoading.filter(loading => xhr !== loading);
            },
          });

          request.coords = [ chr, bin[0], bin[1] ]; // store actual chr, start and end on the request, in case they are needed

          if (typeof done === 'function') {
            request.done(done);
          }

          model.dataLoading.push(request);

          return request;
        }
      )
    ).done(
      () => { deferred.resolveWith(model); }
    );

    return deferred;
  },

  receiveData: function (data, chr, start, end) {
    start = Math.max(start, 1);
    end   = Math.min(end, this.browser.getChromosomeSize(chr));

    this.setDataRange(chr, start, end);
    this.parseData(data, chr, start, end);

    if (this.allData) {
      this.url = false;
    }
  },

  /**
  * parseData(data, chr, start, end) - parse raw data from the data source (e.g. online web service)
  * extract features and insert it into the internal features storage (RTree)
  *
  * >> data  - raw data from the data source (e.g. ajax response)
  * >> chr   - chromosome of the data
  * >> start - start location of the data
  * >> end   - end   location of the data
  * << nothing
  *
  * every feature extracted this routine must construct a hash with at least 3 values:
  *  {
  *    id    : [unique feature id, string],
  *    start : [chromosomal start position, integer],
  *    end   : [chromosomal end position, integer],
  *    [other optional key/value pairs]
  *  }
  *
  * and call this.insertFeature(feature)
  */
  parseData: function (data, chr, start) { // end is also passed in, but not used in this case
    // Example of parseData function when data is an array of hashes like { start: ..., end: ... }
    data.forEach(
      (feature, i) => {
        feature.chr  = feature.chr || chr;
        feature.sort = start + i;

        this.insertFeature(feature);
      }
    );
  },

  updateData: function (data) {
    this.data = data;
    this.track.reset();
  },

  setDataRange: function (chr, start, end) {
    if (this.allData) {
      start = 1;
      end   = this.browser.getChromosomeSize(chr);
    }

    this.dataRanges(chr).insert({ x: start, w: end - start + 1, y: 0, h: 1 }, [ start, end ]);
  },

  checkDataRange: function (chr, start, end) {
    start = Math.max(1, start);
    end   = Math.min(this.browser.getChromosomeSize(chr), end);

    const ranges = this.dataRanges(chr).search({ x: start, w: end - start + 1, y: 0, h: 1 }).sort((a, b) => a[0] - b[0]);

    if (!ranges.length) {
      return false;
    }

    let s = ranges.length === 1 ? ranges[0][0] : 9e99;
    let e = ranges.length === 1 ? ranges[0][1] : -9e99;

    for (let i = 0; i < ranges.length - 1; i++) {
      const [ s0, s1 ] = ranges[i];
      const [ e0, e1 ] = ranges[i + 1];

      if (s0 <= s1 && ((e0 >= e1) || (e0 + 1 >= s1))) {
        s = Math.min(s, s0);
        e = Math.max(e, e0, e1);
      } else {
        return false;
      }
    }

    return start >= s && end <= e;
  },

  insertFeature: function (feature) {
    if (!feature.chr) {
      return;
    }

    // Make sure we have a unique ID, this method is not efficient, so better supply your own id
    if (!feature.id) {
      feature.id = feature.ID || this.hashCode(JSON.stringify({ ...feature, sort: '' })); // sort is dependant on the browser's region, so will change on zoom
    }

    const features = this.features(feature.chr);

    if (features && !this.featuresById[feature.id]) {
      if (feature.subFeatures) {
        feature.subFeatures.sort(
          (a, b) => a.start - b.start
        ).forEach(
          (subFeature) => {
            subFeature.start = Math.min(Math.max(subFeature.start, feature.start), feature.end);
            subFeature.end   = Math.max(Math.min(subFeature.end,   feature.end),   feature.start);
          }
        );

        // Add "fake" sub-features at the start and end of the feature - this will allow joins to be drawn when there are no sub-features in the current region.
        feature.subFeatures.unshift({ start: feature.start, end: feature.start, fake: true });
        feature.subFeatures.push({ start: feature.end, end: feature.end, fake: true });
      }

      features.insert({ x: feature.start, y: 0, w: feature.end - feature.start + 1, h: 1 }, feature);

      this.featuresById[feature.id] = feature;
    }
  },

  findFeatures: function (chr, start, end) {
    let features = this.features(chr).search({
      x : start - this.dataBuffer.start,
      y : 0,
      w : end - start + this.dataBuffer.start + this.dataBuffer.end + 1,
      h : 1,
    });

    (this.prop('featureFilters') || []).forEach(
      (filter) => {
        features = features.filter(feature => filter.call(this, feature));
      }
    );

    return this.sortFeatures(features);
  },

  sortFeatures: function (features) {
    return features.sort((a, b) => a.sort - b.sort);
  },

  abort: function () {
    this.dataLoading.forEach(loading => loading.abort());

    this.dataLoading = [];
  },

  hashCode: function (string) {
    let hash = 0;

    if (string.length) {
      for (let i = 0; i < string.length; i++) {
        const c = string.charCodeAt(i);

        hash  = ((hash << 5) - hash) + c;
        hash &= hash; // Convert to 32bit integer
      }
    }

    return String(hash);
  },
});
