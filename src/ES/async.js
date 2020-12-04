/*
 * @Author: fangkg
 * @Date: 2020-12-03 09:28:49
 * @LastEditTime: 2020-12-03 11:09:37
 * @LastEditors: Please set LastEditors
 * @Description: async函数，使得异步操作变得更方便
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\ES\async.js
 */

const { _ } = require("core-js");

// async函数就是将Generator函数的星号(*)替换成async，将yield替换成await。
// async函数对Generator函数的改进：
// async函数内置执行器，Generator函数的执行必须靠执行器。
// async和await比起星号和yield语义更清楚。async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。
// async函数的返回值是Promise对象，比Generator函数的返回值是Iterator对象方便，可以用then()方法指定下一步的操作。
// async函数可以看作多个异步任务包装成一个Promise对象，而await命令就是内部的then()命令的语法糖。


// 基本用法：async函数返回一个Promise对象，可以使用then()方法添加回调函数。当函数执行的时候，一旦遇到await就会先返回，等到异步操作完成再接着执行函数体后面的语句。
// async function getStockPriceByName(name) {
//     const symbol = await getStockSymbol(name);
//     const stockPrice = await getStockPrice(symbol);
//     return stockPrice;
// }
// getStockPriceByName('jack').then(function(result) {
//     console.log(result);
// })

function ttout(ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms);
    })
}
async function asyncPrint(value, ms) {
    await ttout(ms);
    console.log(value);
}
// 指定50毫秒之后输出一个值
asyncPrint('hello', 50);

async function ttt(ms) {
    await new Promise((resolve) => {
        setTimeout(resolve, ms);
    })
}
async function ppp(value, ms) {
    await ttt(ms);
    console.log('val:', value);
}
ppp('hhh', 50);

// async函数多种使用方式
// 函数声明
async function fe() {}
console.log('fe:', fe);
// 函数表达式
const fee = async function() {}
console.log('fee:', fee);
// 对象的方法
let ffe = { async ffee() {} }
ffe.ffee().then();


// async函数返回一个Promise对象，async函数内部return语句返回的值会称为then()方法回调函数的参数。
async function ftt() {
    return 'hel wor'
}
ftt().then(v => console.log('v:', v));

// async函数内部抛出的错误会导致返回的Promise对象变为reject状态。抛出的错误对象会被catch方法回调函数接收。
async function frr() {
    throw new Error('error')
}
frr().then(v => {
    console.log('v:', v);
}, e => {
    console.log('e:', e);
})

// Promise对象的状态变化
// async函数返回的Promise对象，必须等到内部所有await命令后面的Promise对象执行完，才会发生状态改变，除非遇到return语句或者抛出错误。只有async函数内部的异步操作执行完，
// 才会执行then()方法指定的回调函数。

// await命令，await命令后面是一个Promise对象，返回该对象的结果。如果不是Promise对象，就直接返回对应的值。
async function fw() {
    return await 123;
}
fw().then(v => {
    console.log('fw:', v);
})

// 定义了then方法
class Sleep {
    constructor(timeout) {
        this.timeout = timeout
    }
    then(resolve, reject) {
        const startTime = Date.now();
        setTimeout(() => resolve(Date.now - startTime), this.timeout)
    }
}
(async () => {
    // await命令后面是一个thenable对象，await将其等同于Promise对象
    const sleepTime = await new Sleep(1000);
    console.log('sleepTime:', sleepTime);
})()

// JavaScript休眠语法，借助await命令可以让程序停顿指定的时间
function sss(interval) {
    return new Promise(resolve => {
        setTimeout(resolve, interval);
    })
}
async function inasync() {
    for(let i = 1; i <= 5; i++) {
        console.log('i:', i);
        await sss(1000);
    }
}
inasync();

async function fy() {
    // await()命令后面的Promise对象变为reject状态，则reject的参数会被catch方法的回调函数接收到。
    await Promise.reject('reject')
}
fy().then(v => {
    console.log('fy:', v);
}).catch(e => {
    console.log('fye:', e);
})

// await语句后面的Promise对象变为reject状态，那么整个async函数都会中断执行。
async function fi() {
    await Promise.reject('fi出错了');
    await Promise.resolve('不会执行');
}
fi();

// 即使前一个异步操作失败，也不要中断后面的异步操作。await放在try...catch解构里面
async function fo() {
    try {
        await Promise.reject('中断')
    } catch(e) {
        console.log('fo:', e);
    }
    
    return await Promise.resolve('未中断')
}
fo().then(v => {
    console.log('foThen:', v);
})

// await后面的Promise对象再跟一个catch方法处理前面可能出现的错误
async function fq() {
    await Promise.reject('fq出错了').catch(e => {
        console.log('fqe:', e);
    })

    return await Promise.resolve('fqe world');
}
fq().then(v => {
    console.log('fqv:', v);
})

// 错误处理，await后面的异步操作出错，等于async函数返回的Promise对象被reject。
// async函数few执行后，await后面的Promise对象会抛出一个错误对象导致catch方法的回调函数被调用，它的参数就是抛出的错误对象。
async function few() {
    await new Promise(function (resolve, reject) {
        throw new Error('few出错了')
    })
}
few().then(v => {
    console.log('few:', v);
}).catch(e => {
    console.log('fewe:', e);
})

async function fa() {
    try {
        await new Promise(function(resolve, reject) {
            throw new Error('fa出错了')
        })
    } catch(e) {
        console.log('faeeee:', e);
    }
    return await('hello fa');
}
fa().then(v => {
    console.log('fav:', v);
}).catch(e => {
    console.log('fae:', e);
})

// try...catch实现多次重复尝试
// await操作成功，就会使用break语句退出循环，如果失败会被catch语句捕获，然后进入下一轮循环。
async function ttest() {
    let i;
    for (i = 0; i < 4; ++i) {
        try {
            await fetch('http://www.baidu.com');
            break;
        } catch(e) {
            console.log('tteste:', e);
        }
    }
    console.log('次数：', i);
}
ttest();

// 使用注意点
// await命令后面的Promise对象运行结果可能是rejected，最好把await命令放在try...catch代码块中
// await命令后面的异步操作，如果不存在继承关系最好让它们同时触发；
// let [foo, bar] = await Promise.all([getFoo(), getBar()]);
// let fooPromise = getFoo();
// let barPromise = getBar();
// let foo = await fooPromise;
// let bar = await barPromise;
// await命令只能用在async函数之中，如果用在普通函数中会报错。
// forEach方法的参数改成async函数也有问题，可能forEach中的参数并发执行不是继发执行。改为for循环
async function dbFunc(db) {
    let docs = [{}, {}, {}];
    for (let doc of docs) {
        await db.post(doc);
    }
}
console.log('dbFunc:', dbFunc);
// 使用数组reduce()方法
async function ddfn(db) {
    let docs = [{}, {}, {}];
    await docs.reduce(async (_, doc) => {
        await _;
        await db.post(doc);
    }, undefined);
}
console.log('ddfn:', ddfn);

// 并发执行使用Promise.all
async function fg(db) {
    let docs = [{}, {}, {}];
    let promises = docs.map(doc => db.post(doc));
    let res = await Promise.all(promises);
    console.log('res:', res);
}
console.log('fg:', fg);

async function dbfff(db) {
    let docs = [{}, {}, {}];
    let promises = docs.map(doc => db.psot(doc));

    let res = [];
    for (let promise of promises) {
        res.push(await promise);
    }
    console.log('res:', res);
}
console.log('dbfff:', dbfff);