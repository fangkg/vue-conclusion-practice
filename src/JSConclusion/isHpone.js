/*
 * @Author:fangkg
 * @Date: 2020-11-25 09:31:20
 * @LastEditTime: 2020-11-25 09:33:04
 * @LastEditors: Please set LastEditors
 * @Description: 判断是否是电话号码
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\JSConclusion\isHpone.js
 */

function isPhone(tel) {
    let regx = /^1[34578]\d{9}$/;
    return regx.test(tel);
}

console.log('isTel:', isPhone(18752068853));