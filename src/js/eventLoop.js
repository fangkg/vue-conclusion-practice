// 事件循环机制
// 宏任务：整体代码script,setTimout,setInterval,I/O操作,UI渲染等
// 微任务：Promise.then
// new Promise里面的内容是同步执行的，像new Promise(resolve(console.log('1')))同步执行，resolve之后.then进入微任务队列。
// 先执行同步代码，然后将宏任务放进宏任务队列，宏任务队列中有微任务就将其放进微任务队列，当宏任务队列执行完就检查微任务队列，微任务队列为空了就开始下一轮宏任务的执行，往复循环。
// 在浏览器中，事件循环的顺序决定js代码的执行顺序

console.log(1);
setTimeout(() => {
    console.log(2);
    new Promise((resolve) => {
        console.log(3);
        resolve();
    }).then(() => {
        console.log(4);
    })
})

new Promise((resolve) => {
    console.log(5);
    resolve();
}).then(() => {
    console.log(6);
})

setTimeout(() => {
    console.log(7);
    new Promise((resolve) => {
        console.log(8);
        resolve();
    }).then(() => {
        console.log(9)
    })
})

console.log(10)

console.log('--------------------------------------')
// 如果遇到async/await，可以将await理解成Promise.then
console.log('start')
async function async1() {
    await async2();
    console.log('async1')
}

async function async2() {
    console.log('async2');
}

async1();

setTimeout(() => {
    console.log('setTimeout');
}, 0)

new Promise(resolve => {
    console.log('promise');
    resolve();
}).then(() => {
    console.log('then1');
}).then(() => {
    console.log('then2');
})

console.log('end');