/*
 * @Author: fangkg
 * @Date: 2020-12-14 17:42:30
 * @LastEditTime: 2020-12-14 17:51:48
 * @LastEditors: Please set LastEditors
 * @Description: 解构赋值
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\ES6\deconstruct.js
 */

// ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构(Destructing)
let [a, b, c] = [1, 3, 5];
console.log(a, b, c);
// 从数组中提取值，按照对应的位置对变量赋值。
let [foo, [[bar], baz]] = [1, [[2], 3]];
console.log(foo, bar, baz);
let [, , third] = [22, 33, 44];
console.log(third);
let [x, , y] = [24, 56, 78];
console.log(x, y);
let [head, ...tail] = [23, 56, 78, 99];
console.log(head, tail);
let [r, t, ...uu] = ['a'];
console.log(r, t, uu);
// 解构不成功，变量的值就等于undefined
// 不完全解构
let [q, w] = [11, 22, 44];
console.log(q, w);
let [cc, [vc], bc] = [22, [66, 7], 0];
console.log(cc, vc, bc);