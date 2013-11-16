<!--
Title: 计划用一两周的时间完成Purelog的beta版
ID: 4001
Date: 2013-11-02 10:01:00
Status: publish
Type: post
Tags: Purelog, Markdown, npm
Excerpt: 花了整一天功夫开发出Purelog的Alpha版本，自己用是够了，但是要实现一件安装和支持扩展的话，还需要再花上一点时间来完善。既然已经挖了坑，就把它填好吧。同时今天发布两个小模块md2json和purelog-theme-ghost，都能用npm安装。
-->

花了一天功夫做了Purelog，但实际上Purelog的代码还是很脆弱，并且结构也不好，既然做了，那就再花点时间做好一点吧。我计划花上一两个星期来完成Purelog的Beta版本，将代码分离出来。

Purelog将会重度依赖于插件扩展，而扩展的安装方式则是直接用npm。比如说你想要安装一个名为`purelog-theme-ghost`的主题，只需要直接`npm install purelog-theme-ghost`就可以了。

各种类型的插件需要根据标准开发，提供标准的接口，目前考虑会支持四种类型的插件，分别是Theme、Storage、Reduce、Router。

##Theme

在Purelog 0.0.1版本的时候，是以themes文件夹的方式存在。但我觉得这种方式不能体现出Node.js的优势，有npm这么好的包管理工具，为什么不用呢。Theme的统一命名规则为`purelog-theme-xxx`，目前我已经做了一个[purelog-theme-ghost](https://github.com/conis/purelog-theme-ghost)


##Storage

处理存储的功能，我觉得博客是比较适合Key/Value这种方式存储的，数据主要分为两种类型，一是文章，另一种是Key/Value，一般是配置，有点类似于Objective-c中的UserDefaults。所以Storage会提供三个接口，分别是readArticle、data、saveArticle，用于读取文章、读写key/value，存储文章。

这部分可以是以文件的方式保存，也可以支持各种数据库，默认情况下，Purelog将会使用本地文件存储的方式。如果你希望存到redis中，你只需要安装一个purelog-storage-redis的模块就可以了。

##Reduce

这部分有点难理解，实际上就是从Storage中读取数据后，需要再行整理。也可能是直接在内存中整理，也可能是存到redis中去。默认情况下，是将数据放在内存中的，如果想要放到redis中，只需要安装一个purelog-reduce-redis就可以了。

##Router

路由是一个比较有意思的插件，Purelog是不计划有后台的，默认情况是，是扫描本地文章或从github中提取文章，未来也考虑支持从dropbox中提取文章。

但有些人真的希望有后台怎么办？所以这里有一个路由的插件，比如说你安装了purelog-router-admin这个插件，它会处理http://iove.net/admin/*这个路由。所以这个地址的请求都被它接管了，这样就可以实现插件增加后台的功能。

如果你想增加一个访问统计的功能，你只需要安装一个purelog-router-analyze的插件，这个插件会过滤所有的请求，并记录这些请求，但它不会阻止这些访问。

##发布一个小项目md2json

今天把扫描并分析Markdown的代码分离出来了，完成了一个md2json的小项目，md2json只有两个接口，一个是是扫描指定文件夹下的所有markdown文件，另一个是转换markdown为JSON格式的数据。

详细的可以参考github上的readme文件，我有写详细的使用说明。

Github: [md2json](https://github.com/conis/md2json)

