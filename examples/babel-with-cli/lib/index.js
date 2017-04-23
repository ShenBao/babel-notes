'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log(_path2.default.resolve(__dirname, './src'));

var fn = function fn(a) {
  alert(a);
};