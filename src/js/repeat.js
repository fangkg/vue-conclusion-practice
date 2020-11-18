// 实现一个repeat重复函数
// 传入一个方法，然后每隔一段时间执行一次，执行n次
function repeat(fn, n, interval) {
    return (...args) => {
        let timer;
        let counter = 0;
        timer = setInterval(() => {
            counter ++;
            fn.apply(this, args);
            if (counter === n) {
                clearInterval(timer);
            }
        }, interval);
    }
}

const repeatFn = repeat(console.log, 4, 2000);
repeatFn('helloWorld!');