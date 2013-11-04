var _purelog = null
  , _plugin = null;
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

exports.static = function(){
  return _purelog.util.apply(_plugin.static, arguments);
}

