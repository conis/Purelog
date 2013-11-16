var _purelog = null
  , _rss = require('rss')
  , _cache = null
  , _options = null
  , _path = require('path')
  , _package = require('./package.json');

//必需存在supportPurelog，以便校验合法性
exports.supportPurelog = true;
//插件类型为主题
exports.pluginType = 'router';
//返回包信息
exports.package = {
  version: _package.version,
  name: _package.name,
  description: _package.description
};

/*
  注册插件
 */
exports.register = function(purelog, options){
  _purelog = purelog;
  _options = options;
}

/*
  返回路由，这个路由将会交给app处理
 */
exports.routes = function(){
  return [{
    //方法，get/all/post/
    method: 'get',
    //请参考express的路由规则，如果要过滤所有，则使用*
    path: '/rss/',
    //执行路由的方法，必需是暴露在外面的方法
    trigger: 'rss'
  }];
}

/*
  读取rss
 */
exports.rss = function(req, res, next){
  var content;
  //直接返回缓存
  if(_cache){
    content = _cache;
  }else{
    content = rssGenerator();
  }

  res.setHeader('content-type', 'application/rss+xml');
  res.end(content);
}

/*
  清掉缓存
 */
exports.flush = function(){
  _cache = null;
}

/*
  rss生成器
 */
function rssGenerator(){
  var blog = _purelog.config.blog;
  var feed = new _rss({
    title: blog.title,
    description: blog.description,
    feed_url: blog.feed,
    site_url: blog.host,
    author: blog.author,
    managingEditor: blog.author,
    webMaster: blog.author,
    copyright: '&copy; ' + blog.author,
    //language: 'en',
    //categories: [],
    pubDate: new Date().toUTCString(),
    ttl: '60'
  });

  //读取指定长度的文章
  var options = {
    start: 0,
    end: _options.limit || 20
  };

  var articles = _purelog.reduce.findArticle(options);
  articles.forEach(function(article){
    var url = _path.join(blog.host, article.link);
    var item = {
      title: article.title,
      url: url,
      author: blog.author,
      categories: article.tags,
      date: article.publish_date.toUTCString()
    }

    //获取全文
    if(_options.full){
      item.description = _purelog.reduce.getArticleContent(article.link);
    }else{
      item.description = article.excerpt;
    }
    feed.item(item);
  });

  return feed.xml();
}