const path = require('path')
const TerserPlugin = require("terser-webpack-plugin");

// const isDev = process.env.NODE_ENV === 'development';
// const isProd = !isDev;

// const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;

module.exports = {
    mode: 'production',
    entry: './index.js',
    output: {
      filename: './bundle.js',
      path: path.resolve(__dirname, 'dist')
    },
    optimization: {
        minimize: true,
        minimizer: [new TerserPlugin()],
      },
  };