# Webpack 中使用 Babel

首先安装 npm 依赖，然后修改 webpack.config.js。


安装依赖包：

```bash
# 安装开发依赖
npm i webpack@5 babel-loader webpack-cli@4 @babel/core @babel/preset-env @babel/plugin-transform-runtime core-js@3 -D
# 将 runtime 作为依赖
npm i @babel/runtime -S
```

创建webpack.config.js文件，内容如下：

```js
// webpack.config.js
module.exports = {
  entry: './babel.js',
  mode: 'development',
  devtool: false,
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage',
                    "corejs": 3
                  },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
};
```

上面的webpack.config.js文件直接将 Babel 的配置写到了options中，还可以在项目根目录下创建.babelrc或者使用package.json的 babel 字段。

之后执行：

```bash
npx webpack
```

