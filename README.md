# d3
d3 learn task


## process.argv.slice(2)

通过process全局变量来在命令行内传递参数给要执行的文件

如配置如下：

`
"dev": "gulp --env dev",
"build": "gulp --env build",

`

然后在gulpfile.js文件内，通过process.argv.slice(2)来获取参数