/*
 * @Author: fangkg
 * @Date: 2020-12-01 14:40:06
 * @LastEditTime: 2020-12-01 14:48:05
 * @LastEditors: Please set LastEditors
 * @Description: await后面是一个期约
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\vue\actualPractice\testAsync.js
 */

async function foo() {
    console.log(2);
    // await关键字暂停执行，向消息队列中添加一个期约在落定之后执行的任务；
    console.log(await Promise.resolve(8));
    console.log(9);
}

async function bar() {
    console.log(4);
    // await关键字暂停执行，为立即可用的值6向消息队列中添加一个任务
    console.log(await 6);
    console.log(7);
}

console.log(1);
foo();
console.log(3);
bar();
console.log(5);
// 顶级线程执行完毕，JavaScript运行时从消息队列中取出解决await期约的处理程序，并将解决值8提供给它。