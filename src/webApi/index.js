/*
 * @Author: fangkg
 * @Date: 2020-11-20 09:31:43
 * @LastEditTime: 2020-11-20 11:15:44
 * @LastEditors: Please set LastEditors
 * @Description: BOM操作、DOM操作、事件绑定、Ajax、存储
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\webApi\index.js
 */
// BOM：浏览器对象模型，是浏览器本身的一些信息的设置和获取。navigator,screnn,location,history
// 获取浏览器特性，即(UA)然后识别客户端，判断是不是Chrome浏览器
// var ua = navigator.userAgent
// var isChrome = ua.indexOf('Chrome');
// console.log('isChrome:', isChrome)

// 获取屏幕高度和宽度
// let width = screen.width;
// let height = screen.height;

// 获取网络协议、地址、path、参数、hash等
// let href = location.href
// let protocol = location.protocol
// let pathname = location.pathname
// let search = location.search
// let hash = location.hash

// 前进
// history.back()
// history.forward()

// 获取DOM节点
// var div1 = document.getElementById('div1');
// 通过tagename获取
// var divList = document.getElementsByTagName('div');
// 通过class获取
// var containerList = document.getElementsByClassName('container');
// 通过css选择器获取
// var pList = document.querySelectorAll('p');
// property：DOM节点就是一个JS对象，它符合之前讲述的对象的特征-可拓展属性。property的获取和修改是直接改变JS对象
// var pList = document.querySelectorAll('p');
// var p  = pList[0];
// let width_p = p.style.width
// let className = p.className
// let nodeName = p.nodeName
// let nodeType = p.nodeType
// attribute是直接改变HTML的属性，attribute就是对HTML属性的get和set和DOM节点的JS范畴的property没有关系
// let style = p.getAttribute('style');

// get和set attribute时，会触发DOMO的查询或者重排、重绘，频繁操作会影响页面性能。


// 新增DOM树节点
// var div2 = document.getElementById('div2')
// var div3 = document.createElement('div3')
// div3.innerHTML = 'this is div3'
// 添加新创建的元素
// div2.appendChild(div3)

// 移动已有节点
// var p2 = document.getElementById('p2')
// div1.appendChild(p2)
// 获取父元素
// var parent = div1.parentElement
// 获取子元素
// var child = div1.childNodes
// 删除节点
// div1.removeChild(child[0])

// 事件，事件绑定
// var btn = document.getElementById('btn')
// btn.addEventListener('click', function(event) {
//     // 阻止默认行为
//     event.preventDefault()
//     // 阻止冒泡
//     event.stopPropagation()
// })

// 通用事件绑定函数
// function bindEvent(element, type, fn) {
//     element.addEventListener(type, fn)
// }
// var cliBtn = document.getElementById('cliBtn')
// 调用通用事件绑定函数
// bindEvent(cliBtn, 'click', function(e) {
//     // 阻止默认行为
//     e.preventDefault()
// })

// 事件冒泡
{/* <body>
    <div id="div1">
        <p id="p1">激活</p>
        <p id="p2">取消</p>
        <p id="p3">取消</p>
        <p id="p4">取消</p>
    </div>
    <div id="div2">
        <p id="p5">取消</p>
        <p id="p6">取消</p>
    </div>
</body> */}

// 点击p1时进入激活状态，点击其它任何<p></p>都取消状态
// var body = document.body;
// bindEvent(body, 'click', function(e) {
//     // 所有的p的点击都会冒泡到body上，因为DOM结构中body是p的上级节点，事件会沿着DOM树向上冒泡
//     alert('取消')
// })

// var p1 = document.getElementById('p1');
// bindEvent(p1, 'click', function(e) {
//     // 阻止冒泡
//     e.stopPropagation()
//     alert('激活')
// })
// 如果我们在p1 div1 body中都绑定了事件，它会根据DOM结构来冒泡，从下到上挨个执行。我们使用e.stopPropagation可以阻止冒泡。


// 事件代理
{/* <div id="div3">
    <a href="#">a1</a>
    <a href="#">a2</a>
    <a href="#">a3</a>
</div> */}
{/* <button>点击增加一个a标签</button> */}
// 监听<a></a>的事件，要把具体的事件绑定到<div></div>上，然后看事件的触发点是不是<a></a>
// var div3 = document.getElementById(div3);
// div3.addEventListener('click', function(e) {
//     // e.target可以监听到触发点击事件的元素是哪一个
//     var target = e.target;
//     if (e.nodeName === 'A') {
//         // 点击的是<a></a>元素
//         alert(target.innerHTML)
//     }
// })


// function bindEventProxy(element, type, selector, fn) {
//     // 这样处理可以接收两种调用方式bindEventProxy(div1, 'click', 'a', function() {})和bindEventProxy('div1', 'click', functin() {})
//     if (fn == null) {
//         fn = selector
//         selector = null
//     }

//     // 绑定事件
//     element.addEventListener(type, function(e) {
//         var target;
//         if (selector) {
//             // 有selector说明需要做事件代理
//             // 获取触发事件的元素即e.target
//             target = e.target;
//             // 看是否符合selector这个条件
//             if (target.matches(selector)) {
//                 fn.call(fn, e)
//             }
//         } else {
//             // 没有selector说明不需要事件代理
//             fn(e);
//         }
//     })
// }

// 使用代理，bindEventProxy多一个'a'参数
// var div4 = document.getElementById(div4);
// bindEventProxy(div4, 'click', 'a', function(e) {
//     console.log(this.innerHTML)
// })

// 不使用代理
// bindEventProxy(div4, 'click', function(e) {
//     console.log(e.target)
// })

// 代理的优点：使代码简洁、减少浏览器的内存占用

// Ajax XMLHttpRequest
// var xhr = new XMLHttpRequest();
// xhr.onreadystatechange = function() {
//     // 函数异步执行,xhr.readyState是浏览器判断请求过程中的各个阶段；xhr.status是HTTP协议中规定的不同结果的返回状态说明。
//     // 0：代理被创建，但尚未调用open()方法
//     // 1：open()方法已经被调用
//     // 2：send()方法已经被调用，并且头部和状态已经可以获得
//     // 3：下载中，responseText属性已经包含部分数据
//     // 4：下载操作已经完成
//     if (xhr.readyState == 4) {
//         if (xhr.status === 200) {
//             alert(xhr.responseText)
//         }
//     }
// }
// xhr.open('GET', '/api', false);
// xhr.send(null)

// HTTP状态码
// 200正常
// 301永久重定向
// 302临时重定向
// 304资源找到但是不符合请求条件，不会返回任何主体。发送GET请求时，head中有If-Modified-since: xxx要求返回更新时间之后的资源，如果此时服务器端资源未更新，则会返回304.


// Fetch API

// 跨域：浏览器中有同源策略，一个域下的页面中，无法通过Ajax获取到其它域的接口。
// 协议 域名 端口不同算是跨域
// 解决跨域 JSONP
// window.callback = function(data) {
//     // 跨域得到的信息

// }
// 在页面中加入<script></script>，加载js之后，就会执行得到内容

// 服务器端设置 http header，这里需要在服务器端设置
// response.setHeader("Access-Control-Allow-Origin", "http://www.baidu.com"); // 第二个参数填写允许跨域的域名称
// response.setHeader("Access-Control-Allow-Headers", "X-Requested-With");
// response.setHeader("Access-Control-Allow-Methods", "PUT,POSt,GET,DELETE,OPTIONS");
// 接收跨域的cookie
// response.setHeader("Acess-Control-Allow-Credentials", "true")

// 存储
// cookie 本身不是用来做服务端存储，被设计用来在服务器和客户端进行信息传递的。因此每个HTTP请求都带着cookie，但是cookie也具有浏览器端存储的能力，比如记住用户名和密码
// document.cookie = ',,,'
// 存储量太小只有4KB；所有HTTP请求都带着，会影响获取资源的效率；API简单，需要封装才能使用；


// localStorage 专门为了浏览器端缓存设计
// 存储量5MB；不带到HTTP请求中；API适用于数据存储localStorage.setItem(key, value) localStorage.getItem(key);
// localStorage.setItem()使用时尽量加入到try-catch中，某些浏览器是禁用这个API

// sessionStorage：更具session过期时间而实现；localStorage会永久有效
// 一些需要及时失效的重要信息放在sessionStorage中，一些不重要的但是不经常设置的信息放在localStorage中





