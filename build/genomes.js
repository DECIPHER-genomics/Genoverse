const importall = r => r.keys().forEach(r);

importall(require.context('js/genomes', false, /\.js$/));
