const merge = require('webpack-merge');
const baseConfig = require('./config/webpack.base');
const testConfig = require('./config/webpack.test');

module.exports = function (config) {
  config.set({
    basePath: './',
    frameworks: ['mocha'],
    files: [
      'client/test.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'client/test.js': ['webpack']
    },
    webpack: merge(baseConfig, testConfig),
    webpackMiddleware: {
      noInfo: true
    },
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    concurrency: Infinity
  });
};
