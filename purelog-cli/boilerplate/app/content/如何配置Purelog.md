<!--
Title: 如何配置Purelog
ID: configure
Date: 2013-11-06 12:21:00
Status: publish
Type: post
Tags: 配置, 指南
Excerpt: Purelog是一个轻量快速的，完全基于Markdown的，可扩展的博客平台
-->

Purelog是一个高度可配置的博客，除了插件之外，它还支持很多配置，所以，你需要了解这些配置，才能让你的博客更好的工作。

配置文件位于你博客的安装目录下，例如你的博客放在`/var/www/purelog`下，那么安装的位置就在`/var/www/purelog/config.js`。

Purelog的配置采用JSON格式，一个标准的配置文件请参考[这里](https://gist.github.com/conis/7330792)

## blog


`blog`键用于配置博客的基本信息，包含作者、博客标题等

* title - 博客标题，默认为`Purelog`
* author - 作者姓名，默认为`Conis`
* host - 用于配置博客的域名，默认为`http://purelog.org`
* rss - 博客的rss订阅地址，默认为`http://purelog.org/rss/`
* port - 端口，默认为`13111`
* description - 博客的简单说明，一般建议一句话
* meta_keywork - meta中的keywrod
* meta_description - meta中的description
* page_size - 文章分页大小


## cache

`cache`键负责缓存的设置（功能暂未实现），这里的缓存是直接缓存html页，如果缓存，则下次请求的时候直接返回已经渲染的html，不需要再经模块渲染，如果你使用了nginx反向代理，并且代理开启了缓存，则不需要设置这里的缓存

* index - 是否缓存首页，默认为`true`
* article - 是否缓存文章页，默认为`true`


## optimize

`optimize`键负责优化相关的设置

* min_css - 是事最小化压缩css，默认为`true`
* min_js - 是否最小化压缩js，默认为`true`

## routes

`routes`负责处理路由规则，但优先级比插件中的路由要低，这就意味着，如果某个路由插件也处理了`/`这个路由，你的首页将会被这个插件接管。注意路由地址都要以`/`开始，`/make.html`是一个合法的路由，而`make.html`将会是404错误。

路由的地址可以是一个字符，也可以是一个数组，如果路由的地址是数组，也就意味着多个路由可能会返回同一个内容。

`make` - 重建索引的路由，如果这个网址被访问，会重新索引文章。如果你使用了`purelog-storage-git`这个插件，则会从新到git上pull下文章再建立索引。如果你使用了`purelog-storage-dropbox`，则会重新下载所有dropbox共享链接下的文章，并重新建立索引。默认为`/make.html`，为了安全，你可以改成其它你喜欢的地址，如`/66256d7cdf00b01edd69854649bd378b`

`index` - 首页及首页分页的路由，默认为`["/", "/page/:page/"]`，这是一个典型多路由指向同一个触发。

`article` - 文章页的路由，这里暂不支持多路由。默认为`/archive/:article.html`

## plugins

`plugins`是Purelog一个非常重要的配置项，`plugins`键下有四个子键，分别对应着Purelog四种不同类型的插件，除了`routes`可以是多选之外，其它的插件都只能使用一个。

`plugins`的子键有两个可选配置，一个是`package`配置插件的名字，另一个`options`根据不同的插件配置不同。

官方的插件配置，请参考文章最后。

### theme

`theme`负责主题插件的配置，如果你需要换主题，首先要用`npm install purelog-theme-name`，再将这里改为`purelog-theme-name`即可。

### routes

`routes`负责路由插件的配置，默认情况已经配置了`purelog-router-rss`这个插件，负责处理Purelog的rss输出。


### reduce

`reduce`负责处理数据整理的插件，默认情况下，安装了`purelog-reduce-cache`，`purelog-reduce-cache`会将数据全部放在内存中，如果你不希望文章被缓存在内存中，你可以使用其它存储在数据中的插件。


### storage

`storage`是负责存取数据的插件，默认情况，安装了·purelog-storage-local·的插件，这个插件将会在本地文件夹中读取文章。官方还提供`purelog-storage-dropbox`和`purelog-storage-git`两个插件，用于读取dropbox与git的文章，这两个插件默认是已经安装的，你可以根据自行选择替换。

## 插件配置

请访问 [官方默认插件介绍及配置](http://purelog.org/archive/plugin-configure.html)



