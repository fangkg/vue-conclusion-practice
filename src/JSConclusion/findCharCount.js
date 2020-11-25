/*
 * @Author: your name
 * @Date: 2020-11-25 09:17:33
 * @LastEditTime: 2020-11-25 09:22:18
 * @LastEditors: Please set LastEditors
 * @Description: 查找字符串中出现最多的字符和个数
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\JSConclusion\findCharCount.js
 */

let str = 'aaaabbcddddeffdsss';
let num = 0;
let char = '';

// 使其按照一定的次序排列
str = str.split('').sort().join('');
console.log('str:', str)

// 定义正则表达式
let re = /(\w)\1+/g;
str.replace(re, ($0, $1) => {
    if (num < $0.length) {
        num = $0.length;
        char = $1;
    }
})
console.log(`出现最多的字符${char}，出现了${num}次！`)