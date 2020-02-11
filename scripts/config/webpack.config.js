const path = require('path');

module.exports = {
  mode: 'development',
  entry: [
    require.resolve('react-dev-utils/webpackHotDevClient'),
    path.resolve(__dirname, '..', '..', 'src', 'index.ts'),
  ],
  output: {
    path: path.resolve(__dirname, '..', '..', 'public'),
    filename: 'bundle.js',
  },

  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
  },
};
