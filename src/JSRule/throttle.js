/*
 * @Author: fangkg
 * @Date: 2020-11-25 09:44:35
 * @LastEditTime: 2020-11-25 10:02:02
 * @LastEditors: Please set LastEditors
 * @Description: 节流函数：规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次有效
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\JSRule\throttle.js
 */

const throttle = (fn, delay = 500) => {
    let flag = true;
    return (...args) => {
        if (!flag) {
            return;
        }
        flag = false;
        setTimeout(() => {
            fn.apply(this, args);
            flag = true;
        }, delay)
    }
}

console.log('throttle:', throttle);

// 使用场景：
// 拖拽：固定时间内只执行一次，防止超高频次触发位置变动
// 缩放：监控浏览器resize
// 动画：避免短时间内多次触发动画引起性能问题