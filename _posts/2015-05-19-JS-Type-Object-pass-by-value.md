---
layout: post
title: js-变量，内存
category : 笔记
tagline: "Supporting tagline"
tags : [javascript,基础]
---
{% include JB/setup %}
# js变量，内存
---
####值传递
#####1. 基本类型按值传递。参数只能按值传递。
```
fnuction addTen(num){
	num += 10;
	return num;
}
var count = 20;
var result = addTen(count);
alert(count);	//20没变化
alert(result);	//30
```
<!--break-->
#####2.对象按引用传值：
```
function setName(obj){
	obj.name = "Nicholas";
}
var person = new Object();
setName(person);
alert(person.name); //Nicholas
```
```
function setName(obj){
	obj.name = "Nicholas";
	obj = new Object();
	obj.name = "Grey";
}
var pserson = new Object();
setName(person);
alert(person.name); //"Nicholas"
```
注：即使在函数内部修改了参数的值，但原始的引用任然保持不变。实际上，当在函数内部重写obj时，这个变量引用的就是一个局部变量，局部变量在函数执行完毕后立即被销毁。

    var obj = {x : 1};
    obj.x = 100;
    var o = obj;
    o.x = 1;
    obj.x;  // 1, 被修改
    o = true;
    obj.x;  // 1, 不会因o = true改变

这里定义变量obj，值是object，然后设置obj.x属性的值为100。而后定义另一个变量o，值仍然是这个object对象，此时obj和o两个变量的值指向同一个对象（共享同一个对象的引用）。所以修改对象的内容，对obj和o都有影响。但对象并非按引用传递，通过o = true修改了o的值，不会影响obj。
####作用域
保证对执行环境有权访问的所有变量和函数的有序访问。<br/>
延长作用域链

    try-catch的catch块;
    with语句;

####垃圾清除
1.标记清除
2.引用计数
内存泄露是指一块被分配的内存既不能使用，又不能回收，直到浏览器进程结束。在C++中，因为是手动管理内存，内存泄露是经常出现的事情。而现在流行的C#和Java等语言采用了自动垃圾回收方法管理内存，正常使用的情况下几乎不会发生内存泄露。浏览器中也是采用自动垃圾回收方法管理内存，但由于浏览器垃圾回收方法有bug，会产生内存泄露。<br/>
当一个DOM对象包含一个Js对象的引用(例如一个Event Handler)， 而这个Js对象又持有对这个DOM对象的引用时，一个环状引用就行成了。

1、当页面中元素被移除或替换时，若元素绑定的事件仍没被移除，在IE中不会作出恰当处理，此时要先手工移除事件，不然会存在内存泄露。 
代码如下:

	<div id="myDiv"> 
	<input type="button" value="Click me" id="myBtn"> 
	</div> 
	<script type="text/javascript"> 
	var btn = document.getElementById("myBtn"); 
	btn.onclick = function(){ 
	document.getElementById("myDiv").innerHTML = "Processing..."; 
	} 
	</script>

应改成下面 
代码如下:

	<div id="myDiv"> 
	<input type="button" value="Click me" id="myBtn"> 
	</div> 
	<script type="text/javascript"> 
	var btn = document.getElementById("myBtn"); 
	btn.onclick = function(){ 
	btn.onclick = null; 
	document.getElementById("myDiv").innerHTML = "Processing..."; 
	} 
	</script> 

或者采用事件委托 
代码如下:

	<div id="myDiv"> 
	<input type="button" value="Click me" id="myBtn"> 
	</div> 
	<script type="text/javascript"> 
	document.onclick = function(event){ 
	event = event || window.event; 
	if(event.target.id == "myBtn"){ 
	document.getElementById("myDiv").innerHTML = "Processing..."; 
	} 
	} 
	</script> 

2、 
代码如下:

	var a=document.getElementById("#xx"); 
	var b=document.getElementById("#xxx"); 
	a.r=b; 
	b.r=a; 

代码如下:

	var a=document.getElementById("#xx"); 
	a.r=a; 

对于纯粹的 ECMAScript 对象而言，只要没有其他对象引用对象 a、b，也就是说它们只是相互之间的引用，那么仍然会被垃圾收集系统识别并处理。但是，在 Internet Explorer 中，如果循环引用中的任何对象是 DOM 节点或者 ActiveX 对象，垃圾收集系统则不会发现它们之间的循环关系与系统中的其他对象是隔离的并释放它们。最终它们将被保留在内存中，直到浏览器关闭。 
3、 
代码如下:

	var elem = document.getElementById('test'); 
	elem.addEventListener('click', function() { 
	alert('You clicked ' + elem.tagName); 
	}); 

这段代码把一个匿名函数注册为一个DOM结点的click事件处理函数，函数内引用了一个DOM对象elem，就形成了闭包。这就会产生一个循环引用，即：DOM->闭包->DOM->闭包...DOM对象在闭包释放之前不会被释放；而闭包作为DOM对象的事件处理函数存在，所以在DOM对象释放前闭包不会释放，即使DOM对象在DOM tree中删除，由于这个循环引用的存在，DOM对象和闭包都不会被释放。可以用下面的方法可以避免这种内存泄露 
复制代码 代码如下:

	var elem = document.getElementById('test'); 
	elem.addEventListener('click', function() { 
	alert('You clicked ' + this.tagName); // 不再直接引用elem变量 
	}); 

4、 
代码如下:

	function bindEvent() 
	{ 
	var obj=document.createElement("XXX"); 
	obj.onclick=function(){ 
	//Even if it's a empty function 
	} 
	} 

闭包非常容易构成循环引用。如果一个构成闭包的函数对象被指定给，比如一个 DOM 节点的事件处理器，而对该节点的引用又被指定给函数对象作用域中的一个活动（或可变）对象，那么就存在一个循环引用。 
DOM_Node.onevent -<function_object.[[scope]] -<scope_chain -<Activation_object.nodeRef -<DOM_Node。 

形成这样一个循环引用是轻而易举的，而且稍微浏览一下包含类似循环引用代码的网站（通常会出现在网站的每个页面中），就会消耗大量（甚至全部）系统内存。 
解决之道，将事件处理函数定义在外部，解除闭包 
代码如下:

	function bindEvent() 
	{ 
	var obj=document.createElement("XXX"); 
	obj.onclick=onclickHandler; 
	} 
	function onclickHandler(){ 
	//do something 
	} 

或者在定义事件处理函数的外部函数中，删除对dom的引用（题外，《JavaScript权威指南》中介绍过，闭包中，作用域中没用的属性可以删除，以减少内存消耗。） 
代码如下:

	function bindEvent() 
	{ 
	var obj=document.createElement("XXX"); 
	obj.onclick=function(){  //Even if it's a empty function 
	} 
	obj=null; 
	} 

5、 
代码如下:

	a = {p: {x: 1}}; 
	b = a.p; 
	delete a.p; 

执行这段代码之后b.x的值依然是1.由于已经删除的属性引用依然存在，因此在JavaScript的某些实现中，可能因为这种不严谨的代码而造成内存泄露。所以在销毁对象的时候，要遍历属性中属性，依次删除。<br/>
6. 自动类型装箱转换 
别不相信，下面的代码在ie系列中会导致内存泄露 
代码如下:

	var s=”lalala”; 
	alert(s.length); 

s本身是一个string而非object，它没有length属性，所以当访问length时，JS引擎会自动创建一个临时String对象封装s，而这个对象一定会泄露。这个bug匪夷所思，所幸解决起来相当容易，记得所有值类型做.运算之前先显式转换一下： 
代码如下:

	var s="lalala"; 
	alert(new String(s).length); 

7、某些DOM操作 
IE系列的特有问题 简单的来说就是在向不在DOM树上的DOM元素appendChild；IE7中，貌似为了改善内存泄露，IE7采用了极端的解决方案：离开页面时回收所有DOM树上的元素，其它一概不管。
