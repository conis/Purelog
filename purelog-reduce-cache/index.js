var _cache = null
  , _ = require('underscore');

function getTagKey(tag){
  return tag;
  //需要考虑大小写去重，暂时放弃
  return tag.toLowerCase();
}

/*
  准备构建新的缓存
 */
exports.initial = function(){
  _cache = {
    //已经排序好的文章
    sortedArticles: [],
    //文章的内容，如果需要缓存内容的话
    articleContents: [],
    //原始文章，没有排序，原始的文章信息，不包含文章内容
    originArticles: [],
    //原始标签
    originTags: [],
    //key/value索引，以url为key
    indexes: {
      //文章
      articles: {},
      //标签与文章的索引{"tag": {index: 10, articles: [0, 1, 3]}}
      tags:{}
    }
  }
}

/*
  构建索引，包括排序
 */
exports.indexMaker = function(){
  //排序文章
  _cache.sortedArticles = sortArticle(_cache.originArticles);
  //将indexes中的所有标签文章进行排序
  _cache.originTags.forEach(function(tag){
    //找到索引中对应标签的所有文章
    var keyTag = getTagKey(tag);
    var articles = sortArticle(_cache.indexes.tags[keyTag].articles, function(index){
      return _cache.originArticles[index];
    });
    _cache.indexes.tags[keyTag].articles = articles;
  });
  //排序标签，可以按使用频率排序
}

/*
  根据url，获取文章的内容
  @param {String} url - 要获取文章的url
 */
exports.getArticleContent = function(url){
  //找到实际的索引
  var realIndex = _cache.indexes.articles[url];
  if(realIndex === undefined) return;
  return _cache.articleContents[realIndex];
}

/*
  添加文章
  @param {Object} article - 文章的JSON对象
 */
exports.appendArticle = function(article, cacheContent){
  //检查相同的链接是否已经存在
  var exists = _cache.indexes.articles[article.link];
  if(exists !== undefined){
    console.log('抛弃url已经存在的文章，url: %s，标题：%s', article.url, article.title);
    return;
  }

  if(article.status != 'publish'){
    console.log('文章【%s】状态不是publish', article.title);
    return;
  }

  //缓存文章的内容
  if(cacheContent){
    _cache.articleContents.push(article.content);
  }

  var articleIndex = _cache.originArticles.push(article) - 1;
  //添加索引中的文章信息，以link为key
  _cache.indexes.articles[article.link] = articleIndex;

  //抛弃内容
  delete article.content;
  appendTags(article.tags, articleIndex);
}

/*
  查找获取文章
  @param {Object} options - 选项
    var options = {
      //开始位置
      start: 1,
      //结束位置
      end: 5,
      //指定标签下的文章
      tag: null
    }
 */
exports.findArticle = function(options){
  var ops = {
    //开始的位置
    start: 0,
    //结束的索引位置
    end: 5,
    //指定tag
    tag: null
  };

  //合并参数
  ops = _.extend(ops, options);
  //获取指定位置的数据
  var data, find;
  if(ops.tag && (find = _cache.indexes.tags[getTagKey(ops.tag)])){
    data = find.articles;
  }else{
    data = _cache.sortedArticles;
  }

  //返回文章的详细数据
  return _.map(data.slice(ops.start, ops.end), function(num){
    return _cache.originArticles[num];
  });
}

/*
  返回文章的总数量
  @param {undefined | String} tag - 如果指定标签，则返回该标签下的文章
  @returns {Number} 根据条件，返回文章的总数量
 */
exports.articleCount = function(tag){
  if(tag){
    var tagIndex = _cache.indexes.tags[tag];
    return tagIndex ? tagIndex.articles.length : 0;
  }else{
    return _cache.originArticles.length;
  }
}
/*
  获取一篇文章
  @param {String} url - 文章的url
  @param {String} tag - 某个指定tag下的文章，用于获取上一下和下一篇
 */
exports.oneArticle = function(url, tag){
  //找到实际的索引
  var realIndex = _cache.indexes.articles[url];
  if(realIndex === undefined) return;

  var article = _cache.originArticles[realIndex];
  article = _.extend({}, article);
  article.content = _cache.articleContents[realIndex];

  //获取上一篇和下一篇文章
  var articleIndexes = _cache.sortedArticles;
  var tagIndex;
  if(tag && (tagIndex = _cache.indexes.tags[tag])){
    articleIndexes = tagIndex.articles;
  }

  //下一条
  article.previous = getSiblingArticle(articleIndexes, realIndex, 'previous');
  //下一条
  article.next = getSiblingArticle(articleIndexes, realIndex, 'next');

  return article;
}

/*
  查找标签
  @param {Object} options - 选项
  var options = {
    //开始位置
    start: 1,
    //结束位置
    end: 5
  }
 */
exports.findTag = function(options){
  var ops = {
    start: 0,
    end: _cache.originTags.length
  };
  ops = _.extend(ops, options);
  return _cache.originTags.slice(ops.start, ops.end);
}

/*
  添加标签
 */
function appendTags(tags, articleIndex){
  _.each(_.uniq(tags), function(tag){
    var tagKey = getTagKey(tag);
    //计数标签
    var find = _cache.indexes.tags[tagKey];
    //找到，则更新
    if(find != undefined){
      //将文章加入到标签的索引中
      find.articles.push(articleIndex);
      return;
    };

    //创建新的索引
    _cache.indexes.tags[tagKey] = {
      index: _cache.originTags.push(tag) - 1,
      articles: [articleIndex]
    };
  });
}

/*
  对文章进行排序
 */
function sortArticle(articles, findArticle){
  //提取文章发布日期和索引信息
  articles = _.map(articles, function(item, index){
    var article = _.isFunction(findArticle) ? findArticle(item) : item;
    return {
      //发布日期
      publish_date: article.publish_date,
      //原始索引
      index: index
    }
  });

  //排序后的结果
  articles = sortArticleByDate(articles);

  //返回索引排序信息
  return _.map(articles, function(article){
    return article.index;
  });
}

//根据日期重新排序文章
function sortArticleByDate(articles){
  return articles.sort(function(left, right){
    return left.publish_date > right.publish_date ? -1 : 1;
  });
}

/*
  获取相临近的文章，用于获取上一篇/下一篇
  @param {Number} realIndex - 在originArticle中的实际索引
 */
function getSiblingArticle(articles, realIndex, direction){
  var find = _.indexOf(articles, realIndex);
  if(find == -1) return false;

  var sibling = false;
  //下一条记录
  if(direction == 'next'){
    //没有下一条了
    if(find < articles.length - 1) sibling = find + 1;
  }else{
    if(find > 0) sibling = find - 1;
  };

  if(sibling === false) return false;

  //找到索引
  var article = _cache.originArticles[articles[sibling]];
  //只返回链接与标题
  return {
    link: article.link,
    title: article.title
  };
}

//启动的时候初始化
exports.initial();