const webpack = require('webpack');
const config = require('./project.config');

const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const __PROD__ = config.globals.__PROD__;

const base = [
  new ExtractTextPlugin({
    filename: '[name].[hash].css',
    allChunks: true
  })
];

const client = base.concat([
  new webpack.DefinePlugin(Object.assign({}, config.globals, { __SERVER__: false })),
  new HtmlWebpackPlugin({
    inject: true,
    cache: true,
    template: 'server/Views/Home/Index.Template.cshtml',
    filename: '../../../server/Views/Home/Index.cshtml'
  }),
  new ScriptExtHtmlWebpackPlugin({
    sync: /manifest/,
    defaultAttribute: 'defer'
  }),
  // Merge common codes into vendor file
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor'],
    chunks: ['app'],
    minChunks: module =>
      // this assumes your vendor imports exist in the node_modules directory
       module.context && module.context.indexOf('node_modules') !== -1
  }),
  new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    minChunks: Infinity
  }),
  new InlineManifestWebpackPlugin({
    name: 'webpackManifest'
  }),
  new BundleAnalyzerPlugin({
    analyzerMode: 'disabled'
  })
]);

const server = base.concat([
  new webpack.DefinePlugin(Object.assign({}, config.globals, { __SERVER__: true })),
]);

const test = base.concat([

]);

const dev = [
  new StyleLintPlugin({
    configFile: '.stylelintrc',
    context: config.paths.client(),
    files: ['**/*.css'],
    failOnError: false
  }),
  new webpack.NamedModulesPlugin()
];

const prod = [
  new UglifyJSPlugin({
    mangle: {
      except: ['$super', '$', 'exports', 'require']
    },
    compress: {
      warnings: false,
      screw_ie8: true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sequences: true,
      dead_code: true,
      evaluate: true,
      join_vars: true,
      if_return: true
    },
    output: {
      comments: false
    }
  }),
  new webpack.optimize.AggressiveMergingPlugin(),
  new CompressionPlugin({
    assets: '[path].gz[query]',
    algorithm: 'gzip',
    test: /\.js$|\.css$|\.html$/,
    threshold: 10240,
    minRatio: 0.8
  })
];

exports.test = test;
exports.server = __PROD__ ? server.concat(prod) : server;
exports.client = __PROD__ ? client.concat(prod) : client.concat(dev);
