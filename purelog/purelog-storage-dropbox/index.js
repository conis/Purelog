/*
 扫描指定文件夹下的所有博客文章，要求文章必需包含meta
 */
var _dds = require('download-dropbox-share')
  , _localStorage = null
  , _purelog = null
  , _options = null
  , _path = require('path')
  , _package = require('./package.json');

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

  //引入并注册local插件
  _localStorage = require('purelog-storage-local');
  _localStorage.register(_purelog, _options);
}

/*
 @summary 获取所有的文章
 @param {Object} options - 配置参数
 @param {Function} callback - 回调函数，callback(article);
 @param {Function} done - 完成后的执行函数
 */

exports.fetch = function(callback, done){
  var saveTo = _path.join(_purelog.root, _options.content);
  _dds.downloadAll(_options.url, saveTo, _options, function(){
    _localStorage.fetch(callback, done);
  });
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