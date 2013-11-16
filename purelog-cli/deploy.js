var _path = require('path')
  , _fs = require('fs-extra');

//构建app
exports.initApp = function(){
  var source = _path.join(__dirname, 'boilerplate/app');
  var target = _path.resolve();
  _fs.copy(source, target);
}