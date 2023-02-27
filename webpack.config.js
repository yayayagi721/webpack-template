const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // production:  改行やインデントを削除してJSファイル出力
  // development: ソースマップ有効でJSファイル出力
  // ただし `webpack --mode production` したときは production が有効になる
  mode: "development",

  // 入力元の指定
  entry: {
    index: path.join(__dirname, "/src/index.ts"),
  },

  // 出力先の指定
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
  },

  devServer: {
    port: 3000,
  },

  module: {
    rules: [
      {
        test: /\.ts$/, // 拡張子 .ts のファイルを
        use: "ts-loader", // ts-loaderでトランスパイルする
        exclude: /node_modules/, // ただし外部ライブラリは除く
      },
      {
        test: /\.(html)$/,
        use: ["html-loader"],
      },
      {
        test: /\.scss/, // 対象となるファイルの拡張子
        use: [
          // linkタグに出力する機能
          "style-loader",
          // CSSをバンドルするための機能
          {
            loader: "css-loader",
            options: {
              url: false,
              sourceMap: true,
              importLoaders: 2,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "/src/html/index.html"),
    }),
  ],

  // import './MyLib.ts' が
  // import './MyLib' の書き方でOKになる
  resolve: {
    extensions: [".ts", ".js"],
  },
};
