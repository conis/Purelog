module.exports = {
  "title": "Purelog",
  "host": "http://localhost:13111",
  "port": 13111,
  "description": "A simple blog based on markdown",
  "meta_keywork": "purelog, blog, node.js",
  "meta_description": "A simple blog based on markdown",
  "page_size": 5,
  //是否缓存页面为html，即缓存为静态内容，不用每次都渲染
  "cache": {
    //缓存索引页，如果为false，则不缓存，为数字则缓存多少页
    "index": 999,
    //缓存文章页
    "article": true
  },
  "router": {
    //重建索引的网址，建议可以使用base64或者md5的字符。如bWFrZQ==.html
    "make": "/make.html",
    //首页及分布
    "index": "/(/page/:page/)?",
    //文章页
    "article": "/archive/:article.html"
  },
  //插件列表
  "plugin":{
    //主题插件，只能选择一个
    "theme": {
      //主题唯一的名称，也就是安装时的名称
      "package": "purelog-theme-ghost",
      //与主题相关的选项，可选
      "options":{}
    },
    //路由插件，可以多个，按顺序调用
    "router":[
      {
        //插件的唯一名称
        "package": "purelog-router-analyze",
        //插件的配置，可选
        "options": {}
      }
    ],
    //只读数据的提供者
    "reduce":{
      "package": "purelog-reduce-cache",
      "options":{
        //是否缓存内容
        "cache_content": true
      }
    },
    //数据存储的插件，负责数据的存取
    "storage":{
      "package": "purelog-storage-local",
      //选项
      "options": {
        //文件过滤
        filter: /\.((md)|(markdown))$/i,
        //本地存放的路径，相对于程序远行的目录
        "source": "./content",
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