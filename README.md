SystemJS Traceur Plugin
===

Provides Traceur transpilation in the browser and in builds when using SystemJS 0.19.12+ and SystemJS Builder 0.15+.

Compatible with the the automatic Rollup optimizations in SystemJS Builder.

## Usage

### jspm

```
jspm install plugin-traceur
```

Then set `transpiler: 'plugin-traceur'` in the `jspm.js` config file.

Alternatively use `jspm init -p` to set up the plugin automatically.

### SystemJS

As well as this plugin, Traceur and Traceur Runtime must be manually configured.

This plugin is available at `npm install systemjs-plugin-traceur`.

Traceur can be installed via `npm install traceur` or from GitHub at https://github.com/jmcriffey/bower-traceur and https://github.com/jmcriffey/bower-traceur-runtime.

The npm version contains `traceur.js` and `traceur-runtime.js` within the `bin` folder.

The plugin can be used in SystemJS with the following configuration:

```javascript
SystemJS.config({
  map: {
    'plugin-traceur': 'path/to/systemjs-plugin-traceur/plugin-traceur.js',
    'traceur': 'path/to/traceur.js',
    'traceur-runtime': 'path/to/traceur-runtime.js'
  },
  meta: {
    'traceur': {
      format: 'global',
      exports: 'traceur',
      scriptLoad: false
    },
    'traceur-runtime': {
      format: 'global',
      exports: '$traceurRuntime'
    }
  },
  transpiler: 'plugin-traceur',
  transpilerRuntime: false
});
```

_It is important to set the `transpilerRuntime: false` option so that Traceur doesn't interfere with the deprecated internal Traceur compilation layer of SystemJS._

The metadata above is necessary otherwise Traceur will not load property in SystemJS.

The plugin can also be configured as a `loader` through metadata in SystemJS.

### Traceur Options

Traceur compilation options can be set via `traceurOptions` in SystemJS:

```javascript
SystemJS.config({
  traceurOptions: {
    asyncFunctions: true
  }
});
```

The full list of configuration options can be found at https://github.com/google/traceur-compiler/blob/master/src/Options.js#L25.

### Building and Bundling

Build support works with no further configuration through the standard jspm build and bundle commands.

To build with SystemJS builder, use the following build configuration:

```javascript
builder.bundle('app.js', 'out-bundle.js'); // create a named bundle
builder.buildStatic('app.js', 'out-static.js', { format: 'cjs' }); // create a static optimized build
```

When using `builder.buildStatic`, the ES module structure will be preserved and [Rollup optimizations](https://github.com/rollup/rollup) will included automatically
allowing for static dead code removal.

Because Traceur runtime is a global, it can't be included in the Rollup optimizations.
It can be useful to entirely separate out the `traceur-runtime` dependency from the build and have it in its own bundle, for example via:

```javascript
builder.buildStatic('app.js - traceur-runtime', 'out-static.js', { format: 'cjs' });
```

This way, the entire bundle runs through Rollup for a fully-optimized output.

LICENSE
---

MIT
