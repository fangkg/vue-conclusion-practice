/*
 * @Author: fangkg
 * @Date: 2020-12-07 11:30:45
 * @LastEditTime: 2020-12-07 11:52:27
 * @LastEditors: Please set LastEditors
 * @Description: 防抖、节流；浏览器的resize, scroll, keypress, mousemove等事件在触发时，会不断的调用绑定在事件上的回调函数，极大的浪费资源，降低前端性能。
 * 为了优化体验，需要对这类事件进行调用次数的限制。
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\vivo\debounce.js
 */

// debounce 防抖，在短时间内多次触发同一个函数，只执行最后一次

// 普通方案
// window.addEventListener('resize', () => {
//     console.log('trigger');
// })

// 优化方案
// debounce函数接受一个函数和延迟执行的时间作为参数
function debounce(fn, delay) {
    // 维护一个timer
    let timer = null;

    return function() {
        // 获取函数的作用域和变量
        let context = this;
        let args = arguments;
        // 每一次事件被触发都会清除当前的timer
        clearTimeout(timer);
        // 然后重新设置超时的调用，只有在最后一次触发事件，才能在delay时间后执行
        timer = setTimeout(function() {
            fn.apply(context, args);
        }, delay);
    }
}

function foo() {
    console.log('trigger');
}

// 在debounce中包装我们的函数，过2秒触发一次
debounce(foo, 2000);
// 调用，在resize事件上绑定处理函数，这时debounce函数会立即调用，实际上绑定的函数是debounce函数内部返回的函数。
// window.addEventListener('resize', debounce(foo, 2000));

function debounce_imm(func, delay, immediate) {
    let timer = null;

    return function() {
        let context = this;
        let args = arguments;
        if (timer) {
            clearTimeout(timer);
        }
        if (immediate) {
            let doNow = !timer;
            timer = setTimeout(function() {
                timer = null;
            }, delay);
            if (doNow) {
                func.apply(context, args);
            }
        } else {
            timer = setTimeout(function() {
                func.apply(context, args);
            }, delay);
        }
    }
}

debounce_imm(foo, 2000, true);