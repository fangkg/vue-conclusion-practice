/*
 * @Author: fangkg
 * @Date: 2020-11-25 16:45:47
 * @LastEditTime: 2020-11-25 16:49:30
 * @LastEditors: Please set LastEditors
 * @Description: call将函数设为对象的属性；执行或删除这个函数；指定this到函数并传入给定参数执行函数；如果不传入参数，默认指向window;
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\JSRule\call.js
 */

Function.prototype.myCall = function(context) {
    // 没有考虑context非object的情况
    context.fn = this;
    let args = [];
    for(let i = 1,len = arguments.length; i < len; i++) {
        args.push(arguments[i]);
    }
    context.fn(...args);
    let result = context.fn(...args);
    delete context.fn;
    return result;
}