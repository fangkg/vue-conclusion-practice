/*
 * @Author: your name
 * @Date: 2020-11-25 09:26:32
 * @LastEditTime: 2020-11-25 09:30:41
 * @LastEditors: Please set LastEditors
 * @Description: 千位符分割
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\JSConclusion\thousandSplit.js
 */

function parseToMoney(num) {
    num = parseFloat(num.toFixed(3));
    let [integer, decimal] = String.prototype.split.call(num, '.');
    integer = integer.replace(/\d(?=(\d{3})+$)/g, '$&,');
    return integer + '.' + (decimal ? decimal : '');
}

console.log(parseToMoney(12344.345));