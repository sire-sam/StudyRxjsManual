const path = require('path');

module.exports = {
  mode: 'development',

  entry: {
    app: './app/app.js',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js',
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'app'),
    ],
  },
  context: path.join(__dirname, '../'),
  devtool: 'sourcemap',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [['babel-preset-env', { module: false }]],
          },
        },
      },
    ],
  },
};
