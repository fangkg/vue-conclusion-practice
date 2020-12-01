/*
 * @Author: fangkg
 * @Date: 2020-11-30 14:32:37
 * @LastEditTime: 2020-12-01 12:01:31
 * @LastEditors: Please set LastEditors
 * @Description: 问题汇总
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\vue\actualPractice\ali.js
 */



// EventLoop


// 异步编程
// 异步行为是为了优化因计算量大而时间长的操作。如果在等待其它操作完成的同时，及时运行其它指令，系统也能保持稳定，那么这样做就是务实的。
// 同步行为对应内存中顺序执行的处理器指令，每条指令都会严格按照它们出现的顺序来执行，每条指令执行后也能立即获得存储在系统本地的信息。
let x = 3;
x = x + 4;

// promise
// new Promise()实例化期约，创建新期约时需要传入执行器(executor)函数作为参数。
let p = new Promise(() => {});
// 该期约实例处于待定pending状态
console.log('p:', p);
// 期约是一个有状态对象，有3种状态：pending待定，fulfilled解决，rejected拒绝
// 落定settled
// 待定落定为兑现或者拒绝，不能保证期约必然会脱离待定状态。
// 期约用途：抽象地表示一个异步操作；期约封装地异步操作会实际生成某个值，而程序期待期约状态改变时可以访问这个值。
// 期约的状态代表期约是否完成。待定表示尚未开始或者正在执行中；兑现表示已经成功完成；拒绝表示没有成功完成。
// 每个期约只要状态切换为兑现，就会有一个私有地内部值(value)；每个期约只要状态切换为拒绝，就会有一个私有地内部理由(reason)
// 通过执行函数控制期约状态：期约状态是私有的，只能在内部进行控制。内部操作在期约地执行器函数中完成。
// 执行器函数：初始化期约地异步行为；控制状态的最终转换；控制期约状态的转换是通过调用它的两个函数参数(resolve(), reject())实现的。
// 调用resolve()会把状态切换为兑现；调用reject()会把状态切换为拒绝。
// 初始化期约时，执行器函数是同步执行的
new Promise(() => setTimeout(console.log, 0, 'executor'));
setTimeout(console.log, 0, 'Promise Initialized');
// 添加setTimeout可以推迟切换状态
let pro = new Promise((resolve, reject) => setTimeout(resolve, 1000));
console.log('pro:', pro)
// 在console.log打印期约实例的时候，还不会执行超时回调resolve()
setTimeout(console.log, 0, pro);
// 无论resolve()和reject()中哪个被调用，状态都不可撤销
let pp = new Promise((resolve, reject) => {
    resolve();
    reject();
})
setTimeout(console.log, 0, pp);
// 避免期约卡在待定状态，添加一个定时退出功能
let ppp = new Promise((resolve, reject) => {
    // 10秒之后调用reject()
    setTimeout(reject, 10000);
})
setTimeout(console.log, 0, ppp);
setTimeout(console.log, 11000, ppp);
// Promise.resolve()
// 期约并非一开始就必须处于待定状态，然后通过执行器函数才能转换为落定状态。通过调用Promise.resolve()静态方法，可以实例化一个解决的期约。
let p1 = new Promise((resolve, reject) => resolve());
console.log('p1:', p1);
let p2 = Promise.resolve();
console.log('p2:', p2);
// 这个解决的期约的值对应着传给Promise.resolve()的第一个参数。使用这个静态方法可以把任何值都转换为一个期约。
setTimeout(console.log, 0, Promise.resolve());
setTimeout(console.log, 0, Promise.resolve(4));
// 多余参数会被忽略
setTimeout(console.log, 0, Promise.resolve(1, 5, 8));
// 对于静态方法，如果传入的参数本身是一个期约，那么它的行为就类似于一个空包装。Promise.resolve()是一个幂等方法。
// 这个幂等性会保留传入期约的状态
let poo = Promise.resolve(5);
setTimeout(console.log, 0, poo === Promise.resolve(poo));
setTimeout(console.log, 0, poo === Promise.resolve(Promise.resolve(poo)));

let pppp = new Promise(() => {});
setTimeout(console.log, 0, pppp);
setTimeout(console.log, 0, Promise.resolve(pppp));
setTimeout(console.log, 0, pppp === Promise.resolve(pppp));
// Promise.resolve()静态方法可以包装任何非期约值，包括错误对象，并将其转换为解决的期约
// let per = Promise.resolve(new Error('foo'));
// setTimeout(console.log, 0, per);

// Promise.reject()
// Promise.reject()会实例化一个拒绝的期约并抛出一个异步错误，这个错误不能通过try/catch捕获，只能通过拒绝处理程序捕获
let ee = new Promise((resolve, reject) => reject());
let eee = Promise.reject();
console.log('ee:', ee === eee);
// 拒绝的理由是传给Promise.reject()的第一个参数
let lll = Promise.reject(34);
setTimeout(console.log, 0, lll);
lll.then(null, (e) => setTimeout(console.log, 0, e));
// 传入一个期约对象
setTimeout(console.log, 0, Promise.reject(Promise.resolve()));

// 同步、异步二元性
// 抛出并捕获了错误
try {
    throw new Error('fooooo');
} catch(e) {
    console.log('e:', e)
}
// 抛出错误没有捕获到
try {
    Promise.reject(new Error('barrrr'));
} catch(e) {
    console.log('barE:', e);
}

// 实现Thenable接口
// 任何对象都有一个then()方法，这个方法被认为实现了Thenable接口
// Promise.prototype.then()为期约实例添加处理程序的主要方法。这个then()方法接受最多的两个参数:onResolved处理程序和onRejected处理程序。
function onResolved(id) {
    setTimeout(console.log, 0, id, 'resolved');
}
function onRejected(id) {
    setTimeout(console.log, 0, id, 'rejected');
}
let paa = new Promise((resolve, reject) => setTimeout(resolve, 3000));
let pbb = new Promise((resolve, reject) => setTimeout(reject, 3000));
paa.then(() => onResolved('paa'), () => onRejected('paa'));
pbb.then(() => onResolved('pbb'), () => onRejected('pbb'));

// Promise.resolve() 和 Promise.reject()在被调用时会接收解决值和拒绝的理由
let llpp = new Promise((resolve, reject) => resolve('ffff'));
llpp.then((value) => console.log(value));
let lsss = new Promise((resolve, reject) => reject('gggg'));
lsss.catch((reason) => console.log(reason));

// 通过throw()关键字抛出的错误，JavaScript运行时的错误处理机制会停止执行抛出错误之后的任何指令。
// 在期约中Promise.reject(Error('foo'))抛出错误时，错误是从消息队列中异步抛出，并不会阻止运行时继续执行同步指令。

// 期约连锁
// 把期约逐个串联起来，每个期约实例的方法(then(), catch(), finally())都会返回一个新的期约对象。这个新的期约又有自己的实例方法。
let ppssss = new Promise((resolve, reject) => {
    console.log('first');
    resolve();
})
ppssss.then(() => console.log('second')).then(() => console.log('third')).then(() => console.log('forth'));
// 这个实现最终执行了一连串同步任务。这种方式执行的任务没有那么有用，分别使用4个同步函数也可以做到。

// 执行异步任务，让每个执行器都返回一个期约实例。这样可以让每个后续期约都等待之前的期约，就是串行化异步任务。
let ptt = new Promise((resolve, reject) => {
    console.log('p1 executor');
    setTimeout(resolve, 1000);
});
ptt.then(() => new Promise((resolve, reject) => {
    console.log('p2 executor');
    setTimeout(resolve, 1000);
})).then(() => new Promise((resolve, reject) => {
    console.log('p3 executor');
    setTimeout(resolve, 1000);
})).then(() => new Promise((resolve, reject) => {
    console.log('p4 executor');
    setTimeout(resolve, 1000);
}))

// 把生成期约的代码提到一个工厂函数中
function delaydResolve(str) {
    return new Promise((resolve, reject) => {
        console.log('str:', str);
        setTimeout(resolve, 1000);
    })
}
delaydResolve('ppp1').then(() => delaydResolve('ppp2')).then(() => delaydResolve('ppp3')).then(() => delaydResolve('ppp4'));
// 每个后续处理程序都会等待前一个期约解决，然后实例化一个新的期约返回。这种结构将异步任务串行化。

// 期约的处理程序是按照它们添加的顺序执行。先添加到消息队列，然后才逐个执行，因此构成了层序遍历。
// 将多个期约实例组合成一个期约的静态方法：Promise.all()和Promise.race()
// Promise.all()静态方法创建的期约会在一组期约全部解决之后再解决。接收一个可迭代对象，返回一个新期约
let popo = Promise.all([Promise.resolve(), Promise.resolve()]);
console.log('popo:', popo);
// 可迭代对象中的元素会通过Promise.resolve()转换为期约
let pppsss = Promise.all([3, 5]);
console.log('pppsss:', pppsss);
// 空的可迭代对象等价于Promise.resolve();
let pqqq = Promise.all([]);
console.log('pqqq:', pqqq);
// 无效语法
// let prr = Promise.all();
// 合成期约之后在每个期约都解决之后才解决
// 如果有一个包含的期约待定，则合成的期约也会待定；如果有一个包含的期约拒绝，则合成的期约也会拒绝；

// 如果所有期约都成功解决，则合成期约的解决值就是所有包含期约解决值的数组，按照迭代器顺序。
let parr = Promise.all([
    Promise.resolve(4),
    Promise.resolve(),
    Promise.resolve(8)
])
parr.then((values) => setTimeout(console.log, 0, values));

// 如果有期约拒绝，则第一个拒绝的期约会将自己的理由作为合成期约的拒绝理由。之后再拒绝的期约不会影响最终期约的拒绝理由。不过，这并不影响所有包含
// 期约正常的拒绝操作。合成的期约会静默处理所有包含期约的拒绝操作。
let peArr = Promise.all([
    Promise.reject(3),
    new Promise((resolve, reject) => setTimeout(reject, 1000))
]);
peArr.catch((reason) => setTimeout(console.log, 0, reason));

// Promise.race()
// 返回一个包装期约，是一组集合中最先解决或者拒绝的期约的镜像。接收一个可迭代对象，返回一个新的期约。
let prArr = Promise.race([
    Promise.resolve(),
    Promise.resolve()
])
let prArr1 = Promise.race([2, 7]);
let prArr2 = Promise.race([]);
console.log(prArr, prArr1, prArr2);

// Promise.race()不会对解决或者拒绝的期约区别对待。无论是解决还是拒绝，只要是第一个落定的期约，Promise.race()就会包装其解决值或拒绝理由并返回新期约。
// 解决/拒绝先发生，超时后的拒绝/解决会被忽略
let pqwe = Promise.race([
    Promise.resolve(388888888888),
    new Promise((resolve, reject) => setTimeout(reject, 1000))
])
setTimeout(console.log, 0, pqwe);

let poiu = Promise.race([
    Promise.reject(688888888888),
    new Promise((resolve, reject) => setTimeout(resolve, 1000))
])
setTimeout(console.log, 0, poiu);

// 迭代顺序决定了落定顺序
let pty = Promise.race([
    Promise.resolve(44888888889999999999888),
    Promise.resolve(88),
    Promise.resolve(40)
]);
setTimeout(console.log, 0, pty);
// 如果有一个期约拒绝，只要它是第一个落定的，就会成为拒绝合成期约的理由。之后再拒绝的期约不会影响最终期约的拒绝理由。合成期约会静默处理所有包含期约的拒绝操作。
let pui = Promise.race([
    Promise.reject(4000000000000),
    new Promise((resolve, reject) => setTimeout(reject, 1000))
]);
pui.catch((reason) => setTimeout(console.log, 0, reason));
// 虽然只有第一个期约的拒绝理由会进入拒绝处理程序，第二个期约的拒绝也会被静默处理，不会有错误跑掉。

// 后续期约使用之前期约的返回值来串联期约是期约的基本功能。
// 串行期约合成
// 异步产生值并将其传给处理程序
function addTwo(x) {
    return x + 2;
}
function addThree(x) {
    return x + 3;
}
function addFive(x) {
    return x + 5;
}
function addTen(x) {
    return Promise.resolve(x).then(x+2).then(x+3).then(x+5);
}
console.log('addTen:', addTen(8));
addTen(8).then(console.log);

function compose(...fns) {
    return (x) => fns.reduce((promise, fn) => promise.then(fn), Promise.resolve(x));
}

let asum = compose(addTwo, addThree, addFive);
asum(7).then(console.log);
// async await
// generator()
// for of 

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
// var xhr = new XMLHttpRequest();
// xhr.withCredentials = true;
// 服务端返回
// Access-Control-Allow-Credentials: true时，浏览器才会将响应结果传递给客户端程序。
// Access-Control-Allow-Origin必须指定请求源的域名，否则响应失败。

// postMessage
// window.postMessage(message, targetOrigin)
// html5新引入的特性，使用它来向其它的window对象发送消息，无论这个window对象是属于同源或者不同源。