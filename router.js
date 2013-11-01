var render = require('./render')
    , _storage = require('./storage')
    , _path = require('path')
    , _fs = require('fs')
    , _config = require('./config.js');

function blogInfo(){
    return {
        theme: _config.theme,
        host: _config.host,
        title: _config.title,
        description: _config.description
    };
}

//读取静态文件
function readStatic(file){
    var content = _fs.readFileSync(file, 'utf-8');
    return content;
}

//计算分页信息
function pagination(total, pageIndex){
    var pag = {
        pageIndex: pageIndex,
        pageCount: Math.ceil(total / _config.page_size),
        pageSize: _config.page_size,
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

//获取具体某一页的数据
function getArticles(articles, pageIndex){
    var pag = pagination(articles.length, pageIndex);
    var result = [];
    for(var i = pag.start; i < pag.end; i ++){
        result.push(articles[i]);
    }
    return result;
}

exports.index = function(req, res, next){
    var pageIndex = req.params.page || 1;
    pageIndex = parseInt(pageIndex);

    var articles = _storage.cache().articles;
    var data = {
        nav: pagination(articles.length, pageIndex),
        blog: blogInfo(),
        articles: getArticles(articles, pageIndex)
    };

    var content = render.realtime('index', data);
    res.end(content);
}

exports.page = function(req, res, next){

}

exports.article = function(req, res, next){
    var article = _storage.articleWithUrl(req.path);
    if(!article){
        return next();
    }

    //如果找到缓存，则直接从缓存中读取
    var data = {
        blog: blogInfo(),
        article: _storage.articleWithUrl(req.path)
    };

    var content = render.realtime('article', data);
    //没有找到缓存，实时渲染
    res.end(content);
}

exports.category = function(req, res, next){

}

exports.notfound = function(req, res, next){
    res.statusCode = 404;
    res.end('Not found');
}

//处理静态文件
exports.static = function(req, res, next){
    var theme = req.params.theme || _config.theme;
    var file = req.params.file;

    file = _path.join(__dirname, 'themes', theme, file);
    var ext = _path.extname(file);

    //检查文件是否存在
    if(!_path.existsSync(file)) return next();

    //用less处理
    switch(ext){
        case '.less':
            break;
        default:
            var content = readStatic(file);
            res.end(content);
            return;
            break;
    }

    next();
}

//重建索引
exports.make = function(req, res, next){
    _storage.make();
    res.end('Done');
}