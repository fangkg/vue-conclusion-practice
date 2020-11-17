// 节流可以控制事件触发的频率，事件触发可以让它在每一秒内只触发一次，可以提高性能
function throttle(fn, wait) {
    let prev = +new Date();

    return function() {
        let now = +new Date();
        // 当下一次事件触发的时间和初始事件触发的时间的差值大于等待时间才触发新事件
        if (now - prev > wait) {
            fn.apply(this, arguments);
        }

        // 重置初始触发时间
        prev = +new Date()
    }
}

throttle()