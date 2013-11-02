module.exports = {
    "title": "涂雅",
    "host": "http://iove.net",
    "port": 13111,
    "description": "一个程序员",
    "meta_keywork": "",
    "meta_description": "",
    "page_size": 5,
    "theme": "ghost",
    "content": {
        type: "git",    //local,dropbox,git
        url: "https://github.com/conis/blog"
    },
    //支持三个模式，cache(缓存所有)，static(静态文件)，realtime(实时渲染)
    "model": "cache",
    "mate_map": {
        "date_format": "YYYY-MM-DD hh:mm:ss",
        "title": "Title",
        "link": "ID",
        "publish_date": "Date",
        "id": "ID",
        "excerpt": "Excerpt",
        "type": "Type",
        "status": "Status"
    },
    "router": {
        //重建索引的网址，建议可以使用base64或者md5的字符
        "make": "/make.html",
        "index": "/",
        //首页页
        "index_page": "/page/:page/?",
        "page": "/:page/",
        //"category": "/category/:category.html",
        "article": "/archive/:article.html"
    },
    //插件列表
    "plugin":{
      //主题插件，只能选择一个
      "theme": {
        //主题唯一的名称，也就是安装时的名称
        "id": "../purelog-theme-ghost",
        //与主题相关的选项，可选
        "options":{}
      },
      //路由插件，可以多个，按顺序调用
      "router":[
        {
          //插件的唯一名称
          "id": "purelog-router-analyze",
          //插件的配置，可选
          "options": {}
        }
      ],
      //只读数据的提供者
      "vendor":[
        {
          "id": "purelog-vendor-cache",
          "options":{
            //是否缓存内容
            "cache_content": true
          }
        }
      ],
      //数据存储的插件，负责数据的存取
      "storage":{
        "id": "purelog-storage-local",
        //选项
        "options": {
          //本地存放的路径，相对于程序远行的目录
          "path": "./content"
        }
        /*
        {
          //如果博客放在git，可以使用这个插件
          "id": "purelog-storage-git",
          //选项
          "options": {
            //仓库的地址，如果服务器没有添加SSH Key，建议使用https
            "repos": "https://github.com/conis/blog.git"
          }
        }
       */
      }
    }
}