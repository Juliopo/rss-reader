const webpack = require('webpack');
const commonPaths = require('./paths');

module.exports = {
  mode: 'development',
  output: {
    filename: '[name].js',
    path: commonPaths.outputPath,
    chunkFilename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              localsConvention: 'camelCase',
              modules: {
                localIdentName: '[local]___[hash:base64:5]',
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  devServer: {
    port: 4000,
    host: '0.0.0.0',
    contentBase: commonPaths.outputPath,
    compress: true,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/validate-rss': {
        target: 'http://validator.w3.org/feed/check.cgi',
        pathRewrite: { '^/validate-rss': '' },
      },
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
