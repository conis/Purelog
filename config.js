module.exports = {
    "title": "Purelog",
    "host": "http://iove.net",
    "description": "A simple blog based on markdown",
    "meta_keywork": "",
    "meta_description": "",
    "page_size": 5,
    "theme": "ghost",
    "content": "./content",
    //支持三个模式，cache(缓存所有)，static(静态文件)，realtime(实时渲染)
    "model": "cache",
    "mate_map": {
        "date_format": "yyyy-MM-dd hh:mm:ss",
        "title": "Title",
        "link": "Link",
        "publish_date": "Date",
        "id": "ID",
        "excerpt": "Excerpt",
        "type": "Type"
    },
    "router": {
        //重建索引的网址，建议可以使用base64或者md5的字符
        "make": "/make.html",
        "index": "/",
        //首页页
        "index_page": "/page/:page/?",
        "page": "/:page/",
        //"category": "/category/:category.html",
        "article": "/archive/:article"
    }
}