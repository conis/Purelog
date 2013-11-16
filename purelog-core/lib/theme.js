var _purelog = null
  , _plugin = null
  , _strformat = require('strformat')
  , _path = require('path')
  , _fs = require('fs')
  , _cleanCSS = require('clean-css')
  , _ = require('underscore')
  , _cache = {};
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
  //检查是否有缓存存在
  var cacheKey = _strformat('{0}/{1}', _plugin.guid, file);
  var cache = _cache[cacheKey];
  if(cache) return cache;

  //没有缓存，查找文件
  var path = _purelog.util.apply(_plugin.static, arguments);
  //检查文件是否存在
  if(!_fs.existsSync(path)) return false;

  var ext = _path.extname(path).toLowerCase();

  //判断是否允许缓存
  var cacheExts = _purelog.config.cache.static || [];
  var allowCache = _.indexOf(cacheExts, ext) >= 0;

  //用less处理
  switch(ext){
    case '.less':
      break;
    case '.css':
      return readCSS(cacheKey, path, allowCache);
  };
}

function readCSS(cacheKey, path, allowCache){
  var content = readStatic(path);

  //优化CSS
  if(_purelog.config.optimize.min_css){
    content = minCSS(content);
  };

  //是否允许缓存
  if(allowCache){
    _cache[cacheKey] = content;
  }

  return content;
}

//最小化CSS
function minCSS(css){
  return new _cleanCSS().minify(css);
}
//读取静态文件
function readStatic(file){
  var content = _fs.readFileSync(file, 'utf-8');
  return content;
}