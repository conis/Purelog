var _purelog = null
  , _plugin = null
  , _path = require('path')
  , _fs = require('fs');
/*
 注册
 */
exports.register = function(purelog){
  _purelog = purelog;

  var plugin = _purelog.config.plugins.theme;
  //获取reduce的插件
  _plugin = require(plugin.package);
  _plugin.register(_purelog, plugin.options);
  exports.package = _plugin.package;
}

/*
  渲染内容
 */

exports.render = function(){
  return _purelog.util.apply(_plugin.render, arguments);
}

exports.static = function(file){
  var path = _purelog.util.apply(_plugin.static, arguments);
  //检查文件是否存在
  if(!_fs.existsSync(path)) return false;

  var ext = _path.extname(path);
  //用less处理
  switch(ext){
    case '.less':
      break;
    case '.css':
      var content = readStatic(path);
      return content;
  };
}

//读取静态文件
function readStatic(file){
  var content = _fs.readFileSync(file, 'utf-8');
  return content;
}