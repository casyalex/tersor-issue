const path = require("path");
const glob = require("globby");
const HtmlWebPackPlugin = require("html-webpack-plugin");

const getEntry = (exports.getEntry = () => {
  // 异步方式获取所有的路径
  const paths = glob.sync("./pages/*/index.js", {
    cwd: path.join(__dirname, "../../src/")
  });

  const rs = {};
  paths.forEach(v => {
    const name = path.dirname(v).substring(8);
    let p = path.join("./src", v);
    if (!p.startsWith(".")) {
      p = "./" + p;
    }

    rs[name] = p;
  });
  return rs;
});

exports.getHtmlWebpackPlugins = () => {
  const entries = getEntry();
  return Object.keys(entries).reduce((plugins, filename) => {
    plugins.push(
      new HtmlWebPackPlugin({
        template: entries[filename].replace(".js", ".html"),
        filename: `test-page/${filename}.html`,
        chunks: ["commons", "vendor", filename]
      })
    );
    return plugins;
  }, []);
};
