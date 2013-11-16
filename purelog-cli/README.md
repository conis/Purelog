#Purelog-cli

用于部署Purelog，以及构建插件的命令行工具

#安装

`npm install -g purelog-cli`

注意，必需使用-g安装到全局

#使用

#安装Purelog

1. 创建Purelog要安装的目录并cd到该目录，如`/var/www/domain.com`
2. 执行`purelog --init'
3. 执行`npm install`安装相应的模块
4. 执行`node app.js`启动Purelog
5. 打开浏览器，访问：http://localhost:13111
