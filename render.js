var handlebars = require('handlebars')
    , fs = require('fs')
    , path = require('path')
    , config = require('./config.js');

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