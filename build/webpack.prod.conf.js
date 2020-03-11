const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const CompressionPlugin = require("compression-webpack-plugin");

const baseconfig = require("./webpack.base.conf.js");

const ENV_CONF = require("./env-config");

let devConfig = {
  mode: "production",
  devtool: false,
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: ENV_CONF.envName === "SIT" ? "../" : "/",
    filename: "./test-page/js/[name].bundle.[chunkhash:8].js"
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new CompressionPlugin({
      filename: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8
    }),
    new webpack.SourceMapDevToolPlugin({
      test: [/\.js$/],
      exclude: "vendor",
      filename: "test-page/maps/[name].bundle.[chunkhash:8].js.map",
      publicPath: "/",
      fileContext: "js"
    })
  ],
  optimization: {
    minimizer: [
      // uglifyjs works fine
      // new UglifyJsPlugin({
      //   uglifyOptions: {
      //     compress: {
      //       warnings: false,
      //       drop_debugger: true,
      //       drop_console: true
      //     }
      //   },
      //   cache: true,
      //   parallel: true,
      //   sourceMap: true // Must be set to true if using source-maps in production
      // })

      new TerserPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // Must be set to true if using source-maps in production
      })
    ]
  }
};

module.exports = merge(baseconfig, devConfig);
