var _storage = require('./storage')
    , express = require('express')
    , http = require('http')
    , router = require('./router')
    , _config = require('./config')
    , cfgRouter = _config.router;

var init = function(){
    //创建索引
   _storage.make();
    //建立watch
}

init();

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || _config.port);
    app.use(express.favicon());
});


app.get(cfgRouter.index, router.index);
app.get(cfgRouter.article, router.article);
app.get(cfgRouter.index_page, router.index);
app.get(cfgRouter.page, router.page);
app.get('/themes/:theme/:file', router.static);
app.get(cfgRouter.make, router.make);
app.all('*', router.notfound);

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
