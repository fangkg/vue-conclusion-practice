/*
 * @Author: fangkg
 * @Date: 2020-11-23 10:53:44
 * @LastEditTime: 2020-11-23 11:01:15
 * @LastEditors: Please set LastEditors
 * @Description: 斐波那契额数列
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\dataStructure\fib.js
 */

 // count记录递归的次数
 let count = 0;
 function fn1(n) {
    let cache = {};
    function _fn(n) {
        if (cache[n]) {
            return cache[n];
        }
        count ++;
        if (n === 1 || n === 2) {
            return 1;
        }
        let prev = _fn(n - 1);
        cache[n -1] = prev;
        let next = _fn(n -2);
        cache[n -2] = next;
        return prev + next;
    }
    return _fn(n);
 }

 console.log(fn1(5), count)

 let count2 = 0;
 function fn2(n) {
    count2++;
    if (n === 1 || n === 2) {
        return 1;
    }
    return fn2(n -1) + fn2(n -2);
 }
 console.log(fn2(20),count2)