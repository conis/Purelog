var _fs = require('fs')
  , _purelog = null
  , _pluginStorage = null
  , _pluginReduce = null
  , _path = require('path')
  , _markdown = require('markdown').markdown;

exports.register = function(purelog){
  _purelog = purelog;
  var plugin = _purelog.config.plugin;
  var packageName;
  //获取storage的插件

  packageName = plugin.storage.package;
  _pluginStorage = require(packageName);

  //获取reduce的插件
  packageName = plugin.reduce.package;
  _pluginReduce = require(packageName);

  //在初始化的时候，获取所有数据
  exports.fetch();
}

//获取所有数据
exports.fetch = function(){
  //初始化
  _pluginReduce.initial();

  var plugin = _purelog.config.plugin;
  var opsStorage = plugin.storage.options;
  opsStorage.source = _path.join(_purelog.root, opsStorage.source);
  var opsReduce = plugin.reduce.options;
  _pluginStorage.fetch(opsStorage, function(article){
    var linkRouter = _purelog.config.router.article;
    article.link = linkRouter.replace(':article', article.link);
    //转换markdown文件，以后也可以支持html的方式
    if(article.content){
      article.content = _markdown.toHTML(article.content);
    }
    _pluginReduce.appendArticle(article, true);
  });

  //重建索引
  _pluginReduce.indexMaker();
}

/*
  找到文章
 */
exports.findArticle = function(options){
  return _pluginReduce.findArticle(options);
}

exports.oneArticle = function(url, tag){
  return _pluginReduce.oneArticle(url, tag);
}

/*
  获取文章的总数量
 */
exports.articleCount = function(tag){
  return _pluginReduce.articleCount(tag);
}