/*
  扫描指定文件夹下的所有博客文章，要求文章必需包含meta
 */
var _fs = require('fs-extra')
  , _path = require('path')
  , _purelog = null
  , _options = null
  , _localStorage = null
  , _strformat = require('strformat')
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
  @param {Function} iterator - 每读一篇文章即回调此函数，iterator(article);
  @param {Function} done - 完成
 */

exports.fetch = function(iterator, done){
  var isPull = false;
  var localPath = _path.join(_purelog.root, _options.content);
  //检查git文件夹是否存在，如果存在，则检查是否包含有.git
  if(_fs.existsSync(localPath)){
    var gitPath = _path.join(localPath, '.git');
    isPull = _fs.existsSync(localPath);

    //相同文件夹已经存在，不处理。要不要删除？
    if(!isPull){
      console.log('文件夹%s已经存在，且不是合法的git仓库', localPath);
      return done();
    }
  }

  console.log('准备获取git数据，远程仓库：%s，本地存放至：%s', _options.url,  localPath);

  var cp = require('child_process');
  var command;
  if(isPull){
    console.log('本地存在git仓库，执行pull');
    command = _strformat('cd {0} && git pull', _options.content);
  }else{
    console.log('clone远程仓库至本地');
    command = _strformat('git clone {0} {1}', _options.url, _options.content);
  }

  //执行命令
  cp.exec(command, function(err, stdout, stderr){
    if(err){
      console.log(stderr);
      return done();
    }

    //输出
    console.log(stdout);

    if(err){
      console.log('获取git出现错误：%s', err);
    }else{
      console.log('分析markdown文件');
      //扫描所有的md，重建索引
      _localStorage.fetch(iterator, done);
    }
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