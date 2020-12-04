/*
 * @Author: fangkg
 * @Date: 2020-12-04 08:41:27
 * @LastEditTime: 2020-12-04 11:41:18
 * @LastEditors: Please set LastEditors
 * @Description: Set
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\ES\set.js
 */

// 类似于数组，成员的值都是唯一的，没有重复的值
// Set本身是一个构造函数，用来生成Set数据结构
const s = new Set();
[2, 3, 5, 66, 1, 7, 8, 7, 2, 4].forEach(x => s.add(x));
console.log("s:", s);
for(let i of s) {
    console.log('i:', i);
}
console.log('size:', s.size)
const se = new Set([2, 33, 2, 44, 5, 66, 66, 7, 88]);
console.log('se:', se);
console.log('se:', [...se]);
// 去除数组重复成员
// [...new Set(array)]
// 去除字符串里面的重复字符
console.log([...new Set('abcbbc')].join(''))
// 向Set加入值的时候不会发生类型转换
se.add(5);
se.add(NaN);
console.log('se:', se);
se.add('5');
se.add(NaN);
console.log('se:', se);
// Set.add()类似于精确相等运算符(===)，主要区别是向Set加入值时认为NaN等于本身，而精确相等运算符认为NaN不等于自身。
// 两个对象总是不相等的
se.add({});
console.log('se:', se);
se.add({});
console.log('se:', se);

// Set实例的属性和方法
// Set.prototype.constructor() 构造函数，默认就是Set函数
// Set.prototype.size 返回Set实例的成员总数
// Set实例的方法：操作方法、遍历方法
// Set.prototype.add(value) 添加某个值，返回Set结构本身
// Set.prototype.delete(value) 删除某个值，返回一个布尔值，表示删除是否成功
// Set.prototype.has(value) 返回一个布尔值，表示该值是否为Set的成员
// Set.prototype.clear() 清除所有成员，没有返回值
console.log('se:', se);
console.log('size:', se.size)
console.log('has:', se.has(2));
se.delete(2);
console.log('has:', se.has(2));

// Array.from 将Set结构转为数组
const items = Array.from(se);
console.log('items:', items);
// 去除重复成员
function dedupe(array) {
    return Array.from(new Set(array));
}
console.log(dedupe([1, 1, 1, 2, 44, 5, 7, 88, 88]));

// 遍历操作
// Set.prototype.keys() 返回键名的遍历器
// Set.prototype.values() 返回键值的遍历器
// Set.prototype.entries() 返回键值对的遍历器
// Set.prototype.forEach() 使用回调函数遍历每个成员
// Set的遍历顺序就是插入顺序，使用Set保存一个回调函数列表，调用时就能保证按照添加顺序调用
// Set结构没有键名只有键值，keys()和values()方法的行为完全一致
console.log('se:', se);
console.log('seKeys:', se.keys());
console.log('seValues:', se.values());
console.log('seEntries:', se.entries());
console.log(Set.prototype[Symbol.iterator] === Set.prototype.values);
console.log(Set.prototype[Symbol.iterator] === Set.prototype.keys);
// 可以使用for...of循环遍历Set
console.log('se:', se);
for(let x of se) {
    console.log('x:', x);
}
se.forEach((value, key) => {
    console.log(key + '-' + value);
})
console.log(new Set([...se].map(x => x * 2)));
console.log(new Set([...se].filter(x => (x % 2) === 0)));

let s1 = new Set([1, 2, 3, 5, 6, 7, 1, 3, 5]);
let s2 = new Set([1, 3, 5, 6, 8, 9, 2, 4]);
// Set实现并集
let union = new Set([...s1, ...s2]);
console.log('union:', union);
// Set实现交集
let intersect = new Set([...s1].filter((x => s2.has(x))));
console.log('intersect:', intersect);
// Set实现差集
let diff = new Set([...s1].filter(x => !s2.has(x)));
console.log('diff:', diff);

// 在遍历操作中，同步改变原来的Set结构
let ss = new Set([1, 2, 3]);
console.log('ss:', ss);
ss = new Set([...ss].map(val => val * 2));
console.log('ss:', ss);
ss = new Set(Array.from(ss, val => val * 2));
console.log('ss:', ss);

// WeakSet 结构和 Set类似，也是不重复的值的集合。
// WeakSet的成员只能是对象，而不是其它类型的值
const ws = new WeakSet();
// ws.add(1);
// ws.add(Symbol());
ws.add({});
console.log('ws:', ws);
// WeakSet中的对象都是弱引用，垃圾回收机制不考虑WeakSet对该对象的引用，如果其它对象都不再引用该对象，那么垃圾回收机制会自动回收该对象所占用的内存，不考虑该对象还存在于WeakSet之中。
// 垃圾回收机制依赖引用计数，如果一个值的引用次数不为0，垃圾回收机制就不会释放这块内存。结束使用该值之后有时会忘记取消引用，导致内存无法释放，进而引发内存泄漏。
// WeakSet里面的引用都不计入垃圾回收机制，所以不存在这个问题。
// WeakSet适合临时存放一组对象，以及存放跟对象绑定的信息。只要这些对象在外部消失，它在WeakSet里面的引用就会自动消失。
// WeakSet的成员不适合引用的，因为它会随时消失。
// WeakSet不可遍历

// WeakSet是一个构造函数，可以使用new命令创建WeakSet数据结构
// WeakSet可以接受一个数组或者类似数组的对象作为参数
const a = [[1, 2], [3, 4]];
// a数组的成员成为WeakSet的成员，而不是a数组本身。
const aa = new WeakSet(a);
console.log('aa:', aa);

// WeakSet.prototype.add(value); 向WeakSet实例添加一个新成员
// WeakSet.prototype.delete(value); 清除WeakSet实例的指定成员
// WeakSet.prototype.has(value); 返回一个布尔值，表示某个值是否在WeakSet实例之中
const aaa = new WeakSet();
const foo = {};
aaa.add(foo);
console.log('foo:', aaa.has(foo));
aaa.delete(foo);
console.log('foo:', aaa.has(foo));
console.log(aaa.size);
console.log(aaa.forEach);
// aaa.forEach(function(item) {
//     console.log('WeakSet has:' + item)
// })


// Map
// Object结构提供了字符串-值的对应
// Map结构提供了值-值的对应
const m = new Map();
const o = { p: 'hello' };
m.set(o, 'world');
console.log('m:', m);
console.log(m.has(o));
m.delete(o);
console.log(m.has(o));

// Map接受一个数组作为参数，该数组的成员是一个个表示键值对的数组。
const mm = new Map([['name', 'jack'], ['title', 'author']]);
console.log('mm:', mm);
console.log(mm.has('name'));
console.log(mm.has('title'));
console.log(mm.get('name'));
console.log(mm.get('title'));

const st = new Set([
    ['ff', 1],
    ['bb', 2]
])
const mt = new Map(st);
console.log('mt:', mt);
console.log(mt.get('ff'));
// 对同一个键多次赋值，后面值会覆盖前面的值
mt.set('ff', 55);
console.log('mt:', mt);
// 读取一个未知的键则返回undefined
console.log(mt.get('fffff'));
const mp = new Map();
mp.set(['a'], 555);
// set和get方法表面是针对同一个键，实际是两个不同的数组实例，内存地址不一样
console.log('mp:', mp);
console.log(mp.get(['a']));
const k1 = ['a'];
const k2 = ['b'];
mp.set(k1, 222).set(k2, 444);
console.log('mp:', mp);
console.log(mp.get(k1));
console.log(mp.get('a'));
// Map的键实际上跟内存地址绑定，只要内存地址不一样，就视为两个键。解决同名属性碰撞clash的问题。
// Map的键是一个简单类型(数字、字符串、布尔值)，只要两个值严格相等，Map将其视为一个键。0和-0是一个键；布尔true和字符串true是两个不同的键；undefined和null是两个不同的键；
// NaN不严格相等，但是Map将其视为同一个键；
let mmp = new Map();
mmp.set(-0, 123);
console.log(mmp)
console.log(mmp.get(+0));
mmp.set(true, 1);
mmp.set('true', 4);
console.log(mmp.get(true));
console.log(mmp.get('true'));
mmp.set(undefined, 44);
mmp.set(null, 66);
console.log(mmp.get(undefined));
console.log(mmp.get(null));
mmp.set(NaN, 2345);
console.log(mmp.get(NaN));
// size属性返回Map结构的成员总数
console.log('size:', mmp.size);
// Map.prototype.set(key, value) set方法设置键名key对应的键值value，然后返回整个Map结构。如果key已经有值，则键值会被更新，否则就生成新的该键。
// set方法返回的是当前的Map对象，因此可以采用链式写法；
// Map.prototype.get(key) 获取key对应的键值，如果找不到key返回undefined
// Map.prototype.has(key) 返回一个布尔值，表示某个键是否在当前的Map对象之中
// Map.prototype.delete(key) 删除某个键，成功返回true,失败返回false
// Map.prototype.clear() 清除所有成员，没有返回值

// 遍历方法
// Map.prototype.keys() 返回键名的遍历器
// Map.prototype.values() 返回键值的遍历器
// Map.prototype.entries() 返回所有成员的遍历器
// Map.prototype.forEach() 遍历Map的所有成员
// Map遍历的顺序就是插入顺序
console.log('mmp:', mmp);
for(let key of mmp.keys()) {
    console.log(key);
}
for(let val of mmp.values()) {
    console.log(val);
}
for(let en of mmp.entries()) {
    console.log(en)
}
for(let [key, value] of mmp.entries()) {
    console.log(key + ':' + value);
}

// mmp结构的默认遍历器接口 Symbol.iterator属性
console.log(mmp[Symbol.iterator] === mmp.entries);
console.log(mmp[Symbol.iterator] === mmp.keys());

// Map结构转为数组结构使用拓展运算符(...)
console.log('mmp:', mmp);
console.log('keys:', mmp.keys());
console.log('values:', mmp.values());
console.log('entries:', mmp.entries());
console.log('mmp:', [...mmp]);

console.log('mmp:', mmp);
// Map转为数组
// 使用拓展运算符(...)
console.log([...mmp]);
// 数组转为Map
console.log(new Map([[true, 4], [{foo: 5}, ['bbb']]]));

// Map转为对象，如果所有的Map的键都是字符串，它可以无损地转为对象
function strMapToObj(strMap) {
    let obj = Object.create(null);
    for(let [k, v] of strMap) {
        console.log('k:', k);
        console.log('v:', v);
        obj[k] = v;
    }

    return obj;
}
const mmm = new Map().set('yes', true).set('no', false).set(2, 2);
strMapToObj(mmm);
// 非字符串地键名会被转成字符串，再作为对象的键名

// 对象转为Map
// Object.entries()
let obb = {
    'a': 1,
    'b': 4
}
console.log(Object.entries(obb));
console.log(new Map(Object.entries(obb)));

function objToStrMap(obj) {
    let strMap = new Map();
    for(let k of Object.keys(obj)) {
        strMap.set(k, obj[k]);
    }
    return strMap;
}
console.log(objToStrMap({yes: true, no: false}))

// Map转为JSON
console.log('mj:', JSON.stringify({'ff': 4}));

let mmpp = new Map().set(true, 4).set({foo: 44}, ['fff']);
console.log('mmpp：', mmpp);
console.log(JSON.stringify([...mmpp]));

// JSON转为Map
// JSON.parse();

// WeakMap()
const wm = new WeakMap();
const key = { ff: 44 };
wm.set(key, 55);
console.log('wm:', wm);
console.log(wm.get(key));
// WeakMap接受一个数组作为构造函数的参数
const m1 = [1, 2, 3];
const m2 = [4, 6, 8];
const wm2 = new WeakMap([[m1, 'mm1'], [m2, 'mm2']]);
console.log('wm2:', wm2);
console.log(wm2.get(m1));

// WeakMap只接受对象作为键名，(null除外)，不接受其它类型的值作为键名
const mu = new WeakMap();
// mu.set(1, 3);
// mu.set(Symbol(), 99);
// mu.set(null, 55);
console.log(mu);

// WeakMap的键名所指向的对象不计入垃圾回收机制
// WeakMap专用场景是它的键所对应的对象，可能在将来消失。WeakMap结构有助于防止内存泄漏。
// WeakMap弱引用的只是键名，不是键值。键值依然正常使用
const mv = new WeakMap();
let kv = {};
let ov = { foo: 3 };
mv.set(kv, ov);
console.log('mv:', mv);
console.log(mv.get(kv));
// kv = null;
// console.log(mv.get(kv));
ov = null;
// 键值正常引用，即使在WeakMap外部消除了对ov的引用，WeakMap内部的引用依然存在。
console.log(mv.get(kv));

// WeakMap没有遍历操作(keys(), values(), entries())，没有size属性；无法清空，不支持clear()
// WeakMap只有四个方法可用：get(), set(), has(), delete()

// WeakMap应用：DOM节点作为键名。每当发生click事件就更新一下状态。我们将这个状态作为键值放在WeakMap里，对应的键名就是这个节点对象。一旦DOM节点删除，该状态就会自动消失，不存在内存泄漏的风险。
