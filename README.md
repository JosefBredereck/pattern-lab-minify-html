# Minify and Beautify Plugin for Pattern Lab Node

The Minify HTML Plugin allows [Pattern Lab Node](https://github.com/pattern-lab/patternlab-node) users to minify and beautify the HTML template of all patterns. If the right options are passed, HTML errors like empty attributes can be prevented (id="" and class="") and the production code size can be reduced.

## Installation

To add the Tab Plugin to your project using [npm](http://npmjs.com/) type:

    npm install plugin-node-minify-html --save

Or add it directly to your project's `package.json` file and run `npm install`

During installation, the plugin is added as a key to the `plugins` object in your main Pattern Lab project's `patternlab-config.json` file

> If you don't see this object, try running `npm run postinstall` within the root of your project.

## Configuration

Post-installation, you will see the following in your `patternlab-config.json`:

Example:

```
"plugin-node-minify-html": {
    "enabled": true,
    "initialized": false,
    "options": {
        "minify": { },
        "beautify": { },
        "pluginOptions": {
            "verbose": false
        }
    }
}
```

### Minification

The generated HTML will be minified using [html-minifier](https://github.com/kangax/html-minifier). The following options can be used as an example:

```
"options": {
  "minify": {
    "removeEmptyAttributes": true,
    "preserveLineBreaks": true,
    "keepClosingSlash": true,
    "removeComments": true,
    "conservativeCollapse": true,
    "collapseWhitespace": true,
    "preserveLineBreaks": true
  },
  ...
},
```

To use custom [html-minifier options](https://github.com/kangax/html-minifier#options-quick-reference)
pass an object to `minify`

To disable minification during production mode set the `minify` option to `false`.

### Beautification

The generated HTML will be beautified using [js-beautify](https://github.com/beautify-web/js-beautify). The following options can be used as an example:

```
"options": {
    ...
    "beautify": {
        "intent_size": 4,
        "end_with_newline": true,
        "inline": true
    }
},
```

To use custom [js-beautify options](https://github.com/beautify-web/js-beautify#css--html)
pass an object to `beautify`

To disable beatification during production mode set the `beautify` option to `false`.

## Enabling / Disabling the Plugin

After install, you may manually enable or disable the plugin by finding the `plugin-node-minify-html` key within your main Pattern Lab project's `patternlab-config.json` file and setting the `enabled` flag. In the future this will be possible via CLI.
