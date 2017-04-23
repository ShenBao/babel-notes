# babel-with-browser

## 安装依赖
```
$ npm install
```

## 在html中引入browser.js

这是运行时解析：
```
<script src="node_modules/babel-core/browser.js"></script>
<script type="text/babel">
  // 使用ES6语法创建一个类，并且使用Babel来解析运行
  class Beauty {
    sayHI() {
      alert('Hi，ShenBao~')
    }
  }

  var beauty = new Beauty;

  beauty.sayHI();
```

调试例子写demo什么的可以这样练习，但是几乎不会在运行时写这样的代码。

## 使用babel将你的文件解析成UMD或是AMD规范的代码

我们先以解析成UMD的代码为例吧，其他规范的类似

下载插件
```
$ npm install babel-plugin-transform-es2015-modules-umd
```

配置`.bowerrc`
```
{
  "plugins": ["transform-es2015-modules-umd"]
}
```
