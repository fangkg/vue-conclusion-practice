/*
 * @Author: fangkg
 * @Date: 2020-11-23 17:45:01
 * @LastEditTime: 2020-11-24 10:28:22
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
 // If-Ranges资源未更新时发送实体byte的范围请求
 // Range实体的字节范围请求
 // Authorization web认证信息
 // Proxy-authorization代理服务器要求web认证信息
 // Host请求资源所在服务器
 // From用户的邮箱地址
 // User-Agent客户端程序信息
 // Max-Forwards最大逐跳次数
 // TE传输编码的优先级
 // Referer请求原始方的url
 // Expect期待服务器的特定行为

 // 响应首部字段 Response Header Fields 从服务器向客户端响应时使用的字段
 // Accept-Ranges能接受的字节范围
 // Age 推算资源创建经过的时间
 // Location 令客户端重定向的Url
 // vary 代理服务器的缓存信息
 // ETag 能够表示资源唯一的字符串
 // WWW-Authenticate 服务器要求客户端的验证信息
 // Proxy-Authenticate 代理服务器要求客户端的验证信息
 // Server服务器的信息
 // Retry-After 和状态码503一起使用的首部字段，表示下次请求服务器的时间

 // 实体首部字段Entity Header Fields 针对请求报文和响应报文的实体部分使用首部
 // Allow 资源可支持http请求的方法
 // Content-Language 实体的资源语言
 // Content-Encoding 实体的编码格式
 // Content-Length 实体的大小(字节)
 // Content-Type 实体媒体类型
 // Content-MD5实体报文摘要
 // Content-Location 代替资源的uri
 // Content-Ranges 实体主体的位置返回
 // Last-Modified 资源最后的修改资源
 // Expires 实体主体的过期资源


 // HTTP 状态码
 // 2XX成功
 // 200 OK 从客户端发来的请求在服务端被正确处理
 // 201 Created 请求已经被实现，而且有一个新的资源已经依据请求的需要而建立
 // 202 Accepted 请求已接受，但是还没有执行，不保证完成请求
 // 204 No content 请求成功 响应报文不含实体的主体部分
 // 206 Partial Content 进行范围请求
 // 3XX重定向
 // 301 moved permanently 永久重定向 表示资源已经被分配了新的URL
 // 302 found 临时重定向 表示资源临时被分配了新的URL
 // 303 see other 表示资源存在着另一个URL，应该使用GET方法去获取资源
 // 304 not modifed 表示服务器允许访问资源，但是因为发生请求未满足条件的情况
 // 307 temporary redirect 临时重定向和302含义相同
 // 4XX客户端错误
 // 400 bad request 请求报文存在语法错误
 // 401 unauthorized 表示发送的请求需要有通过HTTP认证的认证信息
 // 403 forbidden 对请求资源的访问被服务器拒绝
 // 404 not found 在服务器上没有找到请求的资源
 // 408 Request timeout 客户端请求超时
 // 409 confict 请求的资源可能引起冲突
 // 5XX服务器错误
 // 500 internal server error 服务端在执行请求时发生了错误
 // 501 Not Implemented 请求超出服务器能力范围，例如服务器不支持当前所需要的某个功能，或者请求是服务器不支持的某个方法
 // 503 service unavailable 服务器暂时处于超负荷或者停机维护，无法处理请求
 // 505 http version not supported 服务器不支持，或者拒绝支持在请求中使用的HTTP版本

 // 302 303 307
 // 302是http1.0的协议状态码
 // http1.1为了细化302状态码又分出来303和307
 // 303明确表示客户端应当采用get方法获取资源，他会把POST请求变为GET请求进行重定向
 // 307 会遵照浏览器标准不会从post变为get

 // HTTP keep-alive
 // http1.0中，每次http请求都要创建一个新的连接，而创建连接的过程需要消耗资源和时间，为了减少资源消耗，缩短响应时间，就需要重用连接。在http请求头中加入Connection:keep-alive来告诉对方这个请求响应完成后不要关闭，下一次还有这个连接继续请求。
 // 优点：较少的CPU和内存使用(由于同时打开的连接减少了)
 // 允许请求和应答的HTTP管线化
 // 降低拥塞控制(TCP连接减少了)
 // 减少了后续请求的延迟(无需再进行握手)
 // 报告错误无需关闭TCP连接

 // HTTPS 
 // http协议的数据都是明文进行传输，对于一些敏感信息的传输很不安全，HTTPS解决HTTP的不安全而产生。
 // 对称加密：通信双方都使用同一个密钥进行加解密。简单性能好，但是无法解决首次把密钥发给对方的问题
 // 非对称加密：私钥 + 公钥 = 密钥对；用私钥加密数据，只有对应的公钥才能解密，用公钥加密数据，只有对应的私钥才能解密；通信双方的手里都有一套自己的密钥对，通信之前双方会先把自己的公钥发给对方；然后对方再拿着这个公钥来加密数据相应给对方，等到了对方那里，对方再用自己的私钥进行解密。
 // 非对称加密安全性高，速度很慢，影响性能
 // 解决方案：结合两种加密方式，将对称加密的密钥使用非对称加密的公钥进行加密，然后发送出去，接收方使用私钥进行解密得到对称加密的密钥，然后双发可以使用对称加密来进行沟通。
 // 中间人问题：如果此时客户端和服务器之间存在一个中间人，这个中间人只需要把原本双方通信互发的公钥换成自己的公钥，这样中间人就可以轻松解密通信双发所发送的所有数据。这个时候需要一个第三方颁发证书CA，证明身份的身份，防止被中间人攻击。证书中包括：签发者、证书用途、使用者公钥、使用者私钥、使用者的HASH算法、证书到期时间。
 // 如果中间人篡改了证书，证明就无效了，此时需要一个新的技术，数字签名
 // 数字签名：用CA自带的HASH算法对证书的内容进行HASH得到一个摘要，再用CA的私钥加密，最终组成数字签名。
 // 当别人把他的证书发过来的时候，我们再用同样的Hash算法再次生成消息摘要，然后用CA公钥对数字签名进行解密得到CA创建的消息摘要，两者一比较，就知道中间人是否篡改。

 // HTTP2
 // 二进制分帧
 // 帧：HTTP/2数据通信的最小单位消息，请求相应等消息由一个或者多个帧组成。
 // 流：存在于连接中的一个虚拟通道。流可以承载双向信息，每个流都有一个唯一的整数ID
 // HTTP/2采用二进制格式的传输数据，而非HTTP1.x的文本格式，二进制协议解析起来更加高效

 // 头部压缩
 // HTTP/1.x会在请求和响应中重复携带不常改变的、冗长的头部数据，给网络带来额外的负担。
 // HTTP/2在客户端和服务器端使用首部表来跟踪和存储之前发送的键值对，对于相同的数据，不再通过每次请求和响应发送。
 // 首部表在HTTP/2的连接存续期内始终存在，由客户端和服务器共同渐进的更新
 // 每个新的首部键值对要么被追加到当前表的末尾要么替换表中之前的值。

 // 服务器推送
 // 服务端可以在发送页面和HTML时主动推送其它资源，而不用等到浏览器解析到相应的位置，发起请求再响应。服务端可以主动推送，客户端有权利选择拒收。如果服务端推送的资源已经被浏览器缓存过，浏览器可以通过发送RST_STREAM帧来拒收。主动推送也遵守同源策略，服务器不会随便推送第三方资源给客户端。

 // 多路复用
 // http1.x中如果想并发多个请求，必须使用多个TCP连接，且浏览器为了控制资源，还会对单个域名有6-8个的TCP连接请求限制。
 // HTTP2中，同域名下的所有通信都在单个连接上完成；单个连接可以承载任意数量的双向数据流。数据流以消息的形式发送，而消息又由一个或多个帧组成，多个帧之间可以乱序发送，因为根据帧首部的流标识可以重新组装。

 // HTTP 缓存
 // 强缓存 Expires Cache-Control
 // Expires：http1.0提出的一个表示资源过期时间的header，描述的是一个绝对时间，由服务器返回，Expires受限于本地时间，如果修改了本地时间，可能会造成缓存失效。
 // Cache-Control: http1.1优先级高于Expires，表示相对时间； Cache-Control: max-age=315360000; public可以被所有用户缓存，包括终端和CDN等中间代理服务器；private只能被终端浏览器缓存，不允许中继缓存服务器进行缓存；no-cache先缓存本地，但是在命中缓存之后必须与服务器验证缓存的新鲜度才能使用；no-store不会产生任何缓存。
 // 在缓存有效期内命中缓存，浏览器会直接读取本地的缓存资源，当缓存过期之后会与服务器进行协商。
 // 协商缓存
 // 当第一次请求时服务器返回的响应中没有Cache-Control和Expires或者Cache-Control和Expires过期异或它的属性设置未no-cache时，那么浏览器第二次请求时就会与服务器进行协商。
 // 如果缓存和服务端资源的最新版本一致，那么无需再次下载该资源，服务端直接返回304 Not Modified状态码；
 // 如果服务器发现浏览器中的缓存已经是旧版本了，那么服务器就会把最新资源的完整内容返回给浏览器，状态码就是200 OK

 // 服务器判断缓存是否新鲜依靠以下两组信息：
 // Last-Modified/If-Modified-Since
 // 客户端首次请求资源时，服务器会把资源的最新修改时间Last-modified通过响应部首发送给客户端，当再次发送请求时，客户端将服务器返回的修改时间放在请求头If-Modified-Since上发送给服务器，服务器再跟服务器上的对应资源进行比对，如果服务器的资源更新，那么返回最新的资源，此时的状态码是200。当服务器资源跟客户端的请求的部首时间一致，证明客户端的资源是最新的，返回304状态码，表示客户端直接使用缓存即可。
 // ETag/If-None-Match
 // ETag的流程跟Last-Modified类似，区别在于ETag是根据资源内容进行hash，生成一个信息摘要，只要资源内容有变化，这个摘要就会发生巨变，通过这个摘要信息比对，即可确定客户端的缓存资源是否是最新，这比Last-Modified的精确度要更高。

 
 
 

 

 
 