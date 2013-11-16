var _pkg = require('./package.json');

var _purelog = {
  //存储
  storage: require('./lib/storage'),
  //路由
  router: require('./lib/router'),
  //reduce
  reduce: require('./lib/reduce'),
  //主题
  theme: require('./lib/theme'),
  //工具类
  util: require('./lib/util'),
  //config由外部传入
  config: {},
  //purelog的信息
  package: {
    //版本
    version: _pkg.version,
    //名称
    name: 'Purelog',
    //网址
    url: 'http://Purelog.org',
    //作者
    author: 'Conis'
  }
};

exports = module.exports = _purelog;