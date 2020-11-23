/*
 * @Author: fangkg
 * @Date: 2020-11-23 10:48:27
 * @LastEditTime: 2020-11-23 10:52:56
 * @LastEditors: Please set LastEditors
 * @Description: 深拷贝
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\dataStructure\deepClone.js
 */

 function deepClone(o1, o2) {
    for (let k in o2) {
        if (typeof o2[k] === 'object') {
            o1[k] = {};
            deepClone(o1[k], o2[k]);
        } else {
            o1[k] = o2[k];
        }
    }
 }

 let obj = {
     a: 1,
     b: [1, 2, 3],
     c: {}
 }

 let emptyObj = Object.create(null);
 deepClone(emptyObj, obj);
 console.log(emptyObj.a === obj.a);
 console.log(emptyObj.b == obj.b);
 console.log(emptyObj.c == obj.c);