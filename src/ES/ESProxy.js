/*
 * @Author: fangkg
 * @Date: 2020-12-01 17:13:27
 * @LastEditTime: 2020-12-02 10:53:21
 * @LastEditors: Please set LastEditors
 * @Description: proxy用于修改某些操作的默认行为，等同于在语言层面做出修改，对编程语言进行编程。
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\ES\ESProxy.js
 */
// 在目标对象之前架设一层拦截，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
// Reflect将Object对象的一些明显属于语言内部的方法放到Reflect对象上。从Reflect对象上可以拿到语言内部的方法。

// 修改某些Object方法的返回结果，让其变得合理。Object.defineProperty(obj, name, desc)无法定义时，会抛出一个错误。Reflect.defineProperty(obj, name, desc)会返回false。
try {
    // Object.defineProperty(target, property, attributes);
} catch(e) {
    console.log('e:', e);
}
// 新写法
// if (Reflect.defineProperty(target, property, attributes)) {
//     // success
// } else {
//     // failure
// }
// 让Object操作都变成函数行为。某些Object操作是命令式，name in obj, delete obj[name]，而Reflect.has(obj, name), Reflect.deleteProperty(obj, name)
// Reflect对象的方法与proxy对象的方法一一对应。不管Proxy怎么修改默认行为，总可以在Reflect上获得默认行为。
// let loggedObj = new Proxy(obj, {
//     get(target, name) {
//         return Reflect.get(target, name);
//     },
//     deleteProperty(target, name) {
//         return Reflect.deleteProperty(target, name);
//     },
//     has(target, name) {
//         return Reflect.has(target, name);
//     }
// })
// 每一个Proxy对象的拦截操作(get, delete, has)内部都调用对应的Reflect方法，保证原生行为能够正常运行。
Function.prototype.apply.call(Math.floor, undefined, [1.75]);
// 新写法
Reflect.apply(Math.floor, undefined, [1.75]);

// Reflect对象的13个静态方法
// Reflect.apply(target, thisArg, args);
// Reflect.construct(target, args);
// Reflect.get(target, name, receiver);
// Reflect.set(target, name, value, receiver);
// Reflect.defineProperty(target, name, desc);
// Reflect.deleteProperty(target, name);
// Reflect.has(target, name);
// Reflect.ownKeys(target);
// Reflect.isExtensible(target);
// Reflect.preventExtensions(target);
// Reflect.getOwnPropertyDescriptor(target, name);
// Reflect.getPrototypeOf(target);
// Reflect.setPrototypeOf(target, prototype);
let obj = {
    foo: 1,
    bar: 2,
    get baz() {
        return this.foo + this.bar;
    }
}
Reflect.get(obj, 'foo');
console.log('foo:', Reflect.get(obj, 'foo'));
console.log('ff:', Reflect.get(obj, 'tt'));

let rObj = {
    foo: 4,
    bar: 6
}
Reflect.get(obj, 'baz', rObj);
// 如果name属性部署了读取函数getter，则读取函数的this绑定receiver
console.log('rObj:', Reflect.get(obj, 'baz', rObj));
// 第一个参数不是对象，Reflect.get()方法会报错
// console.log(Reflect.get(1, 'foo'));

// Reflect.set(target, name, value, receiver); 设置targer对象的name属性等于value
Reflect.set(rObj, 'foo', 2);
console.log('foo:', Reflect.get(rObj, 'foo'));

// 如果name属性设置了赋值函数，则赋值函数的this绑定receiver
let myObj = {
    foo: 5,
    set bar(value) {
        return this.foo = value;
    }
}
let myRObj = {
    foo: 6
}
Reflect.set(myObj, 'bar', 3, myRObj);
console.log('mfoo:', Reflect.get(myObj, 'foo'));
console.log('rmfoo:', Reflect.get(myRObj, 'foo'));

let tar = {
    a: 'a'
}
let han = {
    set(target, key, value, receiver) {
        console.log('set');
        Reflect.set(target, key, value, receiver);
    },
    defineProperty(target, key, attribute) {
        console.log('defineProperty');
        Reflect.defineProperty(target, key, attribute);
    }
}
let pr = new Proxy(tar, han);
console.log('a:', pr.a);
pr.a = 8;
// Proxy对象和Reflect对象联合使用，proxy对象拦截赋值操作，Reflect完成赋值的默认行为。而且传入了receiver那么Reflect.set()会触发Proxy.defineProperty()

// Reflect.has()
console.log('a:', 'a' in tar);
console.log('a:', Reflect.has(tar, 'a'));

// Reflect.deleteProperty(obj, name);
// delete obj[name]
// delete tar.a
// console.log('a:', 'a' in tar);
Reflect.deleteProperty(tar, 'a');
console.log(Reflect.has(tar, 'a'));

// Reflect.construct(target, args);
// new Target(...args);
function Greet(name) {
    this.name = name;
}
const ins = new Greet('lucy');
console.log('ins:', ins);
const inst = Reflect.construct(Greet, ['jack']);
console.log('inst:', inst);

// Reflect.getPrototypeOf(obj)
// Object.getPrototypeOf(obj)
// 读取对象的__proto__属性
console.log('e:', Object.getPrototypeOf(inst) === Greet.prototype)
console.log('e:', Reflect.getPrototypeOf(inst) === Greet.prototype);
// Reflect.getPrototypeOf和Object.getPrototypOf的区别是：如果参数不是对象，Object.getPrototypeOf将这个参数转为对象再运行，Reflect.getPrototypeOf会报错
console.log('1:', Object.getPrototypeOf(1));
// console.log('1:', Reflect.getPrototypeOf(1));

// Reflect.setPrototypeOf(obj, newProto)
// Object.setPrototypeOf(obj, newProto)
// 设置目标对象的原型prototype，返回一个布尔值，表示是否设置成功
const tto = {};
Object.setPrototypeOf(tto, Array.prototype);
Reflect.setPrototypeOf(tto, Array.prototype);
console.log('ll:', tto.length);

// 如果无法设置目标对象的原型，比如目标对象禁止拓展Reflect.setPrototypeOf方法返回false
console.log(Reflect.setPrototypeOf({}, null));
console.log(Reflect.setPrototypeOf(Object.freeze({}), null));

// 如果第一个参数不是对象，Object.setPrototypeOf会返回第一个参数本身，而Reflecgt.setPrototypeOf会报错
console.log(Object.setPrototypeOf(2, {}));
// console.log(Reflect.setPrototypeOf(5, {}));

// Reflect.apply(func, thisArg, args)
// Function.prototype.apply.call(func, thisArg, args),用于绑定this对象后执行给定函数
// 绑定一个函数的this对象:fn.apply(obj, args)；如果函数定义了自己的apply()方法，只能写成Function.prototype.apply.call(fn, obj, args);
const ages = [2, 44, 5, 67, 12];
// const youngest = Math.min.apply(Math, ages);
const youngest = Reflect.apply(Math.min, Math, ages);
console.log('youngest:', youngest);
// const type = Object.prototype.toString.call(youngest);
const type = Reflect.apply(Object.prototype.toString, youngest, []);
console.log('type:', type);

// Reflect.defineProperty(target, propertyKey, attributes)
// Object.defineProperty()
// 用来定义属性

function Md() {

}
Object.defineProperty(Md, 'now', {
    value: () => Date.now()
})
Reflect.defineProperty(Md, 'nn', {
    value: () => Date.now
})
console.log('md:', Md);
console.log('now:', Md.now);
console.log('value:', Md.now());

// Proxy.defineProperty
const pp = new Proxy({}, {
    defineProperty(target, prop, desc) {
        console.log('desc:', desc);
        return Reflect.defineProperty(target, prop, desc);
    }
})
pp.fff = 'fff';
console.log('fff:', pp.fff);
// Proxy.defineProperty对属性赋值设置了拦截，然后使用Reflect.defineProperty完成赋值

// Reflect.getOwnPropertyDescriptor(target, propertyKey)
// Object.getOwnPropertyDescriptor()
// 得到指定属性的描述对象
let ioo = {};
Object.defineProperty(ioo, 'hh', {
    value: true,
    enumerable: false
})
var hd = Object.getOwnPropertyDescriptor(ioo, 'hh')
console.log('hd:', hd);
// 新写法
console.log(Reflect.getOwnPropertyDescriptor(ioo, 'hh'));

// 如果一个参数不是对象，Object.getOwnPropertyDescriptor会报错，Reflect.getOwnPropertyDescriptor会抛出错误
console.log(Object.getOwnPropertyDescriptor(1, 'ff'));
// console.log(Reflect.getOwnPropertyDescriptor(2, 'ff'));

// Reflect.isExtensible(target)
// Object.isExtensible(target)
// 返回一个布尔值，表示当前对象是否可拓展
const moo = {};
console.log('is:', Object.isExtensible(moo));
console.log('is:', Reflect.isExtensible(moo));
console.log('is:', Object.isExtensible(9));
// console.log('is:', Reflect.isExtensible(2));

// Reflect.preventExtensions(target)
// Object.preventExtensions()
// 让一个对象变为不可拓展，返回一个布尔值，表示是否操作成功
console.log('pe:', Object.preventExtensions(moo));
Reflect.preventExtensions(moo);
console.log('pe:', Reflect.isExtensible(moo));
console.log(Object.preventExtensions(1));
// console.log(Reflect.preventExtensions(5));

// Reflect.ownKeys(target)
// Object.getOwnPropertyNames与Object.getOwnPropertySymbols之和
var soo = {
    foo: 1,
    bar: 3,
    [Symbol.for('baz')]: 4,
    [Symbol.for('bing')]: 6
}
console.log(Object.getOwnPropertyNames(soo));
console.log(Object.getOwnPropertySymbols(soo));
console.log(Reflect.ownKeys(soo));

// 使用proxy实现观察者模式
// 观察者模式Observer mode，函数自动观察数据对象，一旦对象有变化，函数就会自动执行。
// 观察目标
// cosnt person = observable({
//     name: 'rose',
//     age: 33
// })
// 观察者，一旦数据对象发生变化，print就会自动执行
// function print() {
//     console.log(`${person.name}, ${person.age}`);
// }
// observe(print);
// person.name = 'jack';

// 先定义一个Set集合，所有观察者对象都放进这个集合。然后，observable函数返回原始对象的代理，拦截赋值操作。拦截函数set之中，会自动执行所有观察者。
const queuedObservers = new Set();
const observe = fn => queuedObservers.add(fn);
const observable = obj => new Proxy(obj, { set });
function set(target, key, value, receiver) {
    const result = Reflect.set(target, key, value, receiver);
    queuedObservers.forEach(observer => observer());
    return result;
}
// 测试
// 观察目标
const yoo = {
    a: 1,
    b: 4,
    c: 5
}
// 观察者
function loger() {
    console.log(`${yoo.a}, ${yoo.b}, ${yoo.c}`);
}
const yso = observable(yoo);
observe(loger);
console.log('queuedObservers:', queuedObservers);
yso.b = 'y';