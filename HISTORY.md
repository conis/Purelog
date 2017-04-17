# 版本历史

## V0.1.1
* 调整目录结构，使开发与部署更加容易，将官方插件全部放到purelog目录下
* 添加Page的功能
* 增加hyde主题
* 增加Command Line Interface模块，用于处理命令行，主要用于部署Purelog和创建求例插件、升级等工作

## V0.1.0(Beta)

全新的架构，Purelog分为四个主要部分，分别是Storage/Reduce/Router/Theme，同时也对应着这四个部分的插件。

Purelog只包含核心代码，其它功能都交给插件来做，像主题，存储，数据整理，数据获取，RSS等都由插件实现，Purelog自带有五个插件，分别实现不同的功能。

### 日志

* 全新的架构，分离主题、存储、数据整理为单独的插件
* 增加Tag功能
* 喜欢对Dropbox的支持
* 增加对css的压缩
* 实现对RSS的支持
* 增加命令行部署功能，实现`purelog --init`可以部署项目
* 增强对markdown文件的分析功能，允许更多的配置，如日期格式和tags的分隔符

## V0.0.1(Alpah)


这个版本完成的Purelog的基本功能，对应的[Git commit](https://github.com/conis/Purelog/tree/a5ca382b1df4c5d23fbbc76d2263516b9598bb3d)

功能非常简单，架构也很简单，只是为了实现功能，就是可以读取Markdown并生成一个博客。主文件共四个，再加上一个主题。

### 日志

* 实现主题功能，默认使用Ghost的主题
* 实现从Markdown中根据Meta提取文章信息的功能
* 实现文章的路由
* 实现分页
* 实现从文件夹读取Markdown
* 实现从git中读取Markdown
* 实现文章按日期排序
* 实现文章内容缓存
* 实现Meta的映射及配置