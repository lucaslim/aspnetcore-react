const webpack = require('webpack');
const config = require('./project.config');

const __PROD__ = config.globals.__PROD__;

const base = [
  require('postcss-import')({
    addDependencyTo: webpack
  }),
  require('postcss-cssnext')()
];

const dev = [];
const prod = [
  require('cssnano')(config.compiler.cssnano)
];

if (__PROD__) {
  module.exports = () => base.concat(prod);
} else {
  module.exports = () => base.concat(dev);
}
