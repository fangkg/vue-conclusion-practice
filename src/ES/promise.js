/*
 * @Author: fangkg
 * @Date: 2020-12-02 11:27:57
 * @LastEditTime: 2020-12-02 15:21:22
 * @LastEditors: Please set LastEditors
 * @Description: Promise容器
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\ES\promise.js
 */

// Promise就是一个容器，里面保存着某个未来才会结束的事件的结果(通常是一个异步操作)。Promise是一个对象，可以获取异步操作的消息。
// 对象的状态不受外界影响。pending进行中，fulfilled已成功，rejected已失败。只有异步操作的结果可以决定当前是哪一种状态，任何其它操作都无法改变这个状态。
// 从pending变为fulfilled和从pending变为rejected，只要这两中国情况发生，状态就凝固了。这时称为resolved已定型。如果状态改变已经发生了，再对Promise对象添加回调函数，也会立即得到这个结果。
// promise对象可以将异步操作以同步的操作流程表达出来，避免了层层嵌套的回调函数。

// 缺点；
// 无法取消Promise，一旦新建它就会立即执行，无法中途取消；如果不设置回调函数，Promise内部抛出错误，不会反映到外部；当处于pending状态时，无法得知目前进展到哪一个阶段。
// const pro = new Promise(function(resolve, reject) {
//     // 异步操作成功
//     if (true) {
//         resolve(value);
//     } else {
//         reject(error);
//     }
// })
// Promise构造函数接受一个函数作为参数，该函数的两个参数分别是resolve和reject。
// resolve将Promise对象的状态从未完成变为成功，在异步操作成功时调用，并将异步操作的结果作为参数传递出去；
// reject将Promise对象的状态从未完成变为失败，在异步操作失败时调用，并将异步操作报出的错误作为参数传递出去。

// Promise实例生成后，可以用then()方法分别指定resolved状态和rejected状态的回调
function timeOut(ms) {
    // 返回一个Promise实例
    return new Promise((resolve, reject) => {
        // 过了指定时间ms以后，Promise实例的状态变为resolved就会触发then方法绑定的回调函数
        setTimeout(resolve, ms, 'done');
    })
}
timeOut(100).then(value => {
    console.log('value:', value);
})

let ppo = new Promise(function(resolve, reject) {
    // Promise实例新建后立即执行
    console.log('promise');
    resolve();
})
// then()方法指定回调函数，将在当前脚本所有同步任务执行完才会执行，所以resolved最后输出
ppo.then(function() {
    console.log('resolved');
})
console.log('ppo');

// 异步加载图片
// function loadImageAsync(url) {
//     return new Promise(function(resolve, reject) {
//         const img = new Image();
//         // 图片加载成功
//         img.onload = function() {
//             resolve(img);
//         }
//         // 图片加载失败
//         img.onerror = function() {
//             reject(new Error('Could not load image at' + url));
//         }

//         img.src = url;
//     })
// }

// let url = 'https://image.baidu.com/search/detail?ct=503316480&z=0&ipn=d&word=v-trim&step_word=&hs=0&pn=1&spn=0&di=11800&pi=0&rn=1&tn=baiduimagedetail&is=0%2C0&istype=0&ie=utf-8&oe=utf-8&in=&cl=2&lm=-1&st=undefined&cs=415075436%2C722031994&os=3597524625%2C487445270&simid=0%2C0&adpicid=0&lpn=0&ln=277&fr=&fmq=1606883226880_R&fm=&ic=undefined&s=undefined&hd=undefined&latest=undefined&copyright=undefined&se=&sme=&tab=0&width=undefined&height=undefined&face=undefined&ist=&jit=&cg=&bdtype=11&oriquery=&objurl=http%3A%2F%2Fwww.ucbug.com%2Fuploads%2F2020%2F1109%2F2011095fa8b5e182fd1.jpeg&fromurl=ippr_z2C%24qAzdH3FAzdH3Fooo_z%26e3B7vk72_z%26e3Bv54AzdH3Ff5upAzdH3F8cd8nb_z%26e3Bip4s&gsm=2&rpstart=0&rpnum=0&islist=&querylist=&force=undefined'
// loadImageAsync(url);

// Promise对象实现Ajax操作
const getJSON = function(url) {
    const promise = new Promise(function(resolve, reject) {
        const handler = function() {
            if (this.readyState !== 4) {
                return;
            }
            if (this.status === 200) {
                resolve(this.response);
            } else {
                reject(new Error(this.statusText));
            }
        };
        const client = new XMLHttpRequest();
        client.open("GET", url);
        client.onreadystatechange = handler;
        client.responseType = "json";
        client.setRequestHeader("Accept", "application/json");
        client.send();
    })

    return promise;
}
console.log('getJSON:', getJSON);


const pp1 = new Promise(function(resolve, reject) {
    // 3秒之后变为rejected
    setTimeout(() => reject(new Error('fail')), 3000)
})
// pp2返回的是另一个Promise导致p2自己的状态无效了，由pp1的状态决定pp2的状态
const pp2 = new Promise(function(resolve, reject) {
    // 一秒之后改变，resolve()返回pp1
    setTimeout(() => resolve(pp1), 1000);
})
// then()语句都变成针对pp1。又过了两秒，当pp1变为rejected时导致catch()方法指定的回调函数。
pp2.then(result => {
    console.log('result:', result);
}).catch(error => {
    console.log('error:', error);
})

new Promise((resolve, reject) => {
    // 调用resolve(1)之后，后面的console.log(2)还是会执行，并且会首先打印出来。因为立即resolved的Promise是在本轮事件循环的末尾执行，总是晚于本轮循环的同步任务。
    resolve(1);
    console.log(3);
}).then(r => {
    console.log('r:', r);
})

new Promise((resolve, reject) => {
    return resolve(3);
    // return后面的代码不会继续执行
    console.log('4');
})

// Promise.prototype.then()
// 为Promise实例添加状态改变时的回调函数，then(resolved状态的回调函数，rejected状态的回调函数)
// then()返回一个新的Promise实例，可以采用链式写法，依次指定回调函数，第一个回调函数完成之后，会将结果作为参数传入第二个回调函数。
// 采用链式then()可以指定一组按照次序调用的回调函数，前一个回调函数可能返回的还是一个Promise对象(即有异步操作),这时后一个回调函数就会等待该Promise对象的状态发生变化才会被调用

// Promise.prototype.catch()
// 指定发生错误时的回调函数
const per = new Promise(function(resolve, reject) {
    // promise抛出一个错误，会被catch()方法指定的回调函数捕获
    throw new Error('test');
})
per.catch(function(error) {
    console.log('error:', error);
})
const prr = new Promise(function(resolve, reject) {
    try {
        throw new Error('prr');
    } catch(e) {
        reject(e);
    }
})
prr.catch(function(error) {
    console.log('prr:', error);
})

const pre =  new Promise(function(resolve, reject) {
    reject(new Error('pre'));
})
pre.catch(function(error) {
    console.log('pre:', error);
})
// reject()方法的作用等同于抛出错误。

const pm = new Promise(function(resolve, reject) {
    resolve('ok');
    throw new Error('no');
})
pm.then(function(value) {
    console.log('ok:', value);
}).catch(function(error) {
    console.log('no:', error);
})
// Promise在resolve语句后面再抛出错误不会被捕获，等于没有抛出。Promise的状态一旦改变就永久保持该状态，不会再变。

// Promise对象的错误具有冒泡性质，会一直向后传递直到被捕获为止。

const someAsyncThing = function() {
    return new Promise(function(resolve, reject) {
        // 浏览器运行到这一行会打印出ReferenceError：x is not defined。但是不会退出进程、终止脚本执行。
        // 2秒之后还是会输出123
        // Promise内部的错误不会影响到Promise外部的代码
        resolve(x + 2);
    })
}
someAsyncThing().then(function() {
    console.log('everything is great');
})
setTimeout(() => {
    console.log(123)
}, 2000);

// Promise对象后面要跟catch()可以处理Promise内部发生的错误，catch()方法返回的还是一个Promise对象，因此后面还可以接着调用then()方法
const sat = function() {
    return new Promise(function(resolve, reject) {
        resolve(x + 3);
    })
}
sat().catch(function(error) {
    console.log('error:', error);
}).then(function() {
    console.log('carry on');
})

const sst = function() {
    return new Promise(function(resolve, reject) {
        resolve(x + 5);
    })
}
sst().then(function() {
    return sst();
}).catch(function(error) {
    console.log('oh no:', error);
    y + 3;
}).catch(function(error) {
    console.log('oh hhh:', error);
})

// Promise.prototype.finally()
// 不管Promise对象最后状态如何都会执行的操作
// 服务器使用Promise处理请求，然后使用finally方法关掉服务器
// finally()方法的回调函数不接受任何参数，没办法知道前面的Promise状态到底是fulfilled还是rejected。finally方法里面的操作与状态无关，不依赖于Promise的执行结果。
Promise.prototype.finally = function(callback) {
    let p = this.constructor;
    return this.then(value => p.resolve(callback()).then(() => value)), reason => p.resolve(callback()).then(() => { throw reason }) 
}

// Promise.all()
// 将多个Promise实例包装成一个新的Promise实例
// const p = Promise.all([p1, p2, p3]);接收一个数组作为参数，p1, p2, p3都是Promise实例，如果不是会先调用Promise.resolve()方法将参数转为Promise实例，再进一步处理。
// Promise.all()方法的参数可以不是数组，但是必须具有Iterator接口，而且返回的每个成员都是Promise实例。
// 只有p1, p2, p3的状态都变成fulfilled的时候，p的状态才会变成fulfilled，此时p1, p2, p3的返回值组成一个数组，传递给p的回调函数。
// 只要p1, p2, p3之中有一个被rejected，p的状态就变成rejected，此时第一个被rejected的实例的返回值，会传递给p的回调函数。

// Promise.race()
// 将多个Promise实例包装成一个新的Promise实例

// Promise.resolve()
// 将现有对象转换为Promise对象
Promise.resolve('foo');
new Promise(resolve => resolve('foo'));
// 立即resolve()的Promise对象，是在本轮事件循环(event loop)的结束时执行，不是在下一轮事件循环的开始执行
setTimeout(function() {
    // setTimeout在下一轮事件循环开始执行
    console.log('three');
}, 0);
Promise.resolve().then(function() {
    // Promise.resolve()在本轮事件循环结束执行
    console.log('two');
})
// 立即执行
console.log('one');

// Promise.reject(reason)
// 返回一个新的Promise实例，状态为rejected
const prj = Promise.reject('出错了');
const prrj = new Promise((resolve, reject) => reject('nonnn'));
prj.then(null, function(s) {
    console.log('prj:', s);
})
Promise.reject('错误').catch(e => {
    console.log('e:', e)
})

// 加载图片
const preLoadImage = function(path) {
    return new Promise(function(resolve, reject) {
        const image = new Image();
        image.onload = resolve;
        image.onerror = reject;
        image.src = path;
    })
}