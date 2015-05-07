---
layout: post
title: js-坐标
category : 笔记
tagline: "Supporting tagline"
tags : [javascript,基础]
---
{% include JB/setup %}
# js坐标相关
---
## 1）鼠标点击事件的坐标，相对于可视区域（Client）左上角
var point_y = evt.clientY;
var point_x = evt.clientX;
其中evt为鼠标点击事件。

## 2）可视区域左上角的坐标，相对于整个页面(Page)左上角
if(window.pageYOffset != 'undefined') {
point.x = window.pageXOffset;
point.y = window.pageYOffset;
}
else if(typeof document.compatMode != 'undefined' && document.compatMode != 'BackCompat') {
point.x = document.documentElement.scrollLeft;
point.y = document.documentElement.scrollTop;
}
else if(typeof document.body != 'undefined') {
point.x = document.body.scrollLeft;
point.y = document.body.scrollTop;
} 

关于document.compatMode，请参考 关于document.compatMode的一些介绍 

## 3) 某元素的左上角坐标，相对于整个页面（Page）左上角
function elementLeft(e)
{
var offset = e.offsetLeft;
if(e.offsetParent != null) offset += elementLeft(e.offsetParent);
return offset;
}

## 4) 网页全文高和宽

网页正文全文宽 document.body.scrollWidth 
网页正文全文高 document.body.scrollHeight 
其中，IE7/IE8/IE9/Firefox行为一致，指的都是抛除position=absolute的元素且不管页面缩放的全文高度；Chrome行为稍有不同，计算宽度和高度时包含了position=absolute的元素；且当页面缩放时，当全文高度/宽度小于可视区域的高度和宽度时，给出的是可视区域的高度和宽度。

## 5)屏幕分辨率的高和宽

屏幕分辨率的高 window.screen.height 
屏幕分辨率的宽 window.screen.width 
其中，当页面不缩放时，三种浏览器的行为一致，都是获得真实的屏幕分辨率；
当页面缩放时，Chrome返回的值不变，而IE7/IE8/IE9/Firefox的行为一致，返回 屏幕分辨率/缩放比例。
比如，当屏幕分辨率为1920*1200，缩放比例200%时，返回960*600.

## 6) 网页可视区域的高和宽

网页可见区域宽 document.body.clientWidth 
网页可见区域高 document.body.clientHeight 
该高度和宽度扣除了浏览器右侧和底部的滚动条，也扣除了body的margin.
高度 = Min(页面高度，可视高度）宽度 = Max(页面宽度，可视高度)
其中，如果页面底部是某些元素的margin，则此margin不计算在页面高度内；

注意，页面缩放后，高度不变，宽度为（原始宽度/缩放比例）

## 7) 网页被卷去的高和宽

网页被卷去的宽度 window.pageXOffset; document.documentElement.scrollLeft;
网页被卷去的高度 window.pageYOffset;document.documentElement.scrollTop;
其中，前者三种浏览器都支持，Chrome不支持后者。

## 8) 某元素ScrollHeight / OffsetHeight / ClientHeight的区别
OffsetHeight为元素的高度，被挡住的部分同样计算在内；其父元素的overflow属性对此值没有影响；自身的overflow高度对此就没有影响。
scrollHeight为元素的高度，被挡住的部分同样计算在内；其父元素的overflow属性对此值没有影响；受自身的overflow影响。
clientHeight为元素的高度，被挡住的部分同样计算在内；其父元素的overflow属性对此值没有影响；受自身的overflow影响。

经过测试，发现在所有情形下scrollHeight与clientHeight的值都相同...有点诡异。

注意，IE系列浏览器的滚动条的宽度和高度是是固定的16px，不受缩放影响；Firefox和Chrome的滚动条在100%的时候是16px，当缩放时，该宽度和高度发生变化，为 （16/缩放比例）px.

## 9）某元素的OffsetTop 
对于position!=absolute的元素，offsettop为其相对于其祖先元素中最近的一个postion=relative或position=absolute的元素的偏移。
对于position=absolute的元素，offsettop为其top属性指定的值，如果该属性为空，则与position!=absolute的时候算法相同；

## 10）某元素的ScrollTop
注意，scrollTop是指某一元素内部的元素被卷去的高度；而不是该元素本身被卷去的高度；
只有当该元素的overflow=auto或scroll的时候，该数值才有意义；