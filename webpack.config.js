const merge = require('webpack-merge');
const base = require('./config/webpack.base');

module.exports = [
  merge(base, require('./config/webpack.client')),
  merge(base, require('./config/webpack.server'))
];
