<!--
Title: 开发指南
ID: plugin-develop
Date: 2013-11-06 14:35:00
Status: publish
Type: page
Tags: 配置, 指南, 插件, 开发者
Excerpt: 介绍如何开发Purelog的插件，主要介绍Storage插件、Router插件和Reduce插件的开发指南，不包含主题插件
-->

给Purelog开发插件是一件非常容易的事情，Purelog重度依赖插件，很多工作都需要插件来完成，如果你正在学习或者使用Node.js，那么请参与进来吧。

##Purelog插件的类型

* Storage - 负责数据存取，例如扫描本地文件夹的Markdown文件或者从Dropbox中下载Markdown文件
* Reduce - 负责整理数据，从Storage中读取出来的数据是无序的，所以需要索引和排序。Storage将数据读取出来之后，就完全放弃所有数据，之后数据由Reduce接管。
* Router - 路由插件可以截获路由，然后自己做相应的处理，例如`purelog-router-rss`就会截获http://domain.com/rss/这个地址，并提供rss输出。
* Theme	- 主题类插件，负责界面的呈现，可以由任何一种模板语言开发，如handlebars、jade等等。

##程序接口

purelog接口可以提供所有的操作，purelog提供的接口如下：

* `storage` - 用于存取数据
* `router` - 实现路由功能
* `reduce` - 整理数据，读取整理后的数据
* `theme` - 模块渲染
* `util` - 常用工具
* `config` - 配置信息，即`config.js`中的配置信息
* `package` - Purelog的包信息，包括名称，版本等信息


##统一接口

所有插件都需要提供下列这些接口，即实现`exports.xxx`。

* `supportPurelog` - 支持purelog，必需为true，用于校验一个插件是否为合法的purelog插件
* `pluginType` - 插件的类型，可选为`storage`，`theme`，`router`，`reduce`之一
* `package` - 插件的信息，分为下列子项：
	* `version` - 插件版本，可以读取`package.json`的`version`
	* `guid` - 插件的guid，可以读取`package.json`的`name`
	* `title` - 插件的标题，这个是可以让用户读懂的标题
	* `author` - 插件的作者
	* `url` - 插件的主页
	* `description` - 插件的描述
	
* `register` - 用于注册插件的方法，该方法会提供两个参数，分别是`purelog`和`optons`，`purelog`提供整个Purelog可操作的方法，`options`则是读取`config.js`中相应的配置信息。

##storage插件

storage插件需要实现原始数据的读取及保存功能，实现key/value数据的保存功能。

###fetch 

用于获取所有的文章，每获取一篇文章，会调用`iterator`，获取完成后，会调用`done`

	/*
	 @summary 获取所有的文章
	 @param {Function} iterator - 每读一篇文章即回调此函数，iterator(article);
	 @param {Function} done - 完成
	 */
	exports.fetch = function(iterator, done)
	
其它的尝未实现，暂不介绍
	
##reduce插件

###initial

初始化数据，例如清空缓存

###indexMaker

重建文章的索引

###getArticleContent

	/*
	  根据url，获取文章的内容
	  @param {String} url - 要获取文章的url
	 */
	exports.getArticleContent = function(url)
	
###appendArticle
	/*
	  添加文章
	  @param {Object} article - 文章的JSON对象
	 */
	exports.appendArticle = function(article){
	
###findArticle

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
	exports.findArticle = function(options)
	
###articleCount
	/*
	  返回文章的总数量
	  @param {undefined | String} tag - 如果指定标签，则返回该标签下的文章
	  @returns {Number} 根据条件，返回文章的总数量
	 */
	exports.articleCount = function(tag)

###oneArticle
	/*
	  获取一篇文章
	  @param {String} url - 文章的url
	  @param {String} tag - 某个指定tag下的文章，用于获取上一下和下一篇
	 */
	exports.oneArticle = function(url, tag)
	
	
###findTag
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
	exports.findTag = function(options)
	
##router插件
###routes

返回要接管的路由列表，一个典型的路由如下：

	exports.routes = function(){
	  return [{
	    //方法，get/all/post/
	    method: 'get',
	    //请参考express的路由规则，如果要过滤所有，则使用*
	    path: '/rss/',
	    //执行路由的方法，必需是暴露在外面的方法
	    trigger: 'rss'
	  }];
	}

* `method` - 接管路由的方法，可以是`get`， `post`，`all`之一
* `path` - 路由，请参考express的路由一节
* `trigger` - 解发的方法，注意，这个触发的方法在router插件中，必需是公开的方法，即由exports实现的方法


##theme插件

theme将会有一篇文章专门讲，这里只说接口

##render

	/*
	  @summary 渲染内容
	  @param {String} type - 渲染的类型，(index, article, page, category)之一
	  @param {Object} data - 提供的数据
	  @returns {String} 渲染后返回的数据
	  */
	exports.render = function(type, data)

##static
	/*
	  有些时候可能需要进行路径转换
	  @summary 返回主题中的静态资源路径
	  @returns {String} 返回需要的静态资源全路径
	 */
	exports.static = function(file)
