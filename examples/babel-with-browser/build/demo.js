(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'jquery'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, require('jquery'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, global.jquery);
    global.demo = mod.exports;
  }
})(this, function (module, $) {
  'use strict';

  let str = 'test string';

  module.export = {
    init: function () {
      console.log(str);
    }
  };
});