/*
 * @Author: fangkg
 * @Date: 2020-12-10 08:52:15
 * @LastEditTime: 2020-12-10 09:00:26
 * @LastEditors: Please set LastEditors
 * @Description: 对象拓展
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\ES\obj.js
 */

console.log(...[1, 2, 3]);
console.log(1, ...[2, 3, 4], 5);

function push(array, ...items) {
    return array.push(...items);
}
let arr = [33, 55, 1, 8];

function add(x, y) {
    return x + y;
}
const numbers = [2, 55];
console.log(add(...numbers));
console.log(push(arr, ...numbers));

// 使用了扩展运算符，将一个数组变为参数序列
// 扩展运算符与正常的函数参数可以结合使用
function f(v, w, x, y, z) {
    console.log('f:', v, w, x, y, z);
}
f(-2, ...numbers, 33, 5);

let x = 6;
const arr1 = [
    ...(x > 0 ? ['a'] : []),
    'b'
]
console.log('arr:', arr1);