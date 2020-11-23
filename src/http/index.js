/*
 * @Author: fangkg
 * @Date: 2020-11-23 17:45:01
 * @LastEditTime: 2020-11-23 18:32:30
 * @LastEditors: Please set LastEditors
 * @Description: HTTP相关属性
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\http\index.js
 */

 // 请求方法
 // HTTP1.0三种请求方法：GET,POST,HEAD
 // HTTP1.1新增了五种请求方法：OPTIONS,PUT,DELETE,TRACE,CONNECT
 // GET：通常用于请求服务器发送某些资源
 // HEAD：请求资源的头部信息，并且这些头部与HTTP GET方法请求时返回的一致。该请求方法的一个使用场景是在下载一个大文件前先获取其大小再决定是否要下载，以此来节约带宽资源。
 // OPTIONS：用于获取目的的资源所支持的通信选项
 // POST：发送数据给服务器
 // PUT：用于新增资源或者使用请求中的有效负载替换目标资源的表现形式
 // DELETE：用于删除指定的资源
 // PATCH：用于对资源进行部分修改
 // CONNECT：HTTP/1.1协议中预留给能够将连接改为管道方式的代理服务器
 // TRACE：回显服务器收到的请求，主要用于测试或者诊断

 // GET POST区别
 // 数据传输方式不同：GET请求通过URL传输数据，POST通过请求体传输数据。
 // 安全性：POST的数据在请求体内，有一定的安全保证，GET的数据在URL中，通过历史记录，缓存可以很容易的查到数据信息。
 // 数据类型：GET只允许ASCII字符，而POST无限制
 // GET无害：刷新、后退等浏览器操作GET请求无害，POST可能重复提交表单。
 // 特性不同：GET安全且幂等。(安全：只读特性，使用这个方法不会引起服务器状态变化)(幂等：同一个请求方法执行多次和执行一次的效果完全相同)；而POST是非安全非幂等。

 // PUT POST 区别
 // PUT方法是幂等的，连续调用一次或者多次的效果相同(无副作用)；PUT的URI指向的是具体单一资源，POST可以指向资源集合。

 // PUT PATCH给服务器发送修改资源 
 // PATCH用来对已知资源进行局部更新

 // HTTP请求报文：请求行 请求头部 空行 请求体
 // 请求行：请求方法字段、URL字段、HTTP协议版本字段。它们用空格分隔；GET /index.html HTTP/1.1
 // 请求头部：关键字/值对组成，每行一对，关键字和值用英文冒号:分隔
 // User-Agent：产生请求的浏览器类型
 // Accept：客户端可识别的内容类型列表
 // Host：请求的主机名，允许多个域名同处一个IP地址，即虚拟主机
 // 请求体：post put等请求携带的数据
 
 // 响应报文：响应行、响应头、空行、响应体
 // 响应行：协议版本、状态码、原因短语，例如HTTP/1.1 200 OK
 // 响应头：响应部首组成
 // 响应体：服务器响应的数据

 // HTTP部首
 // 通用首部字段general Header Fields：请求报文和响应报文两方都会使用的首部
 // Cache-Control控制缓存
 // Connection连接管理、逐条首部
 // Upgrade升级为其它协议
 // via 代理服务器相关信息
 // Warning错误和警告通知
 // Transfer-Encoding报文主题的传输编码格式
 // Trailer报文末端的首部一览
 // Pragma报文指令
 // Date创建报文的日期

 // 请求首部字段Request Header Fields客户端向服务器发送请求的报文时使用的首部
 // Accept客户端或者代理能够处理的媒体类型
 // Accept-Encoding优先可处理的编码格式
 // Accept-Language优先可处理的自然语言
 // Accept-Charset优先可以处理的字符集
 // If-Match比较实体标记ETage
 // If-None-Match比较实体标记ETage与If-Match相反
 // If-Modified-Since比较资源更新时间Last-Modified
 // If-Unmodified-Since比较资源未更新时间Last-Modified，与If-Modified-Since相反

 