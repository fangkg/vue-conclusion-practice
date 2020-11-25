/*
 * @Author: your name
 * @Date: 2020-11-25 16:22:57
 * @LastEditTime: 2020-11-25 16:35:03
 * @LastEditors: Please set LastEditors
 * @Description: new操作符：创建了一个全新的对象；会被执行[[Prototype]]也就是proto链接；使this指向新创建的对象；通过new创建的每个对象最终被[[Prototype]]链接到这个函数的prototype对象上；
 * 如果函数没有返回对象类型Object(包含：Function,Array,Date,RegExg,Error),那么new表达式中函数调用将返回该对象引用。
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\JSRule\new.js
 */

function objectFactory() {
    const obj = new Object();
    const Constructor = [].shift.call(arguments);
    obj.__proto__ = Constructor.prototype;
    const ret = Constructor.apply(obj, arguments);
    return typeof ret === "object" ? ret : obj;
}