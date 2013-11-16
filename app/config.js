module.exports = {
  //博客的基本信息
  "blog":{
    //作者信息
    "author": "Conis",
    //博客的名称
    "title": "Purelog",
    //主机地址
    "host": "http://purelog.org",
    //rss的订阅地址
    "rss": "http://purelog.org/rss/",
    //使用的端口号
    "port": 13111,
    //博客描述
    "description": "A simple blog based on markdown",
    //meta中的关键字
    "meta_keywork": "purelog, blog, node.js",
    //meta中的说明
    "meta_description": "A simple blog based on markdown",
    //文章每页大小
    "page_size": 5
  },
  //是否缓存页面为html，即缓存为静态内容，不用每次都渲染
  "cache": {
    //缓存索引页，如果为false，则不缓存，为数字则缓存多少页
    "index": 999,
    //缓存文章页
    "article": true
  },
  //优化性能
  "optimize":{
    //压缩css
    "min_css": true,
    //压缩js
    "min_js": true
  },
  //路由
  "routes": {
    //page的路由
    "page": "/:page",
    //重建索引的网址，建议可以使用base64或者md5的字符。如bWFrZQ==.html
    "make": "/make.html",
    //首页及分布
    "index": ["/", "/page/:page/"],
    //文章页
    "article": "/archive/:article.html"
  },
  //插件列表
  "plugins":{
    //主题插件，只能选择一个
    "theme": {
      //主题唯一的名称，也就是安装时的名称
      "package": "../../purelog-theme-ghost",
      //与主题相关的选项，可选
      "options":{}
    },
    //路由插件，可以多个，按顺序调用
    "routes":[
      {
        //插件的唯一名称
        "package": "../../purelog-router-rss",
        //插件的配置，可选
        "options": {
          //是否全文输出
          full: true,
          //输出多少条记录
          limit: 20
        }
      }
    ],
    //只读数据的提供者
    "reduce":{
      "package": "../../purelog-reduce-cache",
      "options":{
        //是否缓存内容
        "cache_content": true
      }
    },
    //数据存储的插件，负责数据的存取
    "storage":{
      "package": "../../purelog-storage-local",
      //选项
      "options": {
        //文件过滤
        filter: /\.((md)|(markdown))$/i,
        //本地存放的路径，相对于程序远行的目录
        "content": "content",
        //meta的映射
        "meta":{
          //发布日期
          "publish_date": {
            match: /date/i
          },
          "link": {
            match: /id/i
          }
        }
      }
    }
  }
}