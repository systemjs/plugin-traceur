var Builder = require('systemjs-builder');

var builder = new Builder('../');

builder.config({
  transpiler: false,
  paths: {
    'test.js': './test.js',
    traceur: require.resolve('traceur/bin/traceur.js'),
    'traceur-runtime': require.resolve('traceur/bin/traceur-runtime.js')
  },
  transpiler: 'plugin-traceur.js',
  meta: {
    'traceur': {
      format: 'global',
      exports: 'traceur'
    },
    'traceur-runtime': {
      format: 'global',
      exports: 'traceur-runtime'
    }
  }
});

builder.bundle('test.js', 'built.js', {
  sourceMaps: true
});