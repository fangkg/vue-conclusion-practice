// 实现一个休眠函数

// 方法一、使用Promise
function sleep(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    })
}
sleep(1000).then(() => {
    console.log('1秒之后执行这里！')
})

// 方法二、在函数中用async await调用上面封装好的sleep方法
async function foo(){
    await sleep(1000);
    console.log('这里在一秒之后打印！')
}
foo();

// 方法三、generator实现
function* generatorSleep(time) {
    yield new Promise(resolve => {
        setTimeout(resolve, time);
    })
}

generatorSleep(1000).next().value.then(() => {
    console.log('generator实现方式！')
})

// 方式四、通过回调函数来调用cb
function sleepCb(cb, time) {
    if(typeof cb !== 'function') return
    setTimeout(cb, time);
}
function fooCb() {
    console.log('1秒之后打印这个回调函数！')
}
sleepCb(fooCb, 1000);