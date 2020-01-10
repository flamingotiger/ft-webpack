const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const __DEV__ = process.env.NODE_ENV === 'development';
const webpackDevServer = __DEV__ ? {
  devServer: {
    contentBase: path.resolve("./build"),
    index: "index.html",
    port: 5000
  }
} : {};

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: __DEV__ ? '[name].js' : '[name].[chunkhash].js',
    path: path.resolve(__dirname + '/build')
  },
  ...webpackDevServer,
  mode: __DEV__ ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "stylelint-custom-processor-loader"]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
            options: { minimize: true }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html',
      filename: 'index.html'
    }),
    new CleanWebpackPlugin()
  ]
}