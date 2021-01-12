"use strict";

const { pluginName } = require("./plugin-info");

const minifier = require("html-minifier").minify;
const beautifyHtml = require("js-beautify").html;
const path = require("path");
const fs = require("fs-extra");

async function runTask(patternlab, pattern) {
  if (!patternlab) {
    console.error(Error(pluginName + ": patternlab object not provided"));
    process.exit(1);
  }

  if (!pattern) {
    console.error(Error(pluginName + ": pattern object not provided"));
    process.exit(1);
  }

  let options = patternlab.config.plugins[pluginName].options;
  let pluginOptions = options.pluginOptions;

  if (!pluginOptions || !options) {
    console.error(Error(pluginName + ": missing Plugin options"));
    process.exit(1);
  }

  if (pluginOptions.verbose) {
    console.log(
      "Starting to optimize HTML of " + pattern.patternPartial + "..."
    );
  }

  const makePath = (type) =>
    Object.keys(patternlab.uikits).map((uikit) =>
      path.join(
        process.cwd(),
        patternlab.uikits[uikit].outputDir,
        patternlab.config.paths.public.patterns,
        pattern.getPatternLink(patternlab, type)
      )
    );

  const files = [...makePath("rendered"), ...makePath("markupOnly")];

  await Promise.all(
    files.map((file) => {
      return new Promise((resolve, reject) => {
        fs.readFile(file, "utf8", (err, source) => {
          if (err) reject(err);

          let result = options.minify
            ? minifier(source, options.minify)
            : source;

          if (options.beautify) result = beautifyHtml(result, options.beautify);

          if (pluginOptions.verbose) {
            console.log(
              `Processed ${path.basename(file)}, before: ${
                source.length
              }, after: ${result.length}, ratio: ${
                Math.round(((result.length * 100) / source.length) * 100) / 100
              }%`
            );
          }

          fs.outputFile(file, result, (err, data) => {
            if (err) reject(err);
            resolve();
          });
        });
      });
    })
  );
}

/**
 * The backend method that is called during the patternlab-pattern-write-end event.
 * Responsible for looking for a companion filetype file alongside a pattern file and outputting it if found.
 * @param patternlab - the global data store
 * @param pattern - the pattern object being iterated over
 */
module.exports = runTask;
