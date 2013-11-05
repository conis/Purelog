var _fs = require('fs')
  , _purelog = null
  , _plugin = null
  , _path = require('path')
  , _markdown = require('markdown').markdown;

/*
  注册
 */
exports.register = function(purelog){
  _purelog = purelog;
  var plugin = _purelog.config.plugins.storage;

  _plugin = require(plugin.package);
  _plugin.register(_purelog, plugin.options);
}

//获取所有数据
exports.fetch = function(){
  //初始化reduce
  _purelog.reduce.initial();
  _plugin.fetch(function(article){
    //获取文章的路由
    var linkRouter = _purelog.config.routes.article;
    article.link = linkRouter.replace(':article', article.link);
    //转换markdown文件，以后也可以支持html的方式
    if(article.content){
      article.content = _markdown.toHTML(article.content);
    };

    _purelog.reduce.appendArticle(article, true);
  }, function(){
    //重建索引
    _purelog.reduce.indexMaker();
    console.log('索引已经重建完毕，共有文章：%s篇', _purelog.reduce.articleCount());
  });
}