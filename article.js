
var _article = function(){
  //文章的标题
  this.title = null;
  //文章的内容
  this.content = null;
  //文章的唯一，一般由url组成
  this.id = null;
  //文章的类型
  this.type = 'post';
  //文章的标签
  this.tags = [];
  //文章的摘要
  this.excerpt = null;
  //文章的最终url，不包含host?
  this.link = null;
  //文章的发布时间
  this.publishDate = null;
}

exports.Article = _article;