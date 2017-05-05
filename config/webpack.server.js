const config = require('./project.config');
const plugins = require('./plugins');

module.exports = {
  entry: {
    server: [
      'babel-polyfill',
      config.paths.client('server')
    ]
  },
  output: {
    filename: '[name].js',
    path: config.paths.dist(),
    libraryTarget: 'commonjs2'
  },
  plugins: plugins.server,
  target: 'node'
};
