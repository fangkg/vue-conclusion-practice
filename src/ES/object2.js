/*
 * @Author: fangkg
 * @Date: 2020-11-27 11:52:44
 * @LastEditTime: 2020-11-27 14:01:07
 * @LastEditors: Please set LastEditors
 * @Description: 创建对象
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\ES\object2.js
 */

// 使用Object构造函数或对象字面量可以方便的创建对象，但是这些方式也有不足，创建具有同样接口的多个对象需要重复编写很多代码
// 类 继承

// 工厂模式，用于抽象创建可定对象的过程
function createPer(name, age, job) {
    let o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function() {
        console.log(this.name);
    }
    return o;
}
let per1 = createPer('jack', 22, 'enginner');
let per2 = createPer('lucy', 33, 'doctor');
console.log(per1, '---', per2);
// 这种工厂模式可以解决创建多个类似对象的问题，但是没有解决对象标识的问题(即新创建的对象是什么类型)

// 构造函数模式
// 构造函数是用于创建特定类型对象。Object、Array原生构造函数，运行时可以直接在执行环境中使用。

function CreatePer(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function() {
        console.log('this.name:', this.name);
    }
}
let cper1 = new CreatePer('jack', 66, 'teacher');
let cper2 = new CreatePer('lll', 12, 'student');
cper1.sayName();
cper2.sayName();
// 没有显示的创建对象
// 属性和方法直接赋值给了this
// 没有return
// 函数名首字母大写

// 调用构造函数创建实例过程：
// 在内存中创建一个新对象
// 在这个新对象内部[[Prototype]]特性被赋值为构造函数的prototype属性
// 构造函数内部的this被赋值为这个新对象(即this指向新对象)
// 执行构造函数内部的代码(给新对象添加属性)
// 如果构造函数返回非空对象，则返回该对象；否则，返回刚刚创建的新对象；
console.log(cper1.constructor == CreatePer);
console.log(cper2.constructor == CreatePer);

// constructor本来是用来标识对象类型的。一般认为instanceof操作符是确定对象类型更可靠的方式。
console.log(cper1 instanceof Object);
console.log(cper1 instanceof CreatePer);
// 所有自定义对象都继承自Object

// 赋值给变量的函数表达式也可以标识构造函数
let Ccp = function(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function() {
        console.log(this.name);
    }
}

let ccp1 = new Ccp('dddd', 45, 'engineer');
let ccp2 = new Ccp('asd', 17, 'doc');
console.log(ccp1 instanceof Object);
console.log(ccp2 instanceof Ccp);

// 构造函数也是函数，并没有把某个函数定义为构造函数的特殊语法，任何使用new操作符调用就是构造函数，不适用new操作符调用的就是普通函数。
// 作为函数调用，添加到window对象
Ccp('ddddsss', 654, 'dddd');
// window.sayName();

// 在另一个对象的作用域中调用
let o = new Object();
Ccp.call(o, 'tttt', 7, 'Nurse');
o.sayName();

// 构造函数的问题
// 构造函数的问题在于其定义的方法会在每个实例上都创建一遍；函数就是对象，每次定义函数时，都会初始化一个对象。