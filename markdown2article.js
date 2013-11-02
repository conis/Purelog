/*
  将markdown的文本内容，转换格式化的article
 */
var _article = require('./article')
  , _path = require('path')
  , _config = require('./config')
  , _cfgMarkdown = _config.markdown
  , _mde = require('markdown-extra');

/*
  @summary 转换markdown格式的文本为article
  @param {String} text - markdown格式的文本
  @param {String} filename - 文件名，可能用于标题与链接
 */
exports.convert = function(text, filename){
  var metaText = _mde.metadata(text);
  var meta = extraMeta(metaText);

  //状态
  var status = getSignleMeta('status', 'meta');
  //只读取发布状态的数据
  if(status != 'publish') return false;

  var article = new _article.Article();

  //获取不包含扩展名的文件名
  var withoutExt = _path.basename(filename, _path.extname(filename));

  //提取时间
  var publish_date = getSignleMeta('publish_date', meta);
  publish_date = moment(publish_date, _cfgMarkdown.date_format);
  publish_date = publish_date.isValid() ? publish_date.toDate() : new Date();
  article.publishDate = publish_date;

  //提取摘要
  var excerpt = getSignleMeta('excerpt', meta);
  article.excerpt = excerpt || extraExcerpt(text);

  //提取标题
  article.title = getSignleMeta('title', meta);
  //没有取到标题，则用文件名作为标题
  article.title = title || withoutExt;

  //获取链接
  var link = getSignleMeta('link', meta);
  link = link || withoutExt;

  //根据路由规则转换链接
  var linkRouter = _config.router.article;
  link = linkRouter.replace(':article', link);
  article.link = link;

  //标签
  var tags = getSignleMeta('tags', meta);
  if(tags){
    //如果存在标签，则分割为数组
    tags = tags.split(_cfgMarkdown.tag_spliter || ',');
    _.map(tags, function(tag){
      return tag.trim();
    });
  }
  article.tags = tags;

  //添加文章
  article.content = _mde.content(text);
  return article;
}

/*
  根据key从meta数据中提取一条
  @param {String | Regex} key 要匹配的key或正则表达式
 */
function getSignleMeta(key, meta){
  key = _cfgMarkdown[key] || key;
  if(typeof key == 'string'){
    return meta[key];
  };

  //循环所有，用正则匹配
  for(var item in meta){
    if(key.test(item)){
      return meta[item];
    }
  }
}
/*
  @summary 从meta字符中分离出具体的meta
  @param {String} meta - meta的数据
  @returns {Object} 格式化的meta
 */
function extraMeta(meta){
  var result = {};
  var rows = meta.split(/\n/ig);
  rows.forEach(function(row){
    var index = row.indexOf(':');
    var key = row.substring(0, index).trim();
    var value = row.substring(index + 1, row.length).trim();
    result[key] = value;
  });
  return result;
}

/*
  @summary 从内容中提取摘要
  @param {String} content - 文章的内容
 */
function extraExcerpt(content){
  //这里需要更智能的截取
  return content.substring(0, 100);
}