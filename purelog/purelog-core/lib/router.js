var _path = require('path')
  , _fs = require('fs')
  , _strformat = require('strformat')
  , _purelog = null
  , _plugins = []
  , _url = require('url')
  , _guessType = require('guess-content-type');

//初始化路由
exports.initial = function(app){
  //插件的路由优先级最高
  pluginsRegister(app);

  var router = _purelog.config.routes;
  app.get('/tag/:tag', fetchArticle);
  applyRules(router.page, app, getOneArticle);
  applyRules(router.index, app, fetchArticle);
  applyRules(router.article, app, getOneArticle);
  applyRules('/themes/:theme/*', app, fetchStatic);
  applyRules(router.make, app, reload);
  app.all('*', exports.notfound);
};

exports.register = function(purelog){
  _purelog = purelog;
}

exports.notfound = function(req, res, next){
  var data = baseData(req);
  res.statusCode = 404;
  var content = _purelog.theme.render('404', data);
  res.end(content);
}

function baseData(req){
  return {
    purelog: _purelog.package,
    blog: _purelog.config.blog,
    theme: _purelog.theme.package,
    env: {
      host: req.headers.host,
      path: req.path
    }
  };
}
//计算分页信息
function pagination(total, pageIndex){
  var pageSize = _purelog.config.page_size || 5;
  var pag = {
    pageIndex: pageIndex,
    pageCount: Math.ceil(total / pageSize),
    pageSize: pageSize,
    total: total,
    start: 1,
    end: 1,
    next: false,
    previous: false
  }

  if(pageIndex < 1) pag.pageIndex = 1;
  if(pageIndex >= pag.pageCount) pag.pageIndex = pag.pageCount;

  pag.start = pag.pageIndex * pag.pageSize - pag.pageSize;
  pag.end = pag.start + pag.pageSize;
  if(pag.end >= pag.total) pag.end = pag.total;

  //下一页
  if(pag.pageIndex < pag.pageCount){
    pag.next = pag.pageIndex + 1;
  }

  //上一页
  if(pag.pageIndex > 1){
    pag.previous = pag.pageIndex - 1;
  }

  return pag;
}

/*
 获取文章
 */
function fetchArticle(req, res, next){
  var pageIndex = req.params.page || 1;
  pageIndex = parseInt(pageIndex);

  var nav = pagination(_purelog.reduce.articleCount(),pageIndex);
  var data = baseData(req);
  data.nav = nav;
  data.pages = _purelog.reduce.pages();
  data.articles = _purelog.reduce.findArticle({
    start: nav.start,
    end: nav.end,
    tag: req.params.tag
  });

  var content = _purelog.theme.render('index', data);
  res.end(content);
}

function getOneArticle(req, res, next){
  var article = _purelog.reduce.oneArticle(req.path);
  if(!article){
    return next();
  }

  //如果找到缓存，则直接从缓存中读取
  var data = baseData(req);
  data.pages = _purelog.reduce.pages();
  data.article = article;

  var type = 'article';
  if(req.params.page){
    type = 'page';
  };

  var content = _purelog.theme.render(type, data);
  //没有找到缓存，实时渲染
  res.end(content);
}

//处理静态文件
function fetchStatic(req, res, next){
  var file = req.params[0];
  var content = _purelog.theme.static(file);
  //没有获取到内容
  if(!content) return next();

  res.setHeader('Content-Type', _guessType(file));
  res.end(content);
}

//重建索引
function reload(req, res, next){
  _purelog.storage.fetch();
  res.end('Done');
}

/*
  注册插件
 */
function pluginsRegister(app){
  var plugins = _purelog.config.plugins.routes;
  plugins.forEach(function(item){
    //根据配置，引入并注册插件
    var plugin = require(item.package);
    plugin.register(_purelog, item.options);
    _plugins.push(plugin);
    applyPluginRules(plugin, app);
  });
}

/*
  应用插件规则
 */
function applyPluginRules(plugin, app){
  var methods = {
    'post': 'post',
    'get': 'get',
    'all': 'all'
  };

  //配置规则
  var rules = plugin.routes();
  rules.forEach(function(rule){
    var method = methods[rule.method] || methods.all;
    app[method](rule.path, plugin[rule.trigger]);
  });
}

/*
 应用路由规则
 */
function applyRules(routes, app, trigger, method){
  if(typeof routes == 'string') routes = [routes];
  routes.forEach(function(route){
    applyRule(route, app, trigger, method || 'get');
  });
}

/*
  应用一条路由规则
 */
function applyRule(path, app, trigger, method){
  var methods = {
    'post': 'post',
    'get': 'get',
    'all': 'all'
  };
  var method = methods[method] || methods.all;
  app[method](path, trigger);
}