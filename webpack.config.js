const path = require('path');
const webpack = require('webpack');

module.exports = {

  entry: './app/index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  watchOptions: {
    aggregateTimeout: 100,
  },
  devtool: 'cheap-module-source-map',
  module: {
    loaders: [

      {
        test: /.jsx?$/,
        exclude: /\/node_modules\//,
        loader: 'babel-loader',
      },

      {
        test: /.less$/,
        loaders: ['style-loader', 'css-loader', 'less-loader'],
      },

      {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }

    ],
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
  ],

  resolve: {
    extensions: ['.js', '.jsx', '.less'],
  },

};
