/*
 * @Author: fangkg
 * @Date: 2020-12-07 14:57:44
 * @LastEditTime: 2020-12-08 09:56:17
 * @LastEditors: Please set LastEditors
 * @Description: 对象的拓展
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\ES\object.js
 */

// 属性的遍历
// for...in 循环遍历对象自身的和继承的可枚举属性，不包含Symbol属性。
// Object.keys() 返回一个数组，包括对象自身的不含继承的所有可枚举属性。不含Symbol属性的键名
// Object.getOwnPropertyNames(obj) 返回一个数据，包含对象自身的所有属性，不含Symbol属性，但是包括不可枚举属性的键名。
// Object.getOwnPropertySymbols(obj) 返回一个数组，包含对象自身的所有Symbol属性的键名
// Reflect.ownKeys(obj) 返回一个数组，包含对象自身的不含继承的所有键名，不管键名是Symbol或者字符串，不管是否可枚举。

// 以上方法遍历对象的键名，都遵守同样的属性遍历的此需规则。首先遍历所有数值键，按照数值升序排列；其次遍历所有字符串键，按照加入时间升序排列；最后遍历所有Symbol键，按照加入时间升序排列。

// this关键字总是指向函数所在的当前对象。ES6中类似的super关键字指向当前对象的原型对象。
// super关键字表示原型对象时，只能用在对象的方法之中，用在其它地方都会报错。
const proto = {
    foo: 'hello'
};
console.log('prototypeof:', Object.getPrototypeOf(proto));
const obj = {
    foo: 'world',
    find() {
        console.log('foo:', super.foo);
        return super.foo;
    }
};
Object.setPrototypeOf(obj, proto);
obj.find();

// 对象的拓展运算符
// 解构赋值：从一个对象取值，将目标对象自身的所有可遍历的enumerable，但尚未读取的属性，分配到指定的对象上面。所有的键和它们的值都会拷贝到新对象上面。
let { x, y, ...z } = { x: 1, y: 2, a: 3, b: 4 };
console.log('x:', x);
console.log('y:', y);
// 变量z是解构赋值所在的对象，获取等号右边所有尚未读取的键，将它们联通值一起拷贝。
console.log('z:', z);

// 解构赋值要求等号右边是一个对象，如果等号右边是undefined或null就会报错，因为它们无法转为对象
// let { ...z } = null;
// let { ...z } = undefined

// 解构赋值必须是最后一个参数
// let { ...x, y, z } = someObject

// 解构赋值的拷贝是浅拷贝，如果一个键的值是复合类型的值(数组、对象、函数)，那么解构赋值拷贝的这个值的引用，而不是这个值的副本。
let ob = { a: { b: 1 } };
console.log('ob:', ob);
ob.a.b = 5;
let { ...t } = ob;
console.log('t:', t);
console.log('t.a:', t.a);
console.log('t.a.b:', t.a.b);

// 拓展运算符的解构赋值不能赋值继承自原型对象的属性
let o1 = { a: 1 };
let o2 = { b: 2 };
// 原型对象
o2.__proto__ = o1;
let { ...o3 } = o2;
console.log('o3:', o3);

// 变量声明语句之中，如果使用解构赋值，扩展运算符后面必须是一个变量名，而不能是一个解构赋值表达式。
// let {x, ...{y, z } } = o;
const o4 = Object.create({ xx: 1, yy: 3 });
console.log('o4:', o4);
let { xx, ...nen } = o4;
console.log('xx:', xx);
console.log('nen:', nen);
let { yy } = nen;
console.log('yy:', yy);

// 对象扩展运算符(...)用于取出参数对象的所有可遍历属性，拷贝到当前对象之中。
let zi = { ai: 3, bi: 4 };
let ni = { ...zi };
console.log('ni:', ni);

// 数组是特殊对象，对象的扩展运算符也可以用于数组
let aa = { ...['a', 'b', 'c'] };
console.log('aa:', aa);

// 扩展运算符后面是一个空对象没有任何效果
console.log({ ...{}, a: 1});

// 扩展运算符后面不是对象则会自动将其转为对象。该对象没有自身属性，所以返回一个空对象。
console.log({...1});
console.log({...Object(2)});
console.log({...true});
console.log({...undefined});
console.log({...null});
// 扩展运算符后面是字符串，自动转成一个类似数组的对象
console.log({...'hello'});

let ba = { b: 44 };
// 拷贝对象实例的属性
console.log({...ba});
console.log(Object.assign({}, ba));
// 克隆一个对象，拷贝对象原型的属性
const c1 = {
    __proto__: Object.getPrototypeOf(ba),
    ...ba
};
console.log('c1:', c1);

const c2 = Object.assign(Object.create(Object.getPrototypeOf(ba)), ba);
console.log('c2:', c2);

const c3 = Object.create(Object.getPrototypeOf(ba), Object.getOwnPropertyDescriptors(ba));
console.log('c3:', c3);

// 扩展运算符可以将两个对象合并为一个对象
let ca = { t: 44, yy: 7 };
let da = { ...ba, ...ca };
console.log('da:', da);
console.log(Object.assign({}, ba, ca));

// 对象的扩展运算符后面可以跟表达式
let dx = 10;
const dd = {
    ...(dx > 1 ? { qa: 4 } : {}),
    db: 55
};
console.log('dd:', dd);

// 扩展运算符的参数对象之中，如果有取值函数get，这个函数是会执行的
let dr = {
    get dr() {
        // throw new Error('not throw yet')
        return 44
    }
};
let ddr = { ...dr };
console.log('ddr:', ddr);

// 链判断运算符 optional chaining operator  ?.
const msg = {
    body: {
        user: {
            firstName: 'jack'
        }
    }
}
// ?.运算符，直接在链式调用的时候判断，左侧的对象是否是null或者undefined。如果是，就不宰往下运算，而是返回undefined。
// const firName = msg?.body?.user?.firstName || 'default';
// console.log('firName:', firName);  
// 短路机制，只要不满足条件就不再往下执行
// a?.[++x]
// 链判断运算符一旦为真，右侧的表达式就不再求值
// a == null ? undefined : a[++x]
// delete运算符
// delete a?.b
// a == null ? undefined : delete a.b
// 括号的影响
// (a?.b).c
// (a == null ? undefined : a.b).c

// 错误使用
// new a?.b() 构造函数
// a?.`{b}` 链判断运算符右侧有模板字符串
// super?.() 链判断运算符的左侧是super
// a?.b = c 链运算符用于赋值运算符左侧
// 右侧不得为十进制数值

// Null判断运算符
// 行为类似||，只有运算符左侧的值为null或者undefined的时候，才会返回右侧的值。




