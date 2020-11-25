/*
 * @Author: fangkg
 * @Date: 2020-11-25 16:51:52
 * @LastEditTime: 2020-11-25 16:54:59
 * @LastEditors: Please set LastEditors
 * @Description: apply实现
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\JSRule\apply.js
 */

Function.prototype.myapply = function(context, arr) {
    let context = Object(context) || window;
    context.fn = this;

    let result;
    if (!arr) {
        result = context.fn();
    } else {
        let args = [];
        for (var i = 0, len = arr.length; i< len; i++) {
            args.push("arr[" + i + "]");
        }
        result = eval("context.fn(" + args + ")");
    }

    delete context.fn;
    return result;
}