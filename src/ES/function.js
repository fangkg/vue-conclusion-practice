/*
 * @Author: fangkg
 * @Date: 2020-11-30 11:19:56
 * @LastEditTime: 2020-11-30 12:02:29
 * @LastEditors: Please set LastEditors
 * @Description: 函数
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\ES\function.js
 */


// 函数，每个函数都是Function类型的实例，函数是对象，函数名就是函数对象的指针，而且不一定与函数本身紧密绑定。
function sum (num1, num2) {
    return num1 + num2;
}

sum(1, 3)

let ss = function(num1, num2) {
    return num1 + num2;
};
ss(4, 5);

// 箭头函数
let sss = (num1, num2) => {
    return num1 + num2;
}

sss(2, 8);


// 参数拓展
let vals = [1, 2, 3, 4, 5, 7, 9];
function getSum() {
    let sum = 0;
    for(let i = 0; i < arguments.length; i++) {
        sum += arguments[i];
    }
    return sum;
}
// 不使用拓展运算符，把定义在这个函数里面的数组拆分 apply()
console.log('sum:', getSum.apply(null, vals));
// 拓展运算符
console.log('sum:', getSum(...vals));
console.log('sum:', getSum(-10, ...vals));
console.log('sum:', getSum(...vals, ...[3, 3, 4]));

// 函数声明提升
// JavaScript引擎在任何代码执行之前，会先读取函数声明，并在执行上下文中生成函数定义。而函数表达式必须等到代码执行到它那一行，才会在执行上下文中生成函数定义。
console.log(gg(19, 3));
function gg(num1, num2) {
    return num1 + num2;
}
// 函数定义包含在一个变量初始化语句中，而不是函数声明中
// console.log(ggg(12, 34));
// let ggg = function(num1, num2) {
//     return num1 + num2;
// }