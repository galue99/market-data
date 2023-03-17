require("dotenv").config();
const { merge } = require("webpack-merge");
const singleSpaDefaults = require("webpack-config-single-spa");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = (webpackConfigEnv, argv) => {
  const orgName = "arquant";
  const defaultConfig = singleSpaDefaults({
    orgName,
    projectName: "root-config",
    webpackConfigEnv,
    argv,
    disableHtmlGeneration: true,
  });
  return merge(defaultConfig, {
    // modify the webpack config however you'd like to by adding to this object
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: "src/index.ejs",
        isUrl: process.env.URL,
        templateParameters: {
          isLocal: webpackConfigEnv && webpackConfigEnv.isLocal,
          isProd: webpackConfigEnv && webpackConfigEnv.isProd,
          orgName,
        },
      }),
    ],
  });
};
