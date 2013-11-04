var _purelog = null
  , _plugin = null;

/*
  注册
 */
exports.register = function(purelog){
  _purelog = purelog;
  var plugin = _purelog.config.plugins.reduce;
  //获取reduce的插件
  _plugin = require(plugin.package, plugin.options);
}

/*
  添加文章
 */
exports.appendArticle = function(){
  return _purelog.util.apply(_plugin.appendArticle, arguments);
}

/*
 找到文章
 */
exports.findArticle = function(){
  return _purelog.util.apply(_plugin.findArticle, arguments);
}

exports.oneArticle = function(){
  return _purelog.util.apply(_plugin.oneArticle, arguments);
}

/*
 获取文章的总数量
 */
exports.articleCount = function(){
  return _purelog.util.apply(_plugin.articleCount, arguments);
}

exports.initial = function(){
  return _purelog.util.apply(_plugin.initial, arguments);
}

exports.indexMaker = function(){
  return _purelog.util.apply(_plugin.indexMaker, arguments);
}

exports.getArticleContent = function(){
  return _purelog.util.apply(_plugin.getArticleContent, arguments);
}