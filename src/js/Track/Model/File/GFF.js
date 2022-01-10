import Model from 'js/Track/Model/File';

export default Model.extend({
  parseData: function (text, chr) {
    const lines = text.split('\n');

    lines.forEach(
      (line) => {
        if (!line.length || line.indexOf('#') === 0) {
          return;
        }

        const fields = line.split('\t');

        if (fields.length < 5) {
          return;
        }

        const seqId = fields[0].toLowerCase();

        if (
          seqId === String(chr)        ||
          seqId === `chr${chr}`        ||
          seqId.match(`[^1-9]${chr}$`) ||
          seqId.match(`^${chr}\\b`)
        ) {
          this.insertFeature({
            id     : fields.slice(0, 5).join('|'),
            chr    : chr,
            start  : parseInt(fields[3], 10),
            end    : parseInt(fields[4], 10),
            source : fields[1],
            type   : fields[2],
            score  : fields[5],
            strand : fields[6] === '-' ? -1 : 1,
            label  : `${fields[1]} ${fields[2]} ${fields[3]}-${fields[4]}`,
          });
        }
      }
    );
  },
});
