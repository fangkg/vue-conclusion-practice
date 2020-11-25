/*
 * @Author: fangkg
 * @Date: 2020-11-25 09:22:30
 * @LastEditTime: 2020-11-25 09:25:52
 * @LastEditors: Please set LastEditors
 * @Description: 字符串查找
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\JSConclusion\findString.js
 */

 function isContain(a, b) {
     for (let i in b) {
         if (a[0] === b[i]) {
             let temp = true;
             for (let j in a) {
                 if (a[j] !== b[~~i + ~~j]) {
                     temp = false
                 }
             }

             if (temp) {
                 return i;
             }
         }
     }

     return -1;
 }

 let a='34';
 let b='1234567'; 
console.log('isContain:', isContain(a,b));
