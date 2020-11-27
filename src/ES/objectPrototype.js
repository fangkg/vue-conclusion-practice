/*
 * @Author: fangkg
 * @Date: 2020-11-27 14:01:24
 * @LastEditTime: 2020-11-27 16:45:12
 * @LastEditors: Please set LastEditors
 * @Description: 原型模式
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\ES\objectPrototype.js
 */


// 每个函数都会创建一个prototype属性，这个属性是一个对象，包含应该由特定引用类型的实例共享的属性和方法。这个对象就是通过调用构造函数创建的对象的原型。
// 适用原型对象的好处是，在它上面定义的属性和方法可以被对象实例共享。原来在构造函数中直接赋给对象实例的值，可以直接赋值给它们的原型。
function Person() {}

Person.prototype.name = "jack";
Person.prototype.age = 33;
Person.prototype.job = 'engineer';
Person.prototype.sayName = function() {
    console.log('name:', this.name);
}

let person = new Person();
person.sayName();

let per = new Person();
per.sayName();

console.log(person.sayName() === per.sayName());
// 适用函数表达式也可以
let cper = function() {}
console.log('cper:', cper);
// 使用这种原型模式定义的属性和方法是由所有实例共享的。因此所有实例访问的都是相同的属性和相同的sayName()函数

// 原型
// 只要创建一个函数，就会按照特定的规则为这个函数创建一个prototype属性(指向原型对象)。默认情况下，所有原型对象都会自动获得一个名为constructor的属性，指回与之关联的构造函数。
console.log('Person:', Person);
console.log('prototype:', Person.prototype);
console.log('constructor:', Person.prototype.constructor)
console.log('isEqual:', Person == Person.prototype.constructor)

// 实例与构造函数原型之间有直接的联系，但是实例与构造函数之间没有联系
// 正常的原型链都会终止于Object的原型对象
// Object原型的原型是null
console.log(Person.prototype.__proto__ === Object.prototype);
console.log(Person.prototype.__proto__.constructor === Object);
console.log(Person.prototype.__proto__.__proto__ === null);

// 实例通过__proto__链接到原型对象，它实际上指向隐藏属性[[Prototype]]
// 构造函数通过prototype属性链接到原型对象
// 实例与构造函数没有直接联系，与原型对象有直接联系
console.log('实例', person.__proto__ === Person.prototype);
console.log(person.__proto__.constructor === Person);

// instanceof检查实例的原型链中是否包含指定构造函数的原型
console.log(person instanceof Person);
console.log(person instanceof Object);
console.log(Person.prototype instanceof Object);

// isPrototypeof()，person实例内部有链接指向Person.prototype
console.log('isPrototypeof:', Person.prototype.isPrototypeOf(person));

// Object.getPrototypeOf()，返回参数的内部特性[[Prototype]]的值
console.log('Person:', Object.getPrototypeOf(person));
console.log('isEqual:', Object.getPrototypeOf(person) == person.__proto__);
console.log('isEqual_prototype:', Object.getPrototypeOf(person) == Person.prototype);
console.log('name:', Object.getPrototypeOf(person).name);

// Object.setPrototypeOf()方法
// 可以向私有特性[[Prototype]]写入一个新值
let oo = {
    numLenth: 4
}
let oobj = {
    name: 'ddd'
}
Object.setPrototypeOf(oobj, oo);
console.log('oobj:', oobj);
console.log('name:', oobj.name);
console.log('numLength:', oobj.numLenth);
console.log(Object.getPrototypeOf(oobj) === oo);
// Object.setPrototypeOf()可能造成性能下降

// Object.create()来创建一个新对象，同时为其指定原型
let fdf = {
    numLen: 3
}
let ssss = Object.create(fdf);

ssss.name = 'iiii';
console.log('name:', ssss.name);
console.log('ssss:', ssss);
console.log('numLen:', ssss.numLenth);
console.log('isEqual:', Object.getPrototypeOf(person) === fdf);

// 原型层级
// 在通过对象访问属性时，会按照这个属性的名称开始搜索。搜索开始于对象实例本身。如果在这个实例上发现了给定的名称，则返回该名称对应的值。如果没有找到这个属性，则搜索
// 会沿着指针进入原型对象，然后在原型对象上找到属性后，再返回对应的值。

// 可以通过实例读取原型对象上的值，但是不能通过实例重写这些值。如果在实例上添加了一个与原型对象中同名的属性，那就会在实例上创建这个属性，这个属性会遮住原型对象上的属性。
let perrr = new Person();
perrr.name = 'Ggg';
console.log('name:', perrr.name);
let peeeee = new Person();
console.log('name:', peeeee.name);
// perrr.name = null;
delete perrr.name;
console.log('perrr:', perrr.name);
console.log('peee:', peeeee.name);

// hasOwnProperty()，方法用于确定某个属性是在实例上还是在原型对象上。这个方法继承自Object，会在属性存在于调用它的对象实例上时返回true
console.log(person.hasOwnProperty('name'));
person.name = 'egg';
console.log(person.hasOwnProperty('name'));
delete person.name;
console.log(person.hasOwnProperty('name'));

// 原型和in操作符
// 有两种方式使用in操作符：单独使用和for-in循环中使用
// 单独使用时，in操作符会在可以通过对象访问指定属性时返回true，无论该属性是在实例上还是在原型上。
console.log(person.hasOwnProperty('name'));
console.log('name' in person);

let ppppp = new Person();
console.log(ppppp.name);
ppppp.name = 'rrrrr';
console.log(ppppp.hasOwnProperty('name'));
console.log('name' in ppppp);

// 判断属性是否在原型上
function hasPrototypeProperty(object, name) {
    return !object.hasOwnProperty(name) && (name in object);
}

console.log('是否存在原型上：', hasPrototypeProperty(person, 'name'));

// 只要通过对象可以访问，in操作符就返回true
// hasOwnProperty()只有属性存在于实例上的时候才返回true

// for-in循环中使用in操作符时，可以通过对象访问且可以被枚举的属性都会返回，包括实例属性和原型属性。
// 遮蔽原型中不可枚举属性的实例属性也会在for-in循环中返回，因为默认情况下自定义的属性都是可枚举的。
// Object.keys()获得对象上所有可枚举的实例属性
console.log('prototype:', Person.prototype)
let keys = Object.keys(Person.prototype);
console.log('keys:', keys);

let pssos = new Person();
pssos.name = 'iiii';
pssos.age = 'ooo';
let pKeys = Object.keys(pssos);
console.log('pkeys:', pKeys);

// 列出所有实例属性，无论是否可枚举 Object.getOwnPropertyNames()\
let aKeys = Object.getOwnPropertyNames(Person.prototype);
console.log('akeys:', aKeys);
let bKeys = Object.getOwnPropertyNames(pssos);
console.log('bKeys:', bKeys);

let k1 = Symbol('k1'), k2 = Symbol('k2');
let o = {
    [k1]: 'k1',
    [k2]: 'k2'
}
console.log(Object.getOwnPropertySymbols(o));

// for-in循环和Object.keys()的枚举顺序是不确定的，取决于JavaScript引擎，可能因浏览器而异。
// Object.getOwnPropertyNames()，Object.getOwnPropertySymbols()，Object.assing()的枚举顺序是不确定的。

// 对象迭代，接收一个对象，返回它们内容的数组
// Object.values();
// Object.entries();
// 符号属性会被忽略
const sym = Symbol();
const ssdff = {
    [sym]: 'fff'
}
console.log(Object.values(ssdff));
console.log(Object.entries(ssdff));

// 随时能给原型添加属性和方法，并能立即反映在所有对象实例上，这跟重写整个原型是两回事。
// 实例的[[Prototype]]指针是在调用构造函数时自动赋值，这个指针即使把原型修改为不同的对象也不会变。
// 重写整个原型会切断最初原型和构造函数的联系，但是实际引用的仍然是最初的原型。
// 重写构造函数上的原型之后再创建的实例才会引用新的原型。而在此之前创建的实例任然会引用最初的原型。

// 原生对象原型
console.log(typeof Array.prototype.sort);
console.log(typeof String.prototype.substring)

// 原型的问题
// 弱化了向构造函数传递初始化参数的能力，会导致所有实例默认都取得相同的属性名。
// 原型上的引用类型的属性，会造成状态污染。