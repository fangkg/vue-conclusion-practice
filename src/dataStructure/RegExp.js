/*
 * @Author: fangkg
 * @Date: 2020-11-23 11:35:14
 * @LastEditTime: 2020-11-23 11:50:43
 * @LastEditors: Please set LastEditors
 * @Description: 正则匹配解题
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\dataStructure\RegExp.js
 */

 function find(str) {
     for (var i = 0; i < str.length; i++) {
        let char = str[i];
        let reg = new RegExp(char, 'g');
        let l = str.match(reg).length;
        if (l === 1) {
            return char;
        }
     }
 }

 console.log(find('windows'))

 /**
  * @description: 将'123456'变成'1,234,567'，即千分位标注；利用正则的零宽断言`(?=exp)`，它断言自身出现的位置的后面能匹配表达式exp。第一个逗号后面数字的个数是3的倍数，正则：`/(\d{3})+$`;第一个逗号前最多可以有1~3个数字，正则：`/\d{1, 3}`。加起来就是`/\d{1,3}(\d{3}+$)`；分隔符要从前往后加。
  * @param {*} num
  * @return {*}
  */
 function exchange(num) {
    // 转成字符串
    num += '';
    if (num.length <= 3) {
        return num;
    }

    num = num.replace(/\d{1,3}(?=(\d{3})+$)/g, (v) => {
        console.log(v);
        return v + ',';
    });
    return num;
 }

 console.log(exchange(123456789))

 var str = 'googlehelloword';
 var reg = /o/g;
 console.log(reg.test(str))
 console.log(reg.test(str))
 console.log(reg.test(str))