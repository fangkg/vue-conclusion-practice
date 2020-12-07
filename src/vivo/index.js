/*
 * @Author: fangkg
 * @Date: 2020-12-07 09:39:23
 * @LastEditTime: 2020-12-07 10:08:26
 * @LastEditors: Please set LastEditors
 * @Description: 总结
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\vivo\index.js
 */

// 箭头函数、普通函数
// 定义
// 普通函数
function fun(name){
    return `Hello ${name}`
}
fun();
// 箭头函数，省去了function关键字，函数参数放在=>前面的括号中，函数体跟在=> 后的花括号中
// 箭头函数没有参数，直接写一个空括号即可。
// 箭头函数的参数只有一个，可以省去包裹参数的括号
// 箭头函数有多个参数，将依次用逗号分隔，包裹在括号中即可
// 箭头函数的函数体只有一句代码，简单的返回某个变量或者返回一个简单的JS表达式，可以省去函数体的大括号{}
let fu = (name) => {
    return `Hello ${name}`
}
fu();
// 箭头函数的函数体只有一句代码，返回一个对象
// 用小括号包裹要返回的对象不报错
let getTempItem = id => ({id: 3, name: 'temp'});
getTempItem();
// 不能这样写，对象的大括号会被解释为函数体内的大括号
// let getTT = id => {id: 3, name: 'tt'};
// 箭头函数的函数体只有一条语句并且不需要有返回值，通常是调用一个函数，可以给这条语句前面加一个void关键字
// let ff = () => void doesNotReturn();

// 箭头函数比普通函数语法更加简洁、清晰
// 箭头函数没有prototype(原型)，所以箭头函数本身没有this
let a = () => {};
console.log(a.prototype);
function b() {}
console.log(b.prototype)
// 箭头函数没有自己的this，箭头函数的this指向定义时(而非调用时)继承自外层第一个普通函数的this。箭头函数中，this的指向在它定义的时候就已经确定了，之后永远不会改变。
let obj = {
    a: 10,
    b: () => {
        console.log(this.a);
        console.log(this);
    },
    c: function() {
        console.log(this.a);
        console.log(this);
    }
}
obj.b();
obj.c();

// call, apply, bind无法改变箭头函数中this的指向
// call, apply, bind方法可以用来动态修改函数执行时this的指向，但是由于箭头函数的this定义时就已经确定且永远不会改变。所以使用这些方法永远也改变不了箭头函数this的指向。
let id = 3;
let fff = () => {
    console.log('fff:', this.id);
}
fff();
fff.call({id: 20});
fff.apply({id: 40});
fff.bind({id: 55});

// 箭头函数不能作为构造函数使用
// let Ffff = (name, age) => {
//     this.name = name;
//     this.age = age;
// }
// console.log(new Ffff('lucy', 44));

// new
// JS内部首先会生成一个对象；
// 再把函数中的this指向对象；
// 执行构造函数中的语句；
// 返回该对象实例

// 箭头函数不绑定arguments,取而代之的是用rest参数...代替arguments对象，来访问箭头函数的参数列表。
// 普通函数
function FA() {
    console.log('a:', arguments);
}
FA(2, 33, 5, 78, 11);
let FB = (b) => {
    // 箭头函数中没有自己的arguments对象，在箭头函数中访问arguments实际上获得的是外层局部函数执行环境中的值。
    console.log("FB:", arguments);
}
FB(33, 44, 55, 66, 77, 88, 99);
let FC = (...c) => {
    console.log("FC:", c);
}
FC(22, 4, 66, 88, 9);

// 箭头函数不能用作Generator函数，不能使用yield关键字。

