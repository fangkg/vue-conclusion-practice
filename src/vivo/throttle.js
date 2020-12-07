/*
 * @Author: fangkg
 * @Date: 2020-12-07 11:52:42
 * @LastEditTime: 2020-12-07 13:20:15
 * @LastEditors: Please set LastEditors
 * @Description: throttle 节流，在一段时间内只允许函数执行一次；输入框的联想，限定用户在输入时只在每两秒钟响应一次联想。
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\vivo\throttle.js
 */

// 通过时间戳来实现
// 使用时间戳实现的节流函数会在第一次触发事件时立即执行，以后每过delay秒之后才执行一次，并且最后一次触发事件不会被执行；
let throttle_pre = function(func, delay) {
    let prev = Date.now();

    return function() {
        let context = this;
        let args = arguments;
        let now = Date.now();
        
        if (now - prev >= delay) {
            func.apply(context, args);
            prev = Date.now();
        }
    }
}

throttle_pre();

// 通过定时器实现
// 使用定时器实现的节流函数在第一次触发时不会执行，而是在delay秒时候才执行，当最后一次停止触发后，还会再次执行一次函数。
let throttle_setTT = function(func, delay) {
    let timer = null;

    return function() {
        let context = this;
        let args = arguments;
        if (!timer) {
            timer = setTimeout(function() {
                func.apply(context, args);
                timer = null;
            }, delay);
        }
    }
}

throttle_setTT();



