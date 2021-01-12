const path = require('path');
const fs = require('fs-extra');
const pluginConfig = require('./config.json');
const { pluginName } = require('./src/plugin-info');

console.log(`Installing Pattern Lab Node Plugin - "${pluginName}". `);

const patternLabCofigName = 'patternlab-config.json';
const configPath = path.resolve(`./${patternLabCofigName}`);
try {
  const plConfig = fs.readJSONSync(configPath);

  if (!plConfig.plugins) {
    plConfig.plugins = {};
  }

  if (!plConfig.plugins[pluginName]) {
    plConfig.plugins[pluginName] = pluginConfig;
    fs.outputJSONSync(configPath, plConfig, { spaces: 2 });
    console.log(
      `Added "${pluginName}" config to ${patternLabCofigName} at plugins config.`
    );
  }
} catch (e) {}

console.log(`Pattern Lab Node Plugin - "${pluginName}" installed. `);
console.log(
  'Configure or disable this plugin inside your patternlab-config.json file.'
);
