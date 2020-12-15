/*
 * @Author: fangkg
 * @Date: 2020-12-14 15:46:55
 * @LastEditTime: 2020-12-14 17:34:44
 * @LastEditors: Please set LastEditors
 * @Description: let 和 const命令
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\ES6\letConst.js
 */

// let 声明的变量只在它所在的代码块有效。
for(let i = 0; i < 10; i++) {
    console.log('循环内：', i);
}
// console.log('i:', i);
for(var j = 0; j < 10; j++) {
    console.log('循环内j:', j);
}
console.log('j:', j);
var a = [];
for(var h = 0; h < 10; h++) {
    a[h] = function() {
        console.log('a:', h);
    }
}
// 变量h是var命令声明，在全局范围内有效，全局只有一个变量h。每一次循环，变量h的值都会发生改变，循环内被赋给数组a的函数内部的console.log(h)里面的h指向的就是全局的h。
// 所有数组a的成员里面的h指向的都是同一个h,导致运行时输出的是最后一轮的h的值。
a[6]()

var b = [];
for(let i = 0; i < 10; i++) {
    b[i] = function() {
        console.log('b:', i);
    };
}
// 变量i是let声明，当前的i只在本轮循环中有效，所以每一次循环的i其实都是一个新的变量。
// JavaScript引擎内部会记住上一轮循环的值，初始化本轮的变量i时，就在上一轮循环的基础上进行计算。
b[6]()

// 设置循环变量的那部分是一个父作用域，循环体内部是一个单独的子作用域。
for(let i = 0; i < 3; i++) {
    let i = 'abc';
    console.log('iii:', i);
}

// 变量提升，脚本开始运行时，变量foo已经存在了，但是没有值，所以会输出undefined
console.log('foo:', foo);
var foo = 9;

// console.log(bar);
// let bar = 44;

// 暂时性死区，只要块级作用内存在let命令，它所声明的变量就绑定在这个区域，不再受外部的影响。
// 只要一进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行代码出现，才可以获取和使用该变量。
// var tmp = '234';
// if (true) {
//     tmp = 'abc';
//     let tmp;
// }

// let不允许重复声明
// function func() {
//     let a = 10;
//     var a = 8;
// }

// 块级作用域
// ES5只有全局作用域和函数作用域
// 内层变量覆盖外层变量
var dd = new Date();
function fund() {
    // 变量提升导致内层的dd变量覆盖了外层的dd变量
    console.log('dd:', dd);
    if (false) {
        var dd = 'hello world';
    }
}
fund()
// 用来计数的循环变量泄漏为全局变量
var ss = 'hello';
for(var ii = 0; ii < ss.length; ii++) {
    console.log(ss[ii]);
}
console.log('ii:', ii)

function f1() {
    let n = 5;
    if (true) {
        let n = 10;
    }
    console.log('n:', n);
}
// 外层代码块不受内层代码块的影响，输出5；如果两次都是使用var定义变量，最后输出值为10；
f1()

// const命令，声明一个只读的常量，一旦声明，常量的值就不能改变。
// const一旦声明变量，就必须立即初始化，不能留到以后赋值。
// const的作用域和let命令的作用域，只在声明所在的块级作用域内有效。


// 本质：const实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。
// 对于简单类型的数据(数值、字符串、布尔值)，值就保存在变量所指向的内存地址，因此等同于常量。
// 对于复合类型的数据(对象和数组)，变量指向的内存地址保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的(即总是指向另一个固定的地址)，至于它指向
// 的数据结构是不是可变的，就完全不能控制了。

// 对象冻结，Object.freeze()
// 对象本身冻结，对象的属性也冻结
var constantize = (obj) => {
    Object.freeze(obj);
    Object.keys(obj).forEach((key) => {
        if (typeof obj[key] === 'object') {
            constantize(obj[key]);
        }
    })
};
let off = {
    f: {
        ff: {
            ff: 5
        }
    }
}
constantize(off);
console.log('off:', off);
off.f = 4;
console.log('off:', off);

// 顶层对象，浏览器环境中指的是window对象；Node指的是global对象。
console.log('global:', global);
// 浏览器和Web Worker里面，self也指向顶层对象，但是Node没有self。
console.log('this:', this);