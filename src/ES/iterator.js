/*
 * @Author: fangkg
 * @Date: 2020-12-02 15:28:29
 * @LastEditTime: 2020-12-02 16:47:49
 * @LastEditors: Please set LastEditors
 * @Description: 遍历器
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\ES\iterator.js
 */

// 表示集合的数据结构：数组Array，对象Object, Map，Set
// 遍历器(Iterator)，为各种不同的数据结构提供统一的访问机制；使得数据结构的成员能够按某种次序排列；Iterator接口主要供for...of 消费
// 遍历器对象本质上就是一个指针对象
function makeIterator(array) {
    let nextIndex = 0;
    return {
        next: function() {
            return nextIndex < array.length ? { value: array[nextIndex++] , done: false } : { value: undefined, done: true };
        }
    }
}
let itArr = makeIterator(['a', 'b', 'c', 'd']);
console.log('itArr:', itArr);
console.log('it:', itArr.next());

// 使用for...of循环遍历某种数据结构时，该循环会自动寻找Iterator接口
// 默认的Iterator接口部署在数据结构的Symbol.iterator属性，一个数据结构只要具有Symbol.iterator属性就可以认为是可遍历的。
// Symbol.iteratora属性本身是一个函数，就是当前数据结构默认的遍历器生成函数。执行这个函数就会返回一个遍历器。
// 属性名Symbol.iterator是一个表达式，返回Symbol对象的iterator属性。
const obj = {
    [Symbol.iterator]: function() {
        return {
            next: function() {
                return {
                    value: 1,
                    done: true
                }
            }
        }
    }
}
for(let n of obj) {
    console.log('n:', n);
}
console.log(obj);
console.log(obj[Symbol.iterator]);
console.log('rr:', obj[Symbol.iterator]());
console.log('next:', obj[Symbol.iterator]().next());
// 对象obj具有Symbol.iterator属性，是可遍历的。执行这个属性会返回一个遍历器对象

// 原生具有Iterator接口的数据结构：Array, Map, Set, String, TypedArray, 函数arguments对象, NodeList对象

function OOb(value) {
    this.value = value;
    this.next = null;
}
OOb.prototype[Symbol.iterator] = function() {
    let iterator = { next: next };
    let current = this;
    function next() {
        if (current) {
            let value = current.value;
            current = current.next;
            return { done: false, value: value };
        } else {
            return { done: true };
        }
    }

    return iterator;
}
let one = new OOb(1);
for(let i of one) {
    console.log(i);
}
console.log('one:', one);
// 返回遍历函数
console.log('OObIterator:', one[Symbol.iterator]);

let oob = {
    data: ['hello', 'world'],
    [Symbol.iterator]() {
        const self = this;
        let index = 0;
        return {
            next() {
                if (index < self.data.length) {
                    return {
                        value: self.data[index++],
                        done: false
                    }
                } else {
                    return { value: undefined, done: true };
                }
            }
        }
    }
}
console.log('oob:', oob);
console.log('oobIte:', oob[Symbol.iterator]);

// 解构赋值
let ss = new Set().add('a').add('b').add('c');
let [x, y] = ss;
console.log('ss:', x, y);
let [first, ...rest] = ss;
console.log('first:', first);
console.log('rest:', rest);
// 拓展运算符
let str = 'hello';
console.log('str:', [...str]);

// yield
let gee = function* () {
    yield 1;
    yield* [2, 4, 6, 8];
    yield 5;
}
let uuu = gee();
console.log(uuu.next());
console.log(uuu.next());
console.log(uuu.next());
console.log(uuu.next());
console.log(uuu.next());
console.log(uuu.next());
console.log(uuu.next());
console.log(uuu.next());

let st = 'hhhhh';
console.log(typeof st[Symbol.iterator]);
let sti = st[Symbol.iterator]();
console.log('sti:', sti);
console.log('next:', sti.next());

// Iterator接口与Generator()函数
let iterr = {
    [Symbol.iterator]: function* () {
        yield 1;
        yield 2;
        yield 3;
    }
}
console.log('iterr:', [...iterr]);

let jbl = {
    * [Symbol.iterator]() {
        yield 'hello',
        yield 'world'
    }
};

for(let x of jbl) {
    console.log('x:', x);
}

// 数组
const iff = ['red', 'green', 'blue'];
// for...in循环只能获得对象的键名，不能获得对象的键值
for(let m in iff) {
    console.log('m:', m);
}
for(let v of iff) {
    console.log('v:', v);
}
const iof = {};
// 空对象部署了数组iff的Symbol.iterator属性，结果对象iof的for...of循环就产生了与iff一样的结果
iof[Symbol.iterator] = iff[Symbol.iterator].bind(iff);
for (let v of iof) {
    console.log('iof:', v);
}


let addd = {
    length: 2,
    9: 'a',
    1: 'r'
}
// 类数组对象addd中没有Iterator接口
// for(let x of addd) {
//     console.log('x:', x);
// }
// Array.from()将类数组转为数组
for(let x of Array.from(addd)) {
    console.log('xz:', x);
}

// 普通对象
let eff = {
    edition: 6,
    committee: 'TC39',
    standard: 'ECMA'
}
for(let e in eff) {
    console.log('e:', e);
}
// eff is not iterable
// for(let e of eff) {
//     console.log('eof:', e);
// }
for(let key of Object.keys(eff)) {
    console.log(key + ':' + eff[key]);
}

// forEach循环的问题是无法使用break命令、return命令跳出forEach循环
// for...in 循环的键名是数字，但是for...in循环是以字符串作为键名'1', '2'
// for...in循环不经遍历数字键名，还会遍历手动添加的其它键，包括原型链上的键
// for...of循环可以使用break，continue，return跳出循环