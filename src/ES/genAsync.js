/*
 * @Author: fangkg
 * @Date: 2020-12-02 17:57:33
 * @LastEditTime: 2020-12-03 09:15:37
 * @LastEditors: Please set LastEditors
 * @Description: Generator函数的异步应用
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\ES\genAsync.js
 */

// 异步：一个任务不是连续完成的，该任务被人为的分成两段，先执行第一段，然后转而执行其它任务，等做好了准备，再回过头来执行第二段。
// 例子：有一个任务读取文件进行处理，任务的第一段是向操作系统发出请求，要求读取文件。然后，程序执行其它任务，等到操作系统返回文件，再接着执行任务的第二段(处理文件)。
// 同步：连续执行的任务就叫同步。连续执行，不能插入其它任务，所以操作系统从磁盘读取文件这段时间，程序只能干等着。

// ES6之前异步编程：回调函数，事件监听，发布/订阅，Promise对象

// 回调函数
// 把任务的第二段单独写在一个函数里面，等到重新执行这个任务的时候，就直接调用这个函数。callback
// node约定回调函数的第一个参数必须是错误对象err，因为执行分成两段，第一段执行完成后，任务所在的上下文环境就已经结束了。在这之后抛出的错误，原来的上下文环境已经
// 无法捕捉，只能作为参数传入第二段。


// Promise
// 回调函数本身并没有问题，它的问题在于出现多个回调函数嵌套。多个异步操作形成了强耦合，形成回调地狱。callback hell
// Promise允许回调函数的嵌套，改成链式调用。
// Promise的最大问题是代码冗余，原来的任务被Promise包装了一下，不管什么操作，一眼看上去都是一堆then，语义变得很不清楚。

// Generator函数
// yield命令，是异步两个阶段的分界线，遇到yield命令就暂停，等到执行权返回，再从暂停的地方继续往后执行。
// 整个Generator函数就是一个封装的异步任务，或者说是异步任务的容器。异步任务需要暂停的地方都用yield语句注明。
function* gen(x) {
    let y = yield x + 2;
    return y;
}
// 调用Generator函数会返回一个内部指针(遍历器)g
let g = gen();
// 调用遍历器g的next()会移动内部指针
g.next();
// next()方法的作用是分阶段执行Generator()函数，每调用next()会返回一个对象，表示当前阶段的信息(value属性和done属性)。value表示yield语句后面表达式的值，表示当前阶段的值；done属性是一个布尔值，表示Generator函数是否执行完毕，即是否还有下一阶段。

// Generator函数的数据交换和错误处理
// Generator函数可以暂停执行和恢复执行，这时它能封装异步任务的根本原因。
// 函数体内外的数据交换和错误处理机制。
// next()返回值的value属性是Generator函数向外输出数据；next()还可以接受参数向Generator函数体内输入数据。
let gg = gen(1);
// 第一次调用next()只是启动遍历器对象
console.log(gg.next());
// 参数5可以传入Generator函数，作为上一个阶段异步任务的返回结果，被函数体内的变量y接收。因此这一步的value属性，返回的就是2.
console.log('second:', gg.next(5));

// Generator函数内部可以部署错误处理代码，捕获函数体外抛出的错误
function* ggen(x) {
    let y;
    try {
        y = yield x + 2;
    } catch(e) {
        console.log('e:', e);
    }
    return y;
}
let gge = ggen(1);
gge.next();
// 使用指针对象的throw()方法抛出的错误可以被函数体内的try...catch代码块捕获。
gge.throw('出错了');