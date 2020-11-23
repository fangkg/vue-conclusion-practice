/*
 * @Author: fangkg
 * @Date: 2020-11-23 11:54:45
 * @LastEditTime: 2020-11-23 12:53:29
 * @LastEditors: Please set LastEditors
 * @Description: 浏览器工作原理
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\browser\index.js
 */

 // 加载页面和渲染过程
 // 加载过程：浏览器根据DNS服务器得到域名IP地址，向这个IP的计器发送HTTP请求，服务器收到处理并返回HTTP请求，浏览器得到返回内容即HTML
 // 渲染过程：根据HTML结构生成DOM树，根据CSS生成CSSOM，将DOM和CSSOM整合形成RenderTree，根据RenderTree开始渲染和展示，遇到<script></script>时会执行并阻塞渲染
 // 解析过程中如果遇到<link href="">和<script src=""></script>这种外链加载CSS和JS标签，浏览器会异步下载，下载过程中和上文中下载HTML的流程一样。
 // 浏览器将CSS生成CSSOM，再将DOM和CSSOM整合成RenderTree，然后针对RenderTree即可进行渲染。有DOM结构、有样式就满足渲染条件。
 // Css放在HTML头部，这样会让浏览器尽早拿到CSS尽早生成CSSOM，然后在解析HTML之后可一次性生成最终的RenderTree，渲染一次即可。如果把CSS放在HTML底部，会出现渲染卡顿的情况，影响性能和体验。
 // 渲染过程中，如果遇到<script></script>就停止渲染，执行JS代码。因为浏览器渲染和JS执行共用一个线程，而且这里必须时单线程，多线程会产生渲染DOM冲突。


 // 性能优化
 // 原则：以更好的用户体验为准。多使用内存、缓存或其它方法。减少CPU和GPU的计算，更快展现。
 // 方向：减少页面体积，提升网络加载；优化页面渲染。
 // 减少页面体积，提升网络加载。静态资源的压缩合并(JS代码压缩合并、CSS代码压缩合并、雪碧图)；静态资源缓存；使用CDN让资源加载更快。
 // 优化页面渲染：CSS放前面，JS放后面；懒加载(图片懒加载、下拉加载更多)；减少DOM查询，对DOM查询做缓存；减少DOM操作，多个操作尽量合并在一起DocumentFragment；事件节流；尽早执行操作DOMContentLoaded；使用SSR后端渲染，数据直接输出到HTML中，减少浏览器使用JS模板渲染页面HTML的时间。
 
 // 合并DOM插入
 var listNode = document.getElementById('list');
 var frag = document.createDocumentFragment();
 var x,li;
 for(x = 0; x < 10; x++) {
     li = document.createElement('li');
     li.innerHTML = 'list item' + x;
     // 先放在frag中
     frag.appendChild(li);
}
 // 最后一次性插入到DOM结构中
 listNode.appendChild(frag);

 // 事件节流，文字改变时触发一个change事件，通过keyup来监听
 var textArea = document.getElementById('text');
 var timeoutId
 textArea.addEventListener('keyup', function() {
    if(timeoutId) {
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(function() {
        // 触发change事件
    }, 100)
 })

 // 尽早执行
 window.addEventListener('load', function() {
     // 页面全部资源加载完才会执行，包括图片、视频等。
 })

 window.addEventListener('DOMContentLoaded', function() {
     // DOM渲染完成即可执行，此时图片、视频还可能没有加载完
 })

 // web安全
 // SQL注入 系统登录界面，输入用户名和密码，提交之后，后端直接拿到数据就拼接成SQL语句去查询数据库。如果在输入时进行了恶意SQL拼装，那么最后生成的SQL就会有问题。
 // XSS Cross Site Scripting跨站脚本攻击，黑客通过某种方式将一段特定的JS代码隐蔽的输入进去。然后别人再看这篇文章或者评论的时候，之前注入的这段JS代码就执行了。JS代码一旦执行就不可控制，因为它跟网页原有的JS有同样的权限。例如可以获取server端数据、cookie信息。
 


