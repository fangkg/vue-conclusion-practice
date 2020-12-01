/*
 * @Author: fangkg
 * @Date: 2020-12-01 12:25:38
 * @LastEditTime: 2020-12-01 14:36:52
 * @LastEditors: Please set LastEditors
 * @Description: 异步函数
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\vue\actualPractice\async.js
 */

// async/await，增强了JavaScript，让以同步的方式写的代码异步执行。
let p = new Promise(() => setTimeout(console.log, 1000, 3));
p.then( x => {
    console.log(x);
});
// 这个期约在1000毫秒之后解决值为数字3，如果程序中的其它代码要在这个值可用时访问它，需要塞到期约处理程序中。

// async关键字用于声明异步函数，可以用在函数声明、函数表达式、箭头函数、方法上
async function foo() {}
console.log('foo:', foo);

let bar = async function() {}
console.log('bar:', bar);

let baz = async () => {};
console.log('baz:', baz);

class Qux {
    async qux() {}
}
console.log('Qux:', Qux);
// 使用async关键字可以让函数具有异步特征，总体上其代码仍然是同步求值。

async function ff() {
    console.log(1);
}

ff();
console.log(2);

// 异步函数如果使用return关键字返回了值，这个值会被Promise.resolve()包装成一个期约对象。没有return则返回undefined。在函数外部调用这个函数可以得到它返回的期约。
async function fff() {
    console.log(4);
    return 44;
}
// 给返回的期约添加一个解决处理程序
fff().then(console.log);
console.log(5);

// 异步函数直接返回一个期约对象
async function ffff() {
    console.log('ffff');
    return Promise.resolve('f555fff');
}
// 给返回的期约添加一个解决处理程序
ffff().then(console.log);
console.log('333');

// 异步函数的返回值期待一个实现thenable接口的对象，但是常规值也可以。
// 如果返回的是实现thenable接口的对象，则这个对象可以由提供给then()的处理程序解包。如果不是，则返回值被当作已经解决的期约。
// 返回一个原始值
async function fofo() {
    return 'fofo';
}
fofo().then(console.log);
// 返回一个没有实现thenable接口的对象
async function bara() {
    return ['bara'];
}
bara().then(console.log);
// 返回一个实现了thenable接口的非期约对象
async function bazz() {
    const thenable = {
        then(callback) {
            callback('bazz');
        }
    }
    return thenable;
}
bazz().then(console.log);
// 返回一个期约
async function quxx() {
    return Promise.resolve('quxx');
}
quxx().then(console.log);
// 在异步函数中抛出错误会返回拒绝的期约
async function fofofo() {
    console.log('fofofo');
    throw 3333;
}
fofofo().catch(console.log);
console.log('fofo3');

// 拒绝期约的错误不会被异步函数捕获
async function ffoo() {
    console.log('ffoo');
    Promise.reject(33333);
}
ffoo().catch(console.log);

// await，异步函数主要针对不会马上完成的任务，自然需要一种暂停和恢复执行的能力。使用await关键字可以暂停异步函数代码的执行，等待期约解决。
let prr = new Promise((resolve, reject) => setTimeout(resolve, 1000, 3));
prr.then(x => console.log(x));
// 使用async/await
async function frfr() {
    let p = new Promise((resolve, reject) => setTimeout(resolve, 1000, 'await'));
    console.log('p:', await p);
}
frfr();
// await关键字会暂停执行异步函数后面的代码，让出JavaScript运行时的执行线程。这个行为与生成器函数的yield关键字是一样的。await关键字同样是尝试解包对象的值，然后将这个值传给
// 表达式，在异步恢复异步函数的执行。

// 异步打印fww
async function fww() {
    console.log(await Promise.resolve('fww'));
}
fww();

// 异步打印bar
async function bba() {
    return await Promise.resolve('bba');
}
bba().then(console.log);
// 1000毫秒后异步打印bbaz
async function bbaz() {
    await new Promise((resolve, reject) => setTimeout(resolve, 1000));
    console.log('bbaz');
}
bbaz();

// 立即调用的异步函数表达式
(async function() {
    console.log(await Promise.resolve(55))
})();

// 停止、恢复执行
// console.log('***************************************');
setTimeout(console.log, 1000, '************************************');

async function fe() {
    console.log(await Promise.resolve('fe'));
}
async function be() {
    console.log(await 'be');
}
async function ze() {
    console.log('ze');
}

fe();
be();
ze();

// ze fe be
// async/await中真正起作用的是await。async关键字只是一个标识符。异步函数如果不包含await关键字，跟普通函数没什么区别。
// JavaScript运行时在碰到await关键字时，会记录在哪里暂停执行。等到await右边的值可用了，JavaScript运行时会向消息队列中推送一个任务，这个任务会恢复异步函数的执行。
// 即使await后面跟着一个立即可用的值，函数的其余部分也会被异步求值。