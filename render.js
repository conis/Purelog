var fs = require('fs')
    , path = require('path')
    , _moment = require('moment')
    , config = require('./config.js');

handlebars.registerHelper("datetime", function(date, format, options){
    var moment = _moment(date);
    return moment.format(format);
});

handlebars.registerHelper("timeAgo", function(date, options){
    var moment = _moment(date);
    return moment.fromNow();
});

exports.realtime = function(template, data){
    var templateFile = path.join(__dirname, 'themes', config.theme, template + '.handlebars');
    var templateConfig = fs.readFileSync(templateFile, 'utf-8');
    var templateCompile = handlebars.compile(templateConfig, {noEscape: true});
    return templateCompile(data);
}

//渲染主题
exports.article = function(url){

}

exports.page = function(url){

}