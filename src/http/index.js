/*
 * @Author: fangkg
 * @Date: 2020-11-23 17:45:01
 * @LastEditTime: 2020-11-23 18:02:31
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
 