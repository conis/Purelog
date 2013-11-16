/*
一个主题应该要提供几种内容：page, index, article, category
*/

var _package = require("./package.json")
  , _handlebars = require('handlebars')
  , _fs = require('fs')
  , _path = require('path')
  , _moment = require('moment')
  , _purelog = null
  , _options = null
  , _cache = {};

//增加datetime的方法
_handlebars.registerHelper("datetime", function(date, format, options){
  var moment = _moment(date);
  return moment.format(format);
});

_handlebars.registerHelper("timeAgo", function(date, options){
  var moment = _moment(date);
  return moment.fromNow();
});

//==============注册partial=========
//head
_handlebars.registerPartial("head", readFile('head'));
//footer
_handlebars.registerPartial("footer", readFile('footer'));
//header
_handlebars.registerPartial("header", readFile('header'));

//必需存在supportPurelog，以便校验合法性
exports.supportPurelog = true;
//插件类型为主题
exports.pluginType = 'theme';
//返回包信息
exports.package = {
  //版本
  version: _package.version,
  //唯一名称
  guid: _package.name,
  //标题，这里是可阅读的名称
  title: 'hyde',
  //作者
  author: 'mdo',
  //主题的主页
  url: 'https://github.com/mdo/hyde',
  //摘要
  description: _package.description
};

exports.register = function(purelog, options){
  _purelog = purelog;
  _options = options;
}

/*
  @summary 渲染内容
  @param {String} type - 渲染的类型，(index, article, page, category)之一
  @param {Object} data - 提供的数据
  @returns {String} 渲染后返回的数据
  */
exports.render = function(type, data){
  var template = getTemplate(type);
  return template(data);
}

/*
  有些时候可能需要进行路径转换
  @summary 返回主题中的静态资源路径
  @returns {String} 返回需要的静态资源全路径
 */
exports.static = function(file){
  return _path.join(__dirname, file);
}

/*
  @summary 读取模块，如果已经缓存，则从缓存读取，否则读取文件
  @param {String} type - 模板类型
  @returns {Function} 返回已经编译的模板
 */
function getTemplate(type){
  //检查缓存中是否有模板内容
  var template = _cache[type];
  if(!template){
    //没有缓存，则读取文件
    var text = readFile(type);
    template = _handlebars.compile(text, {noEscape: true});
    _cache[type] = template;
  }
  return template;
}

/*
  @summary 读取模板内的文件
  @param {String} file - 要读取的文件名
  @returns {String} 返回读取的结果
 */
function readFile(file){
  var path = _path.join(__dirname, 'template', file + '.handlebars');
  return _fs.readFileSync(path, 'utf-8');
}