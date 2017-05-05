const config = require('./project.config');
const plugins = require('./plugins');
const loaders = require('./loaders');

module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      config.paths.client('app')
    ]
  },
  output: {
    path: config.paths.dist()
  },
  module: {
    rules: [
      Object.assign({}, loaders.eslint, { enforce: 'pre' })
    ]
  },
  plugins: plugins.client
  // devtool: config.compiler.devtool
};
