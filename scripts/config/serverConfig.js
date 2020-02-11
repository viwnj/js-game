const path = require('path');

module.exports = {
  contentBase: path.resolve(__dirname, '..', '..', 'public'),
  clientLogLevel: 'none',
  compress: true,
  watchContentBase: true,
  hot: true,
  quiet: true,
};
