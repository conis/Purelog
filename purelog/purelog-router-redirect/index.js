var _purelog = null
  , _options = null
  , _package = require('./package.json');

//必需存在supportPurelog，以便校验合法性
exports.supportPurelog = true;
//插件类型为主题
exports.pluginType = 'router';
//返回包信息
exports.package = {
  version: _package.version,
  name: _package.name,
  description: _package.description
};

/*
  注册插件
 */
exports.register = function(purelog, options){
  _purelog = purelog;
  _options = options;
}

/*
  返回路由，这个路由将会交给app处理
 */
exports.routes = function(){
  var list = [];
  _options.routes.forEach(function(item){
    list.push({
      method: 'get',
      path: item.path,
      trigger: 'redirect'
    });
  });

  return list;
}

/*

 */
exports.redirect = function(req, res, next){
  for(var i = 0; i < _options.routes.length; i ++){
    var item = _options.routes[i];
    if(item.path.test(req.path)){
      var url = req.path.replace(item.path, item.to);
      res.redirect(301, url);
      res.end();
      return;
    }
  }

  //next();
}

/*
  清掉缓存
 */
exports.flush = function(){

}