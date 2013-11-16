/*
  扫描指定文件夹下的所有博客文章，要求文章必需包含meta
 */
var _fs = require('fs')
  , _path = require('path')
  , _md2json = require('md2json')
  , _purelog = null
  , _options = null
  , _package = require('./package.json')
  , _ = require('underscore');

//必需存在supportPurelog，以便校验合法性
exports.supportPurelog = true;
//插件类型为主题
exports.pluginType = 'storage';
//返回包信息
exports.package = {
  version: _package.version,
  name: _package.name,
  description: _package.description
};

exports.register = function(purelog, options){
  _purelog = purelog;
  _options = options || {};
}

/*
 @summary 获取所有的文章
 @param {Function} iterator - 每读一篇文章即回调此函数，iterator(article);
 @param {Function} done - 完成
 */
exports.fetch = function(iterator, done){
  //默认搜索.markdown和.md文件
  var filter = _options.filter || /\.((md)|(markdown))$/i;
  //要的搜索的文件夹
  //这里最好检查一下是否绝对路径
  var dir = _path.join(_purelog.root, _options.content);
  //构造map;
  var maps = metaMap(['title', 'id', 'link', 'publish_date', 'excerpt', 'status', 'type', 'tags'], _options.meta);
  _md2json.scan(dir, filter, maps, function(article, filename){
    if(!article) return;
    //取文件名
    var nameWitoutExt = _path.basename(filename, _path.extname(filename));
    article.title = article.title || nameWitoutExt;
    article.link = article.link || nameWitoutExt;
    if(!article.excerpt && article.content){
      article.excerpt = article.content.substring(0, 100);
    }
    iterator(article);
  });

  done();
}

/*
  保存一篇文章
  @param {Object} article - 要保存的文章，应该是Article的实例
  @returns {Boolean} 保存是否成功
 */
exports.save = function(article){

}
/*
  @summary 基于key/value的数据存储，用于保存文章以外的数据
  @param {String} key - 要读取数据的key
  @param {* | null | undefined} value - 任意要存储的数据类型，如果没有提供或者为undefined，则返回数据；如果为null，则删除键，其它值则为设置数据
 */
exports.data = function(key, value){

}

/*
  构造meta的映射
  @param {Array} keys - 要构造meta的key列表
  @param {Object} config - 配置
 */
function metaMap(keys, config){
  var result = [];
  _.each(keys, function(key){
    var meta = config[key] || {};
    //构造一个map项目
    var map = {
      match: meta.match || RegExp(key, 'i'),
      key: key
    };

    //日期
    if(key == 'publish_date'){
      map.type = 'date';
      map.format = meta.format;
    }else if (key == 'tags'){
      map.type = 'array';
      map.separator = meta.separator;
    };

    result.push(map);
  });

  return result;
}