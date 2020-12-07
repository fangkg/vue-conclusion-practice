/*
 * @Author: fangkg
 * @Date: 2020-12-07 11:11:55
 * @LastEditTime: 2020-12-07 11:27:40
 * @LastEditors: Please set LastEditors
 * @Description: 回调函数callback
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\vivo\callback.js
 */

// 把一个函数当作值传递给另外一个函数，在另外一个函数中把这个函数执行。
// 在大函数执行过程中，可以操作传递给它的回调函数；可以把它执行多次；可以给回调函数传递实参；可以改变里面的this，箭头函数中没有this,用的this都是上下文的；可以接受函数执行的返回结果。
function func(callback) {
    let oo = {};
    for(let i = 0; i < 5; i++) {
        // callback(i)，分别把每一次循环的i的值当做实参传递给anonymouse，所以anonymouse总计执行了5次，每次执行都可以基于形参index获取到传递的i的值
        let res = callback.call(oo, i);
        // res是每一个anonymous执行返回的结果
        if (!res) {
            // 接受回调函数返回的结果，控制循环结束
            break;
        }
    }
}

function anonymous(index) {
    if (index >= 3) {
        return false;
    }

    return '@' + index;
}

func(anonymous());