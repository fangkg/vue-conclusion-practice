/*
 * @Author: fangkg
 * @Date: 2020-11-27 16:46:31
 * @LastEditTime: 2020-11-27 17:21:17
 * @LastEditors: Please set LastEditors
 * @Description: 继承
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\ES\objectInherit.js
 */

// 原型链
// 构造函数、原型和实例的关系：每个构造函数都有一个原型对象，原型有一个属性指回构造函数，而实例有一个内部指针执行原型。
// 如果原型是另一个类型的实例，就意味着这个原型本身有一个内部指针指向另一个原型，相应的另一个原型也有一个指针指向另一个构造函数。这样就在实例和原型之间构造了一条原型链。

function SuperType() {
    this.property = true;
}

SuperType.prototype.getSuperValue = function() {
    return this.property;
}

function SubType() {
    this.subproperty = false;
}

// 继承SuperType
SubType.prototype = new SuperType();
SubType.prototype.getSubValue = function() {
    return this.subproperty;
}

let instance = new SubType();
// 原型与继承关系
// 原型与实例的关系可以通过两种方式来确定，方式一：instanceof；instance的原型链中包含这些构造函数的原型
console.log(instance instanceof Object);
console.log(instance instanceof SuperType);
console.log(instance instanceof SubType);
// 方式二: isPrototypeOf()
console.log(Object.prototype.isPrototypeOf(instance));
console.log(SuperType.prototype.isPrototypeOf(instance));
console.log(SubType.prototype.isPrototypeOf(instance));

// 关于方法，子类覆盖父类的方法，或者增加父类没有的方法，这些方法必须在原型赋值之后再添加到原型上。
// 通过对象字面量方式创建原型方法会破坏之前的原型链，相当于重写了原型链。
// 覆盖后的原型是一个Object的实例，而不再是SuperType的实例。因此之前的原型链就断了。SubType和SuperTye之间也就没有关系了