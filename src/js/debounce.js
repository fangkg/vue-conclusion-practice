// 防抖：可以限制事件在一定时间内不能多次触发，加了防抖无论点击多少次都只会在最后一次点击的时候才执行。防抖常用于搜索框或滚动条等的监听事件处理，可以提高性能。
function debounce(fn, wait = 50) {
    // 初始化一个定时器
    let timer;
    
    return function() {
        // 如果timer存在就将其清除
        if (timer) {
            clearTimeout(timer);
        }

        // 重置timer
        timer = setTimeout(() => {
            // 将入参绑定给调用对象
            fn.apply(this, arguments)
        }, wait)
    }
}

debounce()