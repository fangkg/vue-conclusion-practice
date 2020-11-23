/*
 * @Author: fangkg
 * @Date: 2020-11-23 16:07:25
 * @LastEditTime: 2020-11-23 16:56:12
 * @LastEditors: Please set LastEditors
 * @Description: js汇总
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\JSConclusion\index.js
 */

// 变量提升
// JavaScript引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行的运行。这样造成的结果就是变量的声明语句，都会被提升到代码的头部，这个过程叫变量提升hoisting。
console.log(a); // undefined
var a = 1;

// fn();
function fn() {
    console.log(a)
}
fn();

// 闭包
// 闭包：函数和声明该函数的词法环境的组合；闭包=函数和函数体内可访问的变量总和。
(function() {
    var a = 1;
    function add() {
        var b = 2;

        var sum = a + b;
        console.log('sum:', sum)
    }
    add();
})()
// add()函数本身，以及其内部可以访问的变量a,这两个组合在一起被称为闭包。
// 闭包的作用：隐藏变量，闭包一大特性就是内部函数总是访问其所在外部函数中声明的参数和变量。
function Person() {
    var name = 'jack';
    this.getName = function() {
        return name;
    }
    this.setName = function(value) {
        name = value;
    }
}
const person = new Person();
console.log(person.getName())
person.setName('lucy');
console.log(person.getName())
// 函数体内的var name = 'xxx' 只有getName和setName两个函数可以访问，外部无法访问，相当于将变量私有化。
// console.log(name)

// JavaScript作用域链
// JavaScript属于静态作用域，声明的作用域是根据程序正文在编译时就确定的，有时也称为词法作用域。其本质是JavaScript在执行过程中会创造可执行上下文，可执行上下文中的词法环境中含有外部词法环境的引用，可以通过这个引用获取外部词法环境的变量、声明等，这些应用串联起来一直指向全局的词法环境，因此形成了作用域链。

// ES6模块与CommonJS模块
// CommonJS是对模块的浅拷贝；ES6 Module是对模块的引用，即ES6 Module只存只读，不能改变其值，具体点就是指针指向不能变，类似const;
// import的接口是read-only只读状态，不能修改其变量值。不能修改其变量的指针指向，但是可以改变变量内部指针指向。可以对CommonJS重新赋值改变指向。对ES6 Module赋值会编译报错。
// CommonJS和ES6 Module都可以对引入的对象进行赋值，即对对象内部的属性的值进行改变。

// BigInt提案
// JavaScript中Number.MAX_SAFE_INTEGER表示最大安全数字，在这个范围内不会出现精度丢失(小数除外)。一旦超出这个范围，js就会出现计算不准确的情况，这在大数计算的时候不得不依靠一些第三方库进行解决。因此官方提出了BigInt来解决此问题。

// null undefined
// null表示为空，代表此处不应该有值存在，一个对象可以是null，代表是个空对象，而null本身也是对象
// undefined表示不存在，JavaScript是一门动态类型语言，成员除了表示存在空值之外，还有可能根本就不存在，因为不存在只在运行期间才知道，这就是undefined存在的意义。


// 原型对象，绝大部分函数(少数内建函数除外)都有一个prototype属性，这个属性是原型对象用来创建新对象实例，而所有创建的对象都会共享原型对象，因此这些对象便可以访问原型对象的属性。
// hasOwnProperty()方法存在于Object原型对象中，可以被任何对象当做自己的方法使用。
// Object.hasOwnProperty(propertyName); 返回Boolean类型。

var personObj = {
    name: 'rose',
    age: 30,
    profession: 'player'
}
console.log(personObj.hasOwnProperty('name'));
console.log(personObj.hasOwnProperty('hasOwnProperty'))
console.log(Object.prototype.hasOwnProperty('hasOwnProperty'))
// personObj对象中并不存在hasOwnProperty()，但是personObj依然可以拥有该方法，靠的是原型链。

// 原型链，每个对象都有__proto__属性，此属性指向该对象的构造函数的原型。对象可以通过__proto__与上游的构造函数的原型对象连接起来，而上游的原型对象也有一个__proto__，这样就形成了原型链。