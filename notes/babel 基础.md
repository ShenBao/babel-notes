# babel

- [https://babeljs.io/](https://babeljs.io/)
- [https://www.babeljs.cn/](https://www.babeljs.cn/)

## 使用

- 环境搭建
- 基本配置
- babel-polyfill
- babel-runtime

```bash
npm install --save-dev @babel/core @babel/cli @babel/preset-env @babel/plugin-transform-runtime
npm install --save @babel/polyfill @babel/runtime
```

- babel.config.json
- .babelrc

```js
{
    "presets": [
        [
            "@babel/preset-env"
        ]
    ],
    "plugins": [
    ]
}
```

```bash
npx bable src/index.js
```

presets: 可以作为 Babel 插件的组合，甚至可以作为可以共享的 options 配置

## babel-polyfill 是什么

- 什么是 Polyfill
- core-js 和 regenerator
- babel-polyfill 即 core-js 和 regenerator 两者的集合
- Babel 7.4 之后弃用 babel-polyfill
- 推荐直接使用 core-js 和 regenerator

@babel/plugin-transform-regenerator

## babel-polyfill 如何按需引入

- 文件较大
- 只有一部分功能，无需全部引入
- 配置按需引用

```js
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage",
                "corejs": 3
            }
        ]
    ],
    "plugins": []
}
```

babel-polyfill 的问题

- 会污染全局环境
- 如果做一个独立的 web 系统，则无碍
- 如果做一个 第三方 lib，则会有问题

## babel-runtime 是什么

[babel-runtime](https://www.babeljs.cn/docs/babel-plugin-transform-runtime)

- babel-polyfill 会污染全局
- babel-runtime 不会污染全局
- 产出第三方 lib 要用 babel-runtime

```js
{
    "presets": [
        [
            "@babel/preset-env"
        ]
    ],
    "plugins": [
        [
            "@babel/plugin-transform-runtime",
            {
                "absoluteRuntime": false,
                "corejs": 3,
                "helpers": true,
                "regenerator": true,
                "useESModules": false
            }
        ]
    ]
}
```

## 其他

- "transform-decorators-legacy", // 装饰器
- "transform-class-properties" // class
