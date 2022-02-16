import { Model as BarGraphModel } from '../../library/Graph/Bar';
import Model                      from '../File';

export default BarGraphModel.extend({
  dataType: 'text',

  getData: function (...args) {
    if (!this.url) {
      this.isLocal  = true;
      this.dataFile = this.track.dataFile;

      return Model.prototype.getData(...args);
    }

    return this.base(...args);
  },

  parseData: function (text, chr, s, e) {
    const lines    = text.split('\n');
    const features = [];

    let firstFeatureLine;

    while (lines.length) {
      firstFeatureLine = lines.shift();

      if (!firstFeatureLine) {
        break;
      }

      if (firstFeatureLine.indexOf('#') !== -1 || firstFeatureLine.indexOf('browser') !== -1 || firstFeatureLine.indexOf('track') !== -1) {
        continue;
      } else {
        break;
      }
    }

    if (firstFeatureLine) {
      const fields = firstFeatureLine.split(/\s+/);
      const chrom  = parseInt(fields[1].split('=')[1].replace('chr', ''), 10);

      if (fields[0] === 'fixedStep') {
        const step = parseInt(fields[3].split('=')[1], 10);
        const span = fields[4] ? parseInt(fields[4].split('=')[1], 10) : 1;

        let start = parseInt(fields[2].split('=')[1], 10);

        lines.forEach(
          (line) => {
            features.push({
              chr    : chrom,
              start  : start,
              end    : start + span,
              height : parseFloat(line),
            });

            start += step;
          }
        );
      } else if (fields[0] === 'variableStep') {
        const span = fields[2] ? parseInt(fields[2].split('=')[1], 10) : 1;

        lines.forEach(
          (line) => {
            const lineFields = line.split(/\s+/);
            const feature    = {
              chr    : chrom,
              start  : parseInt(lineFields[0], 10),
              height : parseFloat(lineFields[1]),
            };

            feature.end = feature.start + span;

            features.push(feature);
          }
        );
      }
    }

    return this.base.call(this, features, chr, s, e);
  },
});
