var _express = require('express')
  , _http = require('http')
  , _path = require('path')
  , _config = require('./config');

var app = _express();

app.configure(function(){
  app.set('port', process.env.PORT || _config.blog.port);
  app.use(_express.favicon());
});

var _purelog = require('./index');
//获取程序运行的根目录
_purelog.root = _path.join(__dirname);
_purelog.config = _config;

_purelog.storage.register(_purelog);
_purelog.theme.register(_purelog);
_purelog.reduce.register(_purelog);
_purelog.router.register(_purelog);

//初始化路由
_purelog.router.initial(app);
//获取所有数据
_purelog.storage.fetch();

_http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
