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
    }
}