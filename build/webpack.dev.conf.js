const path = require("path");
const webpack = require("webpack");
const merge = require("webpack-merge");
const { URL } = require("url");

const baseconfig = require("./webpack.base.conf.js");

let corsOrigin = "*";

let prodConfig = {
  mode: "development",
  devtool: "cheap-module-eval-source-map",
  output: {
    path: path.resolve(__dirname, "../dist"),
    publicPath: "http://localhost:3000/",
    filename: "./test-page/js/[name].bundle.[hash:8].js"
  },
  devServer: {
    contentBase: path.join(__dirname, "../dist"),
    port: "3000",
    before: app => {
      app.get("/*/", (req, res, next) => {
        // do something with `req` `res` `next`
        if (req.headers.referer) {
          let url = new URL(req.headers.referer);
          corsOrigin = url.protocol + "//" + url.host;
        } else {
          corsOrigin = "*";
        }
        res.set({
          "Access-Control-Allow-Origin": corsOrigin,
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers":
            "DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization",
          "Access-Control-Allow-Credentials": true
        });
        next();
      });
    },
    disableHostCheck: true,
    compress: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin()]
};

module.exports = merge(prodConfig, baseconfig);
