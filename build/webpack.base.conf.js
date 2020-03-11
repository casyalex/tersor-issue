const path = require("path");

const webpack = require("webpack");
const { getEntry, getHtmlWebpackPlugins } = require("./script/utils");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const ENV_CONF = require("./env-config");

module.exports = {
  entry: getEntry,

  target: "web",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "../src"),
      commons: path.resolve(__dirname, "../src/commons")
    },
    extensions: [".js", ".json", ".css"]
  },
  externals: {
    jquery: "jQuery"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },

      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 3 * 1024,
            name: "images/[name].[ext]",
            outputPath: "./test-page"
          }
        }
      }
      // {
      //   test: /\.(png|jpg|gif)$/,
      //   use: [
      //     {
      //       loader: "file-loader",
      //       options: {
      //         name: "images/[name].[ext]",
      //         outputPath: "./claim-page"
      //       }
      //     }
      //   ]
      // }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          //公共模块
          name: "commons",
          chunks: "initial",
          minChunks: 2
        },
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          priority: 10,
          enforce: true
        }
      }
    }
  },
  plugins: [
    ...getHtmlWebpackPlugins(),
    // new MiniCssExtractPlugin({
    //   filename: "[name].css",
    //   chunkFilename: "[id].css"
    // }),
    new CleanWebpackPlugin({
      verbose: true,
      dry: false
    }),
    new webpack.DefinePlugin({
      WEBPACK_HOST: JSON.stringify(`${ENV_CONF.baseUrl}/test-page`),
      _WEBPACK_HOST: JSON.stringify(`${ENV_CONF.baseUrl}/test-page`),
      "process.env.WEBPACK_HOST": JSON.stringify(
        `${ENV_CONF.baseUrl}/test-page`
      )
    })
  ]
};
