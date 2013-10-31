var _fs = require('fs')
    , _mde = require('markdown-extra')
    , _config = require('./config')
    , _path = require('path')
    , _mdm = require('markdown-meta')
    , _moment = require('moment')
    , _cache = null
    , _markdown = require('markdown').markdown;

/*
    缓存的结构：
    var cache = {
        //文章缓存，包含文章的所有内容，如果_config.model=='cache'，则缓存文章的内容
        articles: [],
        //页面
        pages: [],
        //分类
        categories: [],
        //key/value索引，以url为key
        indexes: {
            articles: {
                "archive/10001.html": 0
            },
        }
    }
*/
function extraMeta(data){
    var result = {};
    var rows = data.split(/\n/ig);
    rows.forEach(function(row){
        var index = row.indexOf(':');
        var key = row.substring(0, index).trim();
        var value = row.substring(index + 1, row.length).trim();
        result[key] = value;
    });
    return result;
}

//提取摘要
function extraExcerpt(data){
    var content = _mde.content(data);
    return content.substring(0, 100);
}

//刷新数据，将文章分类全部重新排序
function refresh(){
    //重建排序
    _cache.articles.sort(function(left, right){
        return left.publish_date > right.publish_date ? 0 : 1;
    });

    //重建文章索引
    _cache.indexes.articles = {};
    _cache.articles.forEach(function(article, index){
        _cache.indexes.articles[article.link] = index;
    });
}

//初始化缓存
function initCache(){
    _cache = {
        //文章缓存，包含文章的所有内容，如果_config.model=='cache'，则缓存文章的内容
        articles: [],
        //页面
        pages: [],
        //分类
        categories: [],
        //key/value索引，以url为key
        indexes: {
            articles: {},
            pages: {},
            categories: {}
        }
    }
}

//扫描本地文件夹
function scanLocal(){
    var root = _path.join(__dirname, _config.content);
    var files = _fs.readdirSync(root);
    files.forEach(function(file){
        var ext = _path.extname(file);
        if(ext != '.md' && ext != '.markdown') return;

        var article = readMarkdown(file);
        _cache.articles.push(article);
    });

    refresh();
}

//读取markdown并转换
function readMarkdown(file){
    var path = _path.join(__dirname, _config.content, file);
    var content = _fs.readFileSync(path, {encoding: 'utf-8'});
    var article = exports.article(content, _config.model == 'cache');
    return article;
}

exports.make = function(){
    //初始化缓存
    initCache();
    //扫描本地文件
    scanLocal();
}

//分析一篇md的文章
exports.article = function(text, full){
    var metadata = _mde.metadata(text);
    var meta = extraMeta(metadata);
    var cfgMap = _config.mate_map;

    //提取时间
    var publish_date = meta[cfgMap.publish_date];
    publish_date = moment(publish_date, cfgMap.date_format);
    publish_date = publish_date.isValid() ? publish_date.toDate() : new Date();

    //提取摘要
    var excerpt = meta[cfgMap.excerpt];
    excerpt = excerpt || extraExcerpt(text);

    //提取标题
    var title = meta[cfgMap.title];

    //获取链接
    var link = meta[cfgMap.link];
    var linkRouter = _config.router.article;
    link = linkRouter.replace(':article', link);

    var article = {
        title: title,
        link: link,
        //html文件，如果有生成静态的html文件
        html: null,
        //标签
        tags: meta[cfgMap.tags],
        //发布日期
        publish_date: publish_date,
        summary: excerpt
    };

    if(full){
        text = _mde.content(text);
        //提取markdown，并转换
        var content = _markdown.toHTML(text);
        article.content = content;
    }
    return article;
}

exports.cache = function(){
    return _cache;
}

//根据url获取数据
exports.articleWithUrl = function(url){
    var cache = _cache.indexes.articles;
    var index = cache[url];
    if(index === undefined) return null;

    var articles = _cache.articles;
    if(index >= articles.length) return null;
    return articles[index];
}