<!--
Title: 发布Purelog Alpha版
ID: 4000
Date: 2013-10-31 23:21:00
Status: publish
Type: post
Tags: Purelog, 开源, 作品, purelog
Excerpt: 我想要一个简单的博客系统，能支持Markdown写作，能支持Github作为存储仓库，我不需要花哨的功能，也不需要什么后台。我只需要直接写好Markdown，然后保存或者push到Github。原本我是对Ghost抱有很大的期望的，但坦白说有点失望，所以，花了一天的时间，自己折腾一个。
-->

#为什么会有Purelog

我对Ghost抱有很大的期望，等了很久，早早地把Wordpress撤下来，就等Ghost的了。这个项目差不多筹了20万欧元，Markdown和Node.js当然是最吸引我的地方。终于等到项目Release了，结果让我很失望。项目好坏不说，起码它满足不了我的需求，白等了这么久。当然，这只是对我个人来说，相信会有很多人喜欢Ghost的。

Ghost的Markdown实时编辑功能是很赞，但这个功能并不是我要的，如果我要在线编辑的话，为什么我还要Markdown呢？而且Markdown有很多客户端，WYSIWYG的浏览器多得去了，如果我要可视化直接用HTML编辑器就好了，何必退而求其次搞一个Markdown的在线编辑器？

Ghost不支持文件型的Markdown，而是直接存入数据库，搞什么，为什么要用Markdown？

Ghost不支持分类，不支持从Dropbox导入文件，当然也不会支持伟大的Github。

Ghost不支持自定义路由，那我从原来的博客切换过来怎么办，搜索引擎过来的链接可能全部找不到了。比如说我以前是用[http://iove.net/archive/733.html](http://iove.net/archive/733.html)这样的路径怎么办？

既然如此，那不如自己动手写一个博客系统吧。

#我想要的博客系统

1. 足够快速，Wrodpress太庞大太臃肿了
2. 足够简单，我不需要评论，也不需要访客计数，更不需要太多的订制化，我只需要一个简单的，用来写作的系统
3. 支持Markdown，我需要能直接支持Markdown的文件，而不是存到数据库
4. 支持Dropbox
5. 支持Github，我希望我的Blog就是一个Github仓库，我会使用它的版本控制系统。
6. 支持主题

#Purelog的特点
##目前已经支持的

1. 没有数据库，完全基于文件系统，系统在初始化的时候会扫描所有Markdown文件然后读到缓存，所以，它会足够的快
2. 支持git，如果配置中指定了git仓库，系统在初始化的时候会更新git，然后再扫描.md文件
3. 支持多主题，目前仅支持handlebars
4. 支持自定义路由

##未来版本计划支持的
1. 支持分类
2. 支持Page
3. 支持标签
4. 支持从Dropbox公开目录中读取Markdown文件
5. 主题支持handlebars和jade等，支持less

#使用或者Fork

##Github
[https://github.com/conis/Purelog](https://github.com/conis/Purelog)

##使用

1. 部署好node.js环境
2. clone Purelog项目至本地目录
3. cd至Purelog目录中，使用`npm install`安装
4. 使用`node index.js`启动项目，如果出现错误，请根据提示操作

##汇报错误

因为目前还在alpha版本，所以问题肯定是非常多的，如果有问题，请提交至 [https://github.com/conis/Purelog/issues](https://github.com/conis/Purelog/issues)

