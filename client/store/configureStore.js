if (__PROD__) {
  module.exports = require('./store.prod.js');
} else {
  module.exports = require('./store.dev.js');
}
