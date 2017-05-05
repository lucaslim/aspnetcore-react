const path = require('path');

const config = {
  env: {
    node: process.env.NODE_ENV || 'development',
    core: process.env.ASPNETCORE_ENVIRONMENT || 'Development'
  },
  base: path.resolve(__dirname, '..'),
  client: 'client',
  dist: 'server/wwwroot/dist',
  public: 'dist'
};

config.paths = {
  base: base,
  client: base.bind(null, config.client),
  dist: base.bind(null, config.dist),
  public: base.bind(null, config.public)
};

config.globals = {
  'process.env': {
    'NODE_ENV': JSON.stringify(config.env.node),
    'ASPNET_ENVIRONMENT': JSON.stringify(config.env.core)
  },
  'ASPNET_ENVIRONMENT': config.env.core,
  'NODE_ENV': config.env.node,
  '__DEV__': config.env.node === 'development',
  '__PROD__': config.env.node === 'production',
  '__TEST__': config.env.node === 'test',
  '__BASE__': JSON.stringify(process.env.BASENAME || '')
};

config.compiler = {
  extensions: ['.js', '.css'],
  public_path: '/dist/',
  stats: {
    chunks: false,
    chunkModules: false,
    colors: true
  },
  devtool: config.globals.__DEV__ ? 'cheap-module-eval-source-map' : 'source-map',
  quiet: false,
  cssnano: {
    autoprefixer: false,
    discardComments: {
      removeAll: true
    },
    discardUnused: false,
    mergeIdents: false,
    reduceIdents: false,
    safe: true,
    sourcemap: true
  }
};

function base () {
  const args = [config.base].concat([].slice.call(arguments));
  return path.resolve.apply(path, args);
}

module.exports = config;
