const importall = r => r.keys().forEach(r);

importall(require.context('../src/js/genomes', false, /\.js$/));
