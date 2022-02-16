const importAll = r => r.keys().forEach(r);

importAll(require.context('../src/js/plugins', false, /\.js$/));
