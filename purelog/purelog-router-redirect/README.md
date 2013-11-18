##purelog-router-redicrect

实现博客的301功能，适用于博客搬家后改地址，适用于Purelog

##配置

1. 打开配置文件`config.js`
2. 在routes键增加一个配置，你需要对正则表达式有一定的了解，才能进行配置。示例配置如下：

    "options": {
      routes: [
        {path: /^\/(\d+)\/?$/i, to: "/archives/$1.html"},
        {path: /^\/archive\/(.+)\.html$/i, to: "/archives/$1.html"}
      ]
    }

`path`是匹配原来地址的正则表达式，to是要转向(301)的地址。上述配置文件中的`/^\/(\d+)\/?$/i`，将会匹配任意数字的地址，如`/1234`，`/235/`等，但不会匹配`/some/`。
