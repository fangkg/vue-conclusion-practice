/*
 * @Author: fangkg
 * @Date: 2020-11-30 14:32:37
 * @LastEditTime: 2020-11-30 15:39:58
 * @LastEditors: Please set LastEditors
 * @Description: 问题汇总
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\vue\actualPractice\ali.js
 */

// EventLoop

// async await

// promise

// for of 

// generator()

// nodejs koa

// cors

// 跨域
// 工程服务化后，不同职责的服务分散在不同的工程中，这些工程的域名是不同的，一个需求可能对应到多个服务，需要调用不同服务的接口，因此出现跨域。
// 浏览器非同源请求(协议protocol，端口port，主机host三者中任何一个不同即为跨域

// 实现
// JSONP，在页面上引入不同域上的js脚本文件是允许的，(Cross-origin embedding),因此在js文件载入完毕之后，触发回调，可以将需要的data作为参数传入。
{/* <script type="text/javascript">
    function dosomething(data) {
        // 处理获得的数据
    }
</script>
<script src="http://example.com/data.php?callback='dosomething'"></script> */}
// JSONP优点：兼容性好；
// JSONP缺点：只支持GET请求；XMLHttpRequest相对于JSONP有着更好的错误处理机制；

// CORS，能使服务器支持XMLHttpRequest的跨域请求。使用时只需要增加一些HTTP头，让服务器能够声明允许的访问来源。
// 使用CORS时，异步请求会被分为简单请求和非简单请求，非简单请求的区别使会发一次预检请求；
// 简单请求：GET,HEAD,POST
// 仅仅当POST方法的Content-Type的值为text/plain, multipart/form-data, application/x-wwww-form-urlencoded时才算做简单请求。
// 请求报文中Origin表明该请求来源
// 响应报文中Access-Control-Allow-Origin: *表明该资源可以被任意外部域访问。

// 非简单请求
// PUT DELETE CONNECT OPTIONS TRACE PATCH
// 人为设置了对CORS安全的首部字段集合之外的其它首部字段。该集合为Accept, Accept-Language, Content-Language, Content-Type, DPR, Downlink, Save-Data, Viewport-Width, Width

// Content-Type的值不属于下列之一:application/x-www-form-urlencoded, multipart/form-data, text/plain。发送真正请求前会先发送预检请求。
// 预检请求携带两个首部字段：Access-Control-Request-Method: POST告诉服务器之后的实际请求将使用POST方式；
// Access-Control-Request-Headers: X-PINGOTHER;告诉服务器实际请求将携带两个自定义请求首部字段:X-PINGOTHER与Content-Type。服务器依据此决定实际请求是否被允许。
// 预检请求Response
// Access-Control-Allow-Origin: foo.com 标识可接受的跨域请求源；
// Access-Control-Allow-Methods: POST, GET, OPTIONS 标识可以接受的跨域请求方法
// Access-Control-Allow-Headers: X-PINGOTHER, Content-Type 标识可以接受的跨域请求自定义头
// Access-Control-Max-Age: 86400 标识本次请求的有效时间(秒)，期间内无需再次发送预检请求

// XMLHttpRequest请求可以发送凭证请求(HTTP Cookies和验证信息)，通常不会跨域发送凭证信息，但是也有一些情况需要打通不同的登录态，因此如果要发送凭证信息，需要设置XMLHttpRequest的某个特殊标志位。
var xhr = new XMLHttpRequest();
xhr.withCredentials = true;
// 服务端返回
// Access-Control-Allow-Credentials: true时，浏览器才会将响应结果传递给客户端程序。
// Access-Control-Allow-Origin必须指定请求源的域名，否则响应失败。

// postMessage
// window.postMessage(message, targetOrigin)
// html5新引入的特性，使用它来向其它的window对象发送消息，无论这个window对象是属于同源或者不同源。