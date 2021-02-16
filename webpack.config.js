const commonPaths = require('./webpack/paths');
const path = require('path');
const SSL = !!process.env.SSL || process.env.NODE_ENV === 'production';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const BACKEND_ADDRESS = `http${SSL ? 's' : ''}://0.0.0.0:4004/`;

module.exports = {
  mode: 'development',
  entry: '/app/client/index.js',
  output: {
    publicPath: '/',
    filename: '[name].js',
    path: commonPaths.outputPath,
    chunkFilename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
            plugins: ['@babel/plugin-proposal-class-properties'],
          },
        },
      },
      {
        test: /\.(css|scss)$/,
        oneOf: [
          {
            resourceQuery: /^\?raw$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
          },
          {
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
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['*', '.js', '.jsx', '.css', '.scss'],
    alias: {
      '@app': commonPaths.appRoot,
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: commonPaths.templatePath,
    }),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async',
    }),
  ],
  devServer: {
    disableHostCheck: true,
    contentBase: path.resolve(__dirname, '../', 'build', 'public'),
    https: SSL,
    host: '0.0.0.0',
    port: 3003,
    hot: true,
    compress: true,
    overlay: true,
    proxy: {
      '/api': {
        target: `http${SSL ? 's' : ''}://0.0.0.0:4004/`,
        target: BACKEND_ADDRESS,
        secure: false,
      },
    },
    historyApiFallback: true,
  },
};
