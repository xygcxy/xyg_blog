//深度克隆
function cloneObject(src){
	var c = src.constructor === Array ? [] : {};
	for (var i in src){
		if(src.hasOwnProperty(i)){
			c[i] = typeof src[i] === "object" ? cloneObject(src[i]) : src[i]; 
		}
	}
	return c;
}

var srcObj = {
	a: 1,
	b: {
		b1: ["hello", "h1"],
		b2: "Javascript"
	}
};

var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

// console.log(abObj.a);
// console.log(abObj.b.b1[0]);

// console.log(tarObj.a);
// console.log(tarObj.b.b1[0]);


//数组去重
function uniqArray(arr){
	for(var i = arr.length; i--;){
		var n = arr[i];
		if(Object.prototype.toString.call(n) == ['object Array']){
			uniqArray(n);
		}
		if(arr.indexOf(n) != arr.lastIndexOf(n)){
			arr.splice(i, 1);			
		}
	}
	return arr;
}

// var a = [1, 3, 5, 7, 5, 3];
// var b = uniqArray(a);
// console.log(b);


//正则去除空格
function trim(src){
	var m = src.replace(/^[\s　]+|[\S　]+$/g, '');
	return m;
}

// var str = '	   　hi!  	';
// str = trim(str);
// console.log(str);

//遍历数组
function each(arr, fn){
	for (var i in arr){
		fn(arr[i], i);
	}
}
// var arr = ['java', 'c', 'php', 'html'];
function output(item){
	console.log(item)
}
// function output(item, index){
// 	console.log(index + ': ' + item);
// }

// each(arr, output);

//获取对象第一层数量
function getObjectLength(obj) {
	var count = 0;
	for (var i in obj){
		count++;
	}
	return count;
}

var obj = {
	a: 1,
	b: 2,
	c: {
		c1: 3,
		c2: 4
	}
};
// console.log(getObjectLength(obj));


//正则邮箱地址
function isEmail(emailStr){
	var m = emailStr.match(/^([a-zA-Z0-9_\.\-])+@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)
	if(m){
		console.log('true');
	} else {
		console.log('false');
	}
}

//var email = isEmail('732jksadkal@gmail.com');

//判断手机号
function isMobilePhone(phone){
	var m = phone.match(/^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/);
	if(m){
		console.log('true');
	} else {
		console.log('false');
	}
}
// var phone = isMobilePhone('12600573846');

function addClass(element, newClassName){
	if (element.className == ""){
		element.className = newClassName;
	} else {
		var oldClassName = element.className;
		element.className = oldClassName + " " + newClassName;
	}
}

function removeClass(element, oldClassName){
	if(!element) return;
	var elementClassName = element.className;
	if(elementClassName.length == 0) return;
	if(elementClassName == oldClassName){
		element.className = "";
		return;
	}
	if(elementClassName.match(new RegExp("(^|\\s)" + oldClassName + "(\\s|$)")))
		element.className = elementClassName.replace((new RegExp("(^|\\s)" + oldClassName + "(\\s|$)")), "")

}

function isSiblingNode(element, siblingNode){
	if(element.parentNode == siblingNode.parentNode){
		return true;
	} else {
		return false;
	}
}

function getPosition(element){
	var pos = {
		left: 0,
		top: 0
	}
	element.left += element.offsetLeft;
	element.top += element.offsetTop;
	element = element.offsetParent;
}

//实现一份简单的Query
function $(selector){
    var values = selector.trim().split(" ");
    if( values.length == 1 ) {
        switch (values[0].charAt(0)) {
            case "#":
                return document.getElementById(values[0].substring(1));
            case ".":
                return document.getElementsByClassName(values[0].substring(1))[0];
            case "[":
                return document.querySelector(selector);
            default:
                return document.getElementsByTagName(values[0].substring(1))[0];
        }
    }
    else{
        document.querySelector(selector);
    }
}

function addEvent(element, event, listener){
	if (element.addEventListener) {
		element.addEventListener(event, listener, false);
	} else if (element.attachEvent) {
		element.attachEvent("on" + event, listener);
	} else {
		element["on" + event] = listener;
	}
}

function removeEvent(element, event, listener){
	if(element.removeEventListener){
		element.removeEventListener(event, listerner, false);
	} else if (element.detachEvent){
		element.attachEvent("on" + event, listener)
	} else {
		element["on" + event] = null;
	}
}

//click事件绑定
function addClickEvent(element, listener){
	addEvent(element, "click", listener);
}
//Enter按键绑定
function addEnterEvent(element, listener){
	if(e.keyCode == 13){
		addEvent(element, "keyup", function(e){
			var e = e || window.event;
			listener.call(this);
		});
	}
}

$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.enter = addEnterEvent;

// function clickListener(event) {
//     console.log(event);
// }

// function renderList(){
// 	$("#list").innerHTML = '<li>new item</li>';
// }

// function init(){
	// each($("#list").getElementsByTagName('li'), function(item) {
 //    	$.click(item, clickListener);
	// });

// 	$.click($('#btn'), renderList);
// }
// init();

function delegateEvent(element, tag, eventName, listener) {
    addEvent(element, eventName, function(event) {
        var e = event || window.event;
        var target = event.target || event.srcElement;
        if (target.nodeName.toLowerCase() == tag.toLowerCase()) {
            listener(e);
        }
    });
}
$.delegate = delegateEvent;
// $.delegate($("#list"), "li", "click", clickListener);

$.on = function(selector, event, listener){
	addEvent($(selector), event, listener);
}

$.click = function(selector, listener){
	addClickEvent($(selector), listener);
}
$.un = function(selector, event, listener){
	removeEvent($(selector), event, listener);
}
$.delegate = function(selector, tag, eventName, listerner){
	delegateEvent($(selector), tag, eventName, listerner);
}

//判断IE浏览器
function ifIE(){
	var browser = navigtor.appName;
	var b_version = navigtor.appVersion;
	var version = b_version.split(";");
	var trim_Version = version[1].replace(/[]/g,"");
	if(browser == "Microsoft Internet Explorer" && trim_Version == "MSIE7.0"){
		alert("IE 7.0");
	} else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE8.0"){
		alert("IE 8.0");
	}else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE9.0"){
		alert("IE 9.0");		
	}else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE10.0"){
		alert("IE 10.0");		
	} else if (browser == "Microsoft Internet Explorer" && trim_Version == "MSIE6.0"){
		alert("IE 6.0");		
	} else {
		alert("IE 11");
	}
}

function setCookie(name, value){
	var exp = new Date();
	exp.setTime(exp.getTime() + 1*60*60*1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getCookie(name){
	var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
	if(arr != null){
		return unescape(arr[2]);
	}
	return null;
}
function ajax(url, option){
	var method = (option.method) ? option.method.toLowerCase() : 'get';
	var data = option.data || null;
	var onsucess = option.onsucess || function(){};
	var onfail = option.onfail || function(){};
	function createXHR(){
	if(typeof XMLHttpRequest != "underfined"){
		return new XMLHttpRequest();
	} else if (typeof ActiveXObject != "underfined"){
		if(typeof arguments.callee.activeXString != "string"){
			var versions = [ "MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0",
								 "MSXML2.XMLHTTP"],
				i,len;
			for(i=0,len=version.length; i<len; i++){
				try{
					new ActiveXObject(version[i]);
					arguments.callee.activeXString = version[i];
					break;
				} catch(ex) {

				}
			}
		}
		return new ActiveXObject();
	} else {
		throw new ("No XHR are available");
	}
	}
	var xhr = createXHR();
	xhr.onreadystatechange = function(){
		if(xhr.readyState === 4){
			if((xhr.status >= 200 && xhr.status <300) || xhr.status == 304 ){
                if(option.type==="json"){
                    option.onsuccess(JSON.parse(xhr.responseText));
                }else{
                    option.onsuccess(xhr.responseText);
                }
            }else{
                option.onfail(xhr.status);
            }
		}
	}
	xhr.open("method", url, true);
	if(method == 'get'){
		xhr.send(null);
	} else {
		xhr.send(serialize(data));
	}
}

// ajax(
//     'http://localhost:8080/server/ajaxtest', 
//     {
//         data: {
//             name: 'simon',
//             password: '123456'
//         },
//         onsuccess: function (responseText, xhr) {
//             console.log(responseText);
//         }
//     }
// );

