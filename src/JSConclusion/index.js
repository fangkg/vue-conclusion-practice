/*
 * @Author: fangkg
 * @Date: 2020-11-23 16:07:25
 * @LastEditTime: 2020-11-23 17:41:56
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

// 判断是否为数组
let arr = [];
if (Array.isArray(arr)) {
    return true;
}
// 考虑兼容性使用toStrig()方法
if (!Array.isArray) {
    Array.isArray = function(arg) {
        return Object.prototype.toString.call(arg) === '[object Array]'
    }
}

// this
// this的指向不是在编写时确定的，而是在执行时确定的，同时，this不同的指向在于遵循了一定的规则。
// 默认情况下，this是指向全局对象的，比如浏览器就是执行window
var nameIns = 'jack';
function sayName() {
    console.log('nameIns', this.nameIns)
}
sayName()

function fff() {
    console.log(this.name);
}
var nameObj = {
    name: 'Messi',
    f: fff
}
nameObj.f();

function fffff() {
    console.log(this.name);
}

var obj1111 = {
    name: 'messi'
}
// 由于bind将obj1111绑定到fffff函数上返回一个新的函数，因此需要再在后面加上括号进行执行。
fffff.bind(obj1111)();
// 优先级最高的绑定new，用new调用一个构造函数，会创建一个新对象，在创建这个新对象的过程中，新对象会自动绑定到PersonIns对象的this上，此时this自然就指向这个新对象。
function PersonIns(name) {
    this.name = name;
    console.oog(name);
}
var perIns = new PersonIns('Messi');
console.log('perIns:', perIns)
// 绑定优先级：new绑定>显式绑定>隐式绑定>默认绑定

// 箭头函数的this
// 箭头函数不同于传统JavaScript中的函数，箭头函数并没有属于自己的this，它的所谓的this是捕获其所在上下文的this值，作为自己的this值，并且由于没有属于自己的this，而箭头函数是不会被new调用的，这个所谓的this也不会被改变。
const arrowObj = {
    getArrow() {
        return () => {
            console.log('箭头函数this:', this === arrowObj)
        }
    }
}
console.log(arrowObj.getArrow())

// async/await
// async函数，就是Generator函数的语法糖，它是建立在Promises上，并且与所有的基于Promise的API兼容。
// Async声明一个异步函数(async function someName(){...})
// 自动将常规函数转成Promise，返回值也是一个Promise对象
// 只有async函数内部的异步操作执行完，才会执行then方法指定的回调函数
// 异步函数内部可以使用await
// await暂停异步的功能执行var result = await someAsyncCall();
// 放置在Promise调用之前，await强制其它代码等待，直到Promise完成并返回结果
// 只能与Promise一起使用，不适用于回调
// 只能在async函数内部适用

// async/await Promise
// 代码读起来更加同步，Promise虽然摆脱了回调地狱，但是then的链式调用也会带来额外的阅读负担
// Promise传递中间值非常麻烦，而async/await几乎是同步写法，非常优雅
// 错误友好处理，async/await可以用成熟的try/catch，Promise的错误捕获非常冗余
// 调试友好，Promise的调试很差，由于没有代码块，不能在一个返回表达式的箭头函数中设置断点，如果在一个.then代码块中适用调试器的步进step-over功能，调试器并不会进入后续的.then代码块，因为调试器只能跟踪同步代码的每一步。

// 参数传递
// 基本类型按值传递，复杂类型按共享传递
var testObj = 1;
function testFn(x) {
    x = 10;
    console.log(x);
}
testFn(testObj);

// JavaScript中实现不可变对象
// 深克隆，性能差，不适合大规模适用
// Immutable.js自成一体的一套数据机构，性能良好，需要额外的API
// immer，利用Proxy特性，性能良好

// 基本类型存储在栈中，一旦被闭包引用则成为常住内存，会存储在内存堆中。
