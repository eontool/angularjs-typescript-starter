"use strict";
module.exports = function (config) {

  config.set({

    frameworks: [ `jasmine`, `karma-typescript` ],

    files: [
      `public/js/vendor.js`,
      `public/js/templates.js`,
      {
        pattern: `./app/source/**/*.ts`,
      },
      {
        pattern: `./app/test/unit/**/*.ts`
      }
    ],

    preprocessors: {
      './app/source/**/*.ts': [ `karma-typescript` ],
      './app/test/unit/**/*.ts': [ `karma-typescript` ]
    },

    reporters: [ `verbose`, `progress`, `karma-typescript`, `clear-screen` ],

    karmaTypescriptConfig: {
      tsconfig: `tsconfig.json`
    },

    coverageReporter: {
      instrumenterOptions: {
        istanbul: {
          noCompact: true
        }
      }
    },

    colors: true,

    autoWatch: false,

    singleRun: true,

    logLevel: config.LOG_INFO,

    customLaunchers: {
      CustomChrome: {
        base: `Chrome`,
        flags: [
          `--headless`,
          `--disable-gpu`,
          `--remote-debugging-port=9222`,
        ],
      }
    },

    browsers: [ `Chrome` ]
  });

};
