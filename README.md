如果你憎恨Wordpress的臃肿与性能，如果你想专注于写作，如果你正在或者准备使用Markdown写作，如果希望将你的文章保存到Dropbox或者Github，如果你想获取极高的响应速度，如果你是一个Node.js的开发者，那么你一定要尝试一下[Purelog](http://purelog.org)。

## Purelog的特点

* 极速，Purelog在启动的时候，会将博客的文章读取到内存，完全不需要再读取硬盘，所以响应非常快速
* 基于Markdown，Purelog基于文件式的Markdown，这就意味你只需要将Markdown文件保存到某个文件夹就可以了
* 支持Dropbox共享链接的读取，你可以将文章保存至Dropbox，不需要Dropbox的授权
* 支持Git仓库，你可以将文章提交至Git，然后Purelog会自动索引Git仓库中的文章。
* 支持多主题
* 支持插件扩展

## Purelog适合于哪些人群

* 有自己的VPS或者云主机，如Appflog，总之，你需要Node.js的环境
* 有一定的动手能力，比如说能部署Node.js，会使用简单的命令行，如`npm install -g purelog-cli`
* 正在或者准备用Markdown写作
* 希望专注写作
* Node.js的开发者，或者其它程序员

如果你有两项匹配，我建议你可以尝试一下Purelog。

# 如何使用

## 博主
Purelog的安装非常简单，首先要确保你安装了Node.js，然后在命令行按如下步骤：

1. `npm install -g purelog-cli`，注意这里一定要用`-g`的参数
2. `cd`至你要安装博客的目录，例如`/var/www/purelog`，这里最好是一个空目录。执行`purelog --init`
3. 如果执行成功，你会看到成功的提示，根据提示，再执行`npm install && node app.js`

只需要简单的三步，你的Purelog就能正常运行了，访问http://localhost:13111就可以访问你的博客了。但这时候Purelog还是默认配置，你需要修改一些简单的配置。[如何修改Purelog的配置](http://purelog.org/configure)

## 开发者

1. `git clone https://github.com/conis/Purelog.git`，将Purelogclone至本地
2. `cd Purelog/purelog`
3. `npm install`
4. `node-dev app.js`

## 汇报错误

请提交至 [https://github.com/conis/Purelog/issues](https://github.com/conis/Purelog/issues)

## 授权

基于GPL授权 


