for (var i = 0; i < 10; i ++) {
    (function(j) {
        setTimeout(() => {
            console.log('j:', j)
        }, 1000)
    })(i)
}

for (var m = 0; m < 10; m ++) {
    console.log('m:', m)
}
console.log('m...', m)

for (var n = 1; n <= 5; n++) {
    setTimeout(function timer(j) {
        console.log('j...', j)
    }, 0, n)
}

for (let i =0; i < 10; i++) {
    setTimeout(() => {
        console.log('let...i:', i)
    }, 1000)
}

// setTimeout
// 由于消息队列的机制，不一定能够按照自己设置的时间执行；
// setTimeout嵌套setTimeout时，系统会设置最短时间间隔为4ms;
// 未激活的页面，setTimeout最小时间间隔为1000ms;
// 延时执行时间最大值为2147483647(32bit)，溢出这个值会导致定时器立即执行

setTimeout(() => {
    console.log('立即执行！')
}, 2147483648)