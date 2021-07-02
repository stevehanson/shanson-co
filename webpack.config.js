const path = require('path');

module.exports = {
  entry: './assets/javascripts/main.js',
  output: {
    path: path.resolve(__dirname, 'tmp/build'),
    filename: 'main.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
};
