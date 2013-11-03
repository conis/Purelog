var _path = require('path')
  , _fs = require('fs')
  , _strformat = require('strformat')
  , _purelog = null
  , _guessType = require('guess-content-type');

function blogInfo(){
  return {
    theme: getTheme().package.name,
    host: _purelog.config.host,
    title: _purelog.config.title,
    description: _purelog.config.description
  };
}

//读取静态文件
function readStatic(file){
  var content = _fs.readFileSync(file, 'utf-8');
  return content;
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

function getTheme(){
  //根据配置，查找使用的主题
  var package = _purelog.config.plugin.theme.package;
  var theme = require(package);
  if(!theme.supportPurelog){
    throw new Error(_strformat('{0} is invalid theme.', themeId));
  }
  return theme;
}

function render(type, data){
  var theme = getTheme();
  return theme.render(type, data);
}

/*
 获取文章
 */
function fetchArticle(req, res, next){
  var pageIndex = req.params.page || 1;
  pageIndex = parseInt(pageIndex);

  var nav = pagination(_purelog.storage.articleCount(), pageIndex);
  var data = {
    nav: nav,
    blog: blogInfo(),
    articles: _purelog.storage.findArticle({
      start: nav.start,
      end: nav.end
    })
  };

  var content = render('index', data);
  res.end(content);
}

function getOneArticle(req, res, next){
  var article = _purelog.storage.oneArticle(req.path);
  if(!article){
    return next();
  }

  //如果找到缓存，则直接从缓存中读取
  var data = {
    blog: blogInfo(),
    article: article
  };

  var content = render('article', data);
  //没有找到缓存，实时渲染
  res.end(content);
}

exports.notfound = function(req, res, next){
  res.statusCode = 404;
  res.end('Not found');
}

//处理静态文件
function fetchStatic(req, res, next){
  var file = req.params[0];
  var path = getTheme().static(file);

  var ext = _path.extname(path);
  //检查文件是否存在
  if(!_fs.existsSync(path)) return next();

  res.setHeader('Content-Type', _guessType(path));
  //用less处理
  switch(ext){
    case '.less':
      break;
    default:
      var content = readStatic(path);
      return res.end(content);
  }

  next();
}

//重建索引
function reload(req, res, next){
  _purelog.storage.make();
  res.end('Done');
}

//初始化路由
exports.initial = function(app){
  var router = _purelog.config.router;
  app.get(router.index, fetchArticle);
  app.get(router.article, getOneArticle);
  app.get('/themes/:theme/*', fetchStatic);
  app.get(router.make, reload);
  app.all('*', exports.notfound);
};

exports.register = function(purelog){
  _purelog = purelog;
}
