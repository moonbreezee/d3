## Data-Driven Documents


> D3 的全称是（Data-Driven Documents），顾名思义可以知道是一个被数据驱动的文档。听名字有点抽象，说简单一点，其实就是一个 JavaScript 的函数库，使用它主要是用来做数据可视化的。

## 使用的d3库的版本说明

> 目前最新的版本是4.10.0，相对于上一个大版本修改了很多的接口，目前找到一份中文参考文档，https://github.com/d3/d3/wiki/API--%E4%B8%AD%E6%96%87%E6%89%8B%E5%86%8C；因此本次使用3.5.17来进行开发。

## 删除安装错误的模块

```
npm uninstall --save-dev stylus
```

## d3 V3.5.17的接口说明
1. https://github.com/d3/d3/wiki/%E9%80%89%E6%8B%A9%E5%99%A8#attr 
`# selection.attr(name[, value])`
2. # selection.style(name[, value[, priority]]) 设置样式
`selection.style({'stroke': 'black', 'stroke-width': 2})`
3. 添加class  # selection.classed(name[, value])


## 缩放事件

缩放是由 d3.behavior.zoom() 定义的。
scaleExtent 用于设置最小和最大的缩放比例，应该是所处空间和比例尺放大||缩小

## d3中的交互事件都会存在一个对象上   d3.event


## d3.scale.linear() 中还有一些方法，这里介绍两个：


nice()  ，改变函数的 domain ，能自动把 0.00000000000001 变为最接近它的 0 ， 9.999999991 变为最接近它的 10 
rangeRound() , 能自动把输出变为最接近它的整数。