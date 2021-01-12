'use strict';

const patternMinify = require('./src/pattern-minify');
const { pluginName } = require('./src/plugin-info');

async function onPatternIterate(params) {
  const [patternlab, pattern] = params;
  await patternMinify(patternlab, pattern);
}

/**
 * Define what events you wish to listen to here
 * For a full list of events - check out https://github.com/pattern-lab/patternlab-node/wiki/Creating-Plugins#events
 * @param patternlab - global data store which has the handle to the event emitter
 */
function registerHooks(patternlab) {
  // register our handler at the appropriate time of execution
  patternlab.hooks['patternlab-pattern-write-end'].push(onPatternIterate);
}

/**
 * The entry point for the plugin. You should not have to alter this code much under many circumstances.
 * Instead, alter getPluginFrontendConfig() and registerEvents() methods
 */
function pluginInit(patternlab) {
  if (!patternlab) {
    console.error('patternlab object not provided to plugin-init');
    process.exit(1);
  }

  // setup listeners if not already active. we also enable and set the plugin as initialized
  if (!patternlab.config.plugins) {
    patternlab.config.plugins = {};
  }

  // attempt to only register hooks once
  if (
    patternlab.config.plugins[pluginName] !== undefined &&
    patternlab.config.plugins[pluginName].enabled &&
    !patternlab.config.plugins[pluginName].initialized
  ) {
    // register hooks
    registerHooks(patternlab);

    // set the plugin initialized flag to true to indicate it is installed and ready
    patternlab.config.plugins[pluginName].initialized = true;
  }
}

module.exports = pluginInit;
