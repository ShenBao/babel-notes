# Babel 核心知识

## 什么是 Babel

Babel 是 JavaScript 的编译器，通过 Babel 可以将写的最新 ES 语法的代码轻松转换成任意版本的 JavaScript 语法。随着浏览器逐步支持 ES 标准，不需要改变代码，只需要修改 Babel 配置即可以适配新的浏览器。

举例说明，下面是 ES6 箭头函数语法的代码：

```js
[1, 2, 3].map(n => n ** 2);
```

经过 Babel 处理后，可以转换为普通的 ES5 语法：

```js
[1, 2, 3].map(function(n) {
    return Math.pow(n, 2);
});
```


## 环境安装

使用 babel-cli 命令行工具

Babel 本身自己带有 CLI（Command-Line Interface，命令行界面） 工具，可以单独安装使用。下面在项目中安装 @babel/cli 和 @babel/core。

```sh
npm i -D @babel/core @babel/cli
```

然后创建一个babel.js文件：

```js
// babel.js
[1, 2, 3].map(n => n ** 2);
```

然后执行npx babel babel.js，则会看到输出的内容，此时可能会看到输出的内容跟源文件内容没有区别，这是因为没有加转换规则，下面安装@babel/preset-env。然后执行 CLI 的时候添加 --presets flag：

```sh
# 安装 preset-env
npm i -D @babel/preset-env
# 执行 CLI 添加--presets
npx babel babel.js --presets=@babel/preset-env
```

最终输出的代码就是转换为 ES5 的代码了：

```js
'use strict';

[1, 2, 3].map(function(n) {
    return Math.pow(n, 2);
});
```

如果要输出结果到固定文件，可以使用 --out-file 或 -o 参数：npx babel babel.js -o output.js。

注：Babel 7 使用了 @babel 命名空间来区分官方包，因此以前的官方包 babel-xxx 改成了 @babel/xxx。


## 配置文件

除了使用命令行配置 flag 之外，Babel 还支持配置文件，配置文件支持两种：

- 使用package.json的babel属性；
- 在项目根目录单独创建.babelrc或者.babelrc.js文件。

直接上对应的示例：

```js
// package.json
{
    "name": "my-package",
    "version": "1.0.0",
    "babel": {
        "presets": ["@babel/preset-env"]
    }
}
// .babelrc
{
    "presets": ["@babel/preset-env"]
}
```

Babel会在正在被转义的文件当前目录中查找一个 .babelrc 文件。 如果不存在，它会向外层目录遍历目录树，直到找到一个 .babelrc 文件，或一个 package.json 文件中有 "babel": {} 。

## env 选项

如果希望在不同的环境中使用不同的 Babel 配置，那么可以在配置文件中添加env选项：

```js
{
  "env": {
    "production": {
      "presets": ["@babel/preset-env"]
    }
  }
}
```

env 选项的值将从 process.env.BABEL_ENV 获取，如果没有的话，则获取 process.env.NODE_ENV 的值，它也无法获取时会设置为 "development"。

## 插件和 Preset

Babel 的语法转换是通过强大的插件系统来支持的，**Babel 的插件分为两类：转换插件和语法解析插件。**

不同的语法对应着不同的转换插件，比如要将箭头函数转换为 ES5 函数写法，那么可以单独安装@babel/plugin-transform-arrow-functions插件，转换插件主要职责是进行语法转换的，而**解析插件**则是扩展语法的，比如要解析jsx这类 React 设计的特殊语法，则需要对应的 jsx 插件。

如果不想一个个的添加插件，那么可以使用插件组合 preset（插件预设，插件组合更加好理解一些），最常见的 preset 是@babel/preset-env。

之前的preset是按照TC39提案阶段来分的，比如看到babel-preset-stage-1代表，这个插件组合里面是支持 TC39 Stage-1 阶段的转换插件集合。


    TC39 指的是技术委员会（Technical Committee）第 39 号，它是 ECMA 的一部分，ECMA 是 「ECMAScript」规范下的 JavaScript 语言标准化的机构。

    ES6 出来之后，TC39精简了提案的修订过程，新流程设计四个 Stage 阶段：

    Stage 0 - 设想（Strawman）：只是一个想法；
    Stage 1 - 建议（Proposal）：这是值得跟进的；
    Stage 2 - 草案（Draft）：初始规范，应该提供规范初稿；
    Stage 3 - 候选（Candidate）：不会有太大的改变，在对外发布之前只是修正一些问题；
    Stage 4 - 完成（Finished）：当规范的实现至少通过两个验收测试时，进入 Stage 4，会被包含在 ECMAScript 的下一个修订版中。

@babel/preset-env 是 Babel 官方推出的插件预设，它可以根据开发者的配置按需加载对应的插件，通过 @babel/preset-env 可以根据代码执行平台环境和具体浏览器的版本来产出对应的 JavaScript 代码，例如可以设置代码执行在 Node.js 8.9 或者 iOS 12 版本。


## polyfill

>   polyfill：英文原意为一种用于衣物、床具等的聚酯填充材料，例如装修时候的腻子，作用是抹平坑坑洼洼的墙面；

>   在 JavaScript 中表示一些可以抹平浏览器实现差异的代码，比如某浏览器不支持 Promise，可以引入es6-promise-polyfill等库来解决，而这往往可以交给babel来处理.

Babel 只负责进行语法转换，即将 ES6 语法转换成 ES5 语法，但是如果在 ES5 中，有些对象、方法实际在浏览器中可能是不支持的，例如：Promise、Array.prototype.includes，这时候就需要用@babel/polyfill来做模拟处理。

@babel/polyfill使用方法是先安装依赖，然后在对应的文件内显性的引入：

```sh
# 安装，注意因为代码中引入了 polyfill，所以不再是开发依赖（--save-dev，-D）
npm i @babel/polyfill
```

在文件内直接import或者require进来：

```js
// polyfill
import '@babel/polyfill';
console.log([1, 2, 3].includes(1));

// 输出内容
"use strict";

require("@babel/polyfill");

console.log([1, 2, 3].includes(1));
```

## runtime

@babel/polyfill虽然可以解决模拟浏览器不存在对象方法的事情，但是有以下两个问题：

- 直接修改内置的原型，造成全局污染；
- 无法按需引入，Webpack 打包时，会把所有的 Polyfill 都加载进来，导致产出文件过大。


>    为了解决这个问题，Babel 社区又提出了@babel/runtime的方案，@babel/runtime不再修改原型，而是采用替换的方式，比如用 Promise，使用@babel/polyfill会产生一个window.Promise对象，而@babel/runtime则会生成一个_Promise（示例而已）来替换掉代码中用到的Promise。

>   另外@babel/runtime还支持按需引入。


**下面以转换Object.assign为例，来看下@babel/runtime怎么使用:**

1. 安装依赖@babel/runtime：npm i @babel/runtime ；
2. 安装npm i -D @babel/plugin-transform-runtime作为 Babel 插件；
3. 安装需要转换Object.assign的插件：npm i -D @babel/plugin-transform-object-assign

编写一个runtime.js文件，内容如下：

```js
Object.assign({}, {a: 1});
```

执行npx babel runtime.js --plugins @babel/plugin-transform-runtime,@babel/plugin-transform-object-assign，最终的输出结果是：

```js
"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

(0, _extends2["default"])({}, {
  a: 1
});
```

代码中自动引入了@babel/runtime/helpers/extends这个模块（**所以要添加@babel/runtime依赖啊**）。

`@babel/runtime也不是完美的解决方案，由于@babel/runtime不修改原型，所以类似[].includes()这类使用直接使用原型方法的语法是不能被转换的。`

>   @babel/polyfill实际是core-js (opens new window)和regenerator-runtime (opens new window)的合集，所以如果要按需引入@babel/polyfill的某个模块，可以直接引入对应的 core-js 模块，但是手动引入的方式还是太费劲。


## @babel/preset-env

@babel/preset-env可以零配置的转化 ES6 代码，可以扩展添加配置。

在@babel/preset-env的选项中，useBuiltIns和target是最重要的两个，useBuiltIns用来设置浏览器 polyfill，target是为了目标浏览器或者对应的环境（browser/node）。

### useBuiltIns

@babel/polyfill和@babel/runtime两种方式来实现浏览器 polyfill，两种方式都比较繁琐，而且不够智能，可以使用@babel/preset-env的useBuildIn选项做 polyfill，这种方式简单而且智能。

useBuiltIns默认为 false，可以使用的值有 usage 和 entry：

```js
{
  "presets": [
    ["@babel/preset-env", {
      "useBuiltIns": "usage|entry|false"
    }]
  ]
}
```

- usage 表示明确使用到的 Polyfill 引用。在一些 ES2015+ 语法不支持的环境下，每个需要用到 Polyfill 的引用时，会**自动加上**，例如：

```js
const p = new Promise();
[1, 2].includes(1);
'foobar'.includes('foo');
```

**一般情况下，个人建议直接使用usage就满足日常开发了。**

需要提一下的是，polyfill 用到的core-js是可以指定版本的，比如使用 core-js@3，则首先安装依赖npm i -S core-js@3，然后在 Babel 配置文件.babelrc中写上版本。

```js
//.babelrc
{
    "presets": [
        [
            "@babel/preset-env",
            {
                "useBuiltIns": "usage",
                "corejs": 3
            }
        ]
    ]
}
```

使用useBuiltIns='usage'编译之后，上面代码变成，真正的做到了按需加载，而且类似[].includes()这类直接使用原型方法的语法是能被转换的：

```js
"use strict";

require("core-js/modules/es.object.to-string.js");

require("core-js/modules/es.promise.js");

require("core-js/modules/es.array.includes.js");

require("core-js/modules/es.string.includes.js");

var p = new Promise();
[1, 2].includes(1);
'foobar'.includes('foo');
```

- entry 表示替换 import "@babel/polyfill";

新版本的 Babel，会提示直接引入 core-js或者regenerator-runtime/runtime来代替@babel/polyfill的全局声明

根据targets中浏览器版本的支持，将 polyfill 拆分引入，仅引入有浏览器不支持的 polyfill。

**结论：**

所以，entry 相对usage使用起来相对麻烦一些，首先需要手动显性的引入@babel/polyfill，而且根据配置targets来确定输出，这样会导致代码实际用不到的 polyfill 也会被打包到输出文件，导致文件比较大。

### target

假设希望代码中使用 ES6 的模板字面量``语法，但是实际执行代码的宿主浏览器是 IE 10 却不支持，那么可以使用target指定目标浏览器了。

```js
{
  "presets": [
    ["@babel/preset-env", {
      "targets": {
        "browsers": "IE 10"
      }
    }]
  ]
}
```

如果代码是在 Node.js 环境执行的，则可以指定 Node.js 的版本号：

```js
{
  "presets": [
    ["env", {
      "@babel/preset-env": {
        "node": "8.9.3"
      }
    }]
  ]
}
```

1. targets.browsers 需要使用 browserslist 的配置方法，但是其设置会被 targets.[chrome, opera, edge, firefox, safari, ie, ios, android, node, electron] 覆盖；

2. targets.node 设置为 true 或 "current" 可以根据当前 Node.js 版本进行动态转换，也可以设置为具体的数字表示需要支持的最低 Node.js 版本；

```js
"node": "current"

// 等价于
// "node": process.versions.node
```

3. targets.esmodules 设置使用 ES Modules 语法，最新浏览器支持，这个在后面 Webpack 插件章节会详细介绍如何实现 Modern Mode。


## @babel/plugin-transform-runtime

作用：可以重用 Babel 注入的辅助代码以节省代码大小

Babel 使用非常小的辅助函数来实现诸如_extend，默认情况下，这将添加到需要它的每个文件中。这种重复有时是不必要的，尤其是当您的应用程序分布在多个文件中时。这就是@babel/plugin-transform-runtime插件的用武之地：所有帮助程序都将引用该模块@babel/runtime以避免在编译输出中出现重复，运行时将被编译到您的构建中。

如果直接导入core-js (opens new window)或@babel/polyfill (opens new window)以及它提供的内置函数 (opens new window)，例如Promise,Set和Map，则会污染全局范围。

配置说明：

```js
// 无选项
{
  "plugins": ["@babel/plugin-transform-runtime"]
}

// 选项及默认值
{
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "absoluteRuntime": false,
        "corejs": false,
        "helpers": true,
        "regenerator": true
      }
    ]
  ]
}
```

transform-runtime转换插件做了三两件事：

- @babel/runtime/regenerator使用generators/async函数时自动需要（可使用regenerator选项切换）；
- 必要时可以使用core-js的帮助器，而不是假设它将由用户进行polyfilled（可通过corejs选项进行切换）；
- 自动删除内联Babel帮助器，并使用模块@babel/runtime/helpers代替（可通过helpers选项切换）。

基本上，你可以使用Promise、Set、Symbol等内置插件，也可以无缝地使用所有需要polyfill的Babel功能，没有全局污染，使其非常适用于js库。

请确保将 @babel/runtime 作为依赖项。

