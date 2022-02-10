const importAll = r => r.keys().forEach(r);

importAll(require.context('js/plugins', false, /\.js$/));
