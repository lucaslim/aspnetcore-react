const config = require('./project.config');
const postcss = require('./postcss');
const __PROD__ = config.globals.__PROD__;

const cssBase = {
  test: /\.(css)$/,
  exclude: /node_modules/,
  use: [
    {
      loader: 'universal-style-loader',
      options: {
        debug: true
      }
    },
    {
      loader: 'css-loader',
      options: {
        minimize: false,
        localIdentName: __PROD__ ? '[hash:base64:5]' : '[path][name]__[local]--[hash:base64:5]'
      }
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: postcss
      }
    }
  ]
};

exports.css = cssBase;

// Load Babel Loader for transpiling ES6 to ES5
exports.js = {
  test: /\.(js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel-loader'
};

exports.eslint = {
  test: /\.(js|jsx)$/,
  loader: 'eslint-loader',
  options: config.compiler.eslint
};

exports.image = {
  test: /\.(png|jpg|jpeg|gif|svg)$/,
  loader: 'url-loader?prefix=img/&limit=5000'
};
