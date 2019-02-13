"use strict";

const pluginName = 'plugin-node-minify-html';

const minifier = require('html-minifier').minify;
const beautifyHtml = require('js-beautify').html;
const path = require('path');
const fs = require('fs');
const fsExtra = require('fs-extra');

function runTask(patternlab, pattern) {
    return new Promise((resolve, reject) => {
        if (!patternlab) {
            reject(Error(pluginName + ': patternlab object not provided'));
            process.exit(1);
        }

        if (!pattern) {
            reject(Error(pluginName + ': pattern object not provided'));
            process.exit(1);
        }

        let options = patternlab.config.plugins[pluginName].options;
        let pluginOptions = options.pluginOptions;

        if (!pluginOptions || !options) {
            reject(Error(pluginName + ': missing Plugin options'));
            process.exit(1);
        }

        if (pluginOptions.verbose) {
            console.log('Starting to optimize HTML of ' + pattern.patternPartial + '...');
        }

        const paths = patternlab.config.paths;
        const makePath = type => path.join(paths.public.patterns, pattern.getPatternLink(patternlab, type));

        const files = [makePath('rendered'), makePath('markupOnly')];

        files.forEach(file => {
            fs.readFile(file, 'utf8', (err, source) => {
                if (err) throw err;

                let result = options.minify ? minifier(source, options.minify) : source;

                if (options.beautify)
                    result = beautifyHtml(result, options.beautify);

                if (pluginOptions.verbose) {
                    console.log('Processed ' + path.basename(file) +
                        ', before: ' + source.length + ', after: ' + result.length +
                        ', ratio: ' + Math.round(((result.length * 100) / source.length) * 100) / 100 + '%');
                }

                fsExtra.outputFile(file, result, (err, data) => {
                    if (err) throw err;
                });
            });
        });
    });
}

/**
 * The backend method that is called during the patternlab-pattern-write-end event.
 * Responsible for looking for a companion filetype file alongside a pattern file and outputting it if found.
 * @param patternlab - the global data store
 * @param pattern - the pattern object being iterated over
 */
module.exports = function(patternlab, pattern) {
    try {
        runTask(patternlab, pattern).then(result => {
            // Nothing to do at the moment
        }).catch(error => console.log(error));
    } catch (e) {
        console.log(e);
    }
};
