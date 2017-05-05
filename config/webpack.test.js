const config = require('./project.config');
const plugins = require('./plugins');

module.exports = {
  entry: {
    app: config.paths.client('test')
  },
  output: null,
  plugins: plugins.test
  // devtool: 'inline-source-map'
};
