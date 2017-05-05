const loaders = require('./loaders');
const config = require('./project.config');
const __PROD__ = config.globals.__PROD__;

module.exports = {
  resolve: {
    modules: [
      config.paths.client(),
      'node_modules'
    ],
    extensions: config.compiler.extensions
  },
  stats: config.compiler.stats,
  output: {
    filename: __PROD__ ? '[name].[chunkhash].js' : '[name].js',
    publicPath: config.compiler.public_path
  },
  module: {
    rules: [
      loaders.js,
      loaders.css,
      loaders.image
    ]
  },
  externals: {
    'react/lib/ReactContext': true,
    'react/lib/ExecutionEnvironment': true,
    'react/addons': true
  }
};
