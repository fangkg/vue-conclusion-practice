/*
 * @Author: fangkg
 * @Date: 2020-11-25 09:12:53
 * @LastEditTime: 2020-11-25 09:16:08
 * @LastEditors: Please set LastEditors
 * @Description: 转为驼峰命名
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\JSConclusion\convertCamel.js
 */

var str = "get-element-by-id";
var fun = function(s) {
    return s.replace(/-w/g, function(x) {
        return x.slice(1).toUppderCase();
    })
}

console.log('str:', fun(str));