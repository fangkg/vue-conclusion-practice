/*
 * @Author: fangkg
 * @Date: 2020-11-25 16:19:22
 * @LastEditTime: 2020-11-25 16:22:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\JSRule\instanceOf.js
 */

function instanceOf(L, R) {
    // L表示左表达式，R表示右表达式
    // 获取R的显示原型
    let O = R.prototype;
    // 获取L的隐式原型
    L = L.__proto__;
    while(true) {
        if (L === null) {
            return false;
        }
        if (O === L) {
            // 当O严格等于L时，返回true
            return true;
        }

        L = L.__proto__;
    }
}
