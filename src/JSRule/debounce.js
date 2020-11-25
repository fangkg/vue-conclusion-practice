/*
 * @Author: fangkg
 * @Date: 2020-11-25 09:36:21
 * @LastEditTime: 2020-11-25 09:43:57
 * @LastEditors: Please set LastEditors
 * @Description: 防抖函数：在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\JSRule\debounce.js
 */

const debounce = (fn, delay) => {
    let timer = null;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay)
    }
}

console.log('debounce:', debounce);
// 使用场景
// 按钮提交场景：防止多次提交按钮，只执行最后提交的一次
// 服务端验证场景：表单验证需要服务端配合，只执行一段连续的输入事件的最后一次
// 搜索联想词功能

// lodash.debounce