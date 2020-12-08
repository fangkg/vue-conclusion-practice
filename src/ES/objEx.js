/*
 * @Author: fangkg
 * @Date: 2020-12-08 10:02:24
 * @LastEditTime: 2020-12-08 11:27:24
 * @LastEditors: Please set LastEditors
 * @Description: 对象方法
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\ES\objEx.js
 */

// == 相等运算符，会自动转换数据类型
// === 严格相等运算符，NaN不等于自身， +0等于-0.
// 同值相等 Object.is()
console.log(Object.is(NaN, NaN));
console.log(Object.is(+0, -0));
console.log(Object.is({}, {}));

// Object.assign() 对象的合并，将源对象(source)的所有可枚举属性复制到目标对象target
const tar = { a: 1 };
const src = { b: 3 };
console.log(Object.assign(tar, src));
// 如果目标对象与源对象有同名的属性，或者多个源对象有同名的属性，则后面的属性会覆盖前面的属性

// 只有一个参数
console.log(Object.assign({ c: 4 }));
console.log(Object.assign(tar) === tar);
// 如果参数不是对象，先转为对象然后返回
console.log('type:', typeof Object.assign(4));

// null, undefined无法转为对象，所以它们作为参数会报错
// console.log(Object.assign(undefined));
// console.log(Object.assign(null));

// 如果非对象参数出现在源对象的位置(即非首参数)，那么处理规则有所不同。首先，这些参数都会转成对象，如果无法转成对象，就会跳过。
// 如果undefined和null不在首参数，就不会报错
let oo = { oo: 4 };
console.log(Object.assign(oo, undefined) === oo);
console.log(Object.assign(oo, null) === oo);

// 其它类型的值(数值、字符串、布尔值)不在首参数，也不会报错。除了字符串会以数组形式，拷贝入目标对象，其它值都不会产生效果。
const v1 = 'abcdef';
const v2 = true;
const v3 = 10;
console.log(Object.assign({}, v1, v2, v3));
// 只有字符串的包装对象会产生可枚举属性
// 布尔值，数值，字符串分别转为包装对象，可以看到它们的原始值都在包装对象的内部属性[[PrimitiveValue]]上面，这个属性会被Object.assign()拷贝。
console.log(Object(true));
console.log(Object(10));
console.log(Object('fgs'));

// Object.assign() 拷贝的属性有限制，只拷贝 源对象的自身属性，不拷贝继承属性，也不拷贝欸不可枚举的属性(enumerable: false);
console.log(Object.assign({ b: 'b' }, Object.defineProperty({}, 'invisible', {
    enumerable: false,
    value: 'hello'
})))
// 属性名为Symbol值的属性也会被Object.assign()拷贝。
console.log(Object.assign({ a: 'a' }, { [Symbol('c')]: 'c' }));

// 浅拷贝
// 源对象某个属性的值是对象，目标对象拷贝得到的是这个对象的引用。这个对象的任何变化都会反应到目标对象上面。
const d1 = { a: { b: 3 } };
const d2 = Object.assign({}, d1);
d1.a.b = 0;
console.log('d2:', d2);

// 同名属性替换
const f1 = { a: { b: 'c', d: 'd' } };
const f2 = { a: { b: 'hello' } };
// target对象的a属性被整个替换掉了
console.log(Object.assign(f1, f2));

// 数组的处理
// 把数组视为属性名0、1、2的对象，源数组的0号属性7覆盖了目标数组的0号属性1
console.log(Object.assign([1, 2, 4, 5], [7, 8, 9]));

// 取值函数的处理
const s1 = {
    get s1() {
        return 1;
    }
}
const tt = {};
// Object.assign() 只能进行值的复制，如果要复制的值是一个取值函数，那么将求值后再复制
console.log(Object.assign(tt, s1));

// 为对象添加属性
class Point {
    constructor(x, y) {
        Object.assign(this, {x, y});
    }
}
console.log(new Point(2, 5));

// 为对象添加方法
Object.assign(Point.prototype, {
    fn(arg1, arg2) {
        console.log(arg1, arg2);
    }
})
console.log(new Point(3, 5));
console.log(new Point(6, 8).fn(2, 4));

// 克隆对象
function clone(origin) {
    // 将原始对象拷贝到一个空对象，得到原始对象的克隆。只能克隆原始对象自身的值，不能克隆它继承的值。
    return Object.assign({}, origin);
}
console.log(clone({ ff: 44 }));
// 克隆时保持继承链
function cloneDep(origin) {
    let originProto = Object.getPrototypeOf(origin);
    console.log('originProto:', originProto);
    return Object.assign(Object.create(originProto), origin);
}
console.log(cloneDep({tt: 5}))

// 合并多个对象
const merge = (target, ...sources) => Object.assign(target, ...sources);
console.log(merge({tt: 4, y: 7, w: 2}))
// 合并后返回一个新对象
const mm = (...sources) => Object.assign({}, ...sources);
console.log(mm({a: 55, w: 5, q: 6, u: 7}));

// 为属性指定默认值
// 由于浅拷贝的问题，DEFAULTS对象和options对象的所有属性的值最好是简单类型，不要指向另一个对象。属性值为引用类型时，合并会把整个属性值覆盖。
const DEFAULTS = {
    level: 5,
    mat: 'html'
};
function pcc(options) {
    return options = Object.assign({}, DEFAULTS, options);
}
console.log(pcc({ o: '77' } ));

// Object.getOwnPropertyDescriptor() 返回某个对象属性的描述对象descriptor
// Object.getOwnPropertyDescriptors() 返回指定对象所有自身属性(非继承属性)的描述对象
const ooo = {
    ooo: 123,
    get fff() {
        return 'fff';
    }
}
console.log(Object.getOwnPropertyDescriptor(ooo));
// 返回一个对象，所有原对象的属性名都是该对象的属性名，对应的属性值就是该属性的描述对象
console.log(Object.getOwnPropertyDescriptors(ooo));
function getOwnPropertyDescriptors(obj) {
    const result = {};
    for (let key of Reflect.ownKeys(obj)) {
        console.log('descriptor:', Object.getOwnPropertyDescriptor(obj, key));
        result[key] = Object.getOwnPropertyDescriptor(obj, key);
    }
    return result;
}
console.log(getOwnPropertyDescriptors({ 'ff': 66, 'rr': 8, 'q': 5 }));

// Object.assign() 无法正确拷贝get属性和set属性
// Object.assign()将这个属性拷贝给yy对象，结果该属性变成了undefined。这是因为Object.assign()方法总是拷贝一个属性的值，而不会拷贝它背后的赋值方法或者取值方法。
const st = {
    set sss(value) {
        console.log('value:', value);
    }
}
const yy = {};
Object.assign(yy, st);
console.log(yy);
console.log(Object.getOwnPropertyDescriptor(yy, 'sss'));

// 实现正确拷贝
const fu = {
    u: 'ee',
    set fu(value) {
        console.log('fu:', value);
    }
}
const ji = {};
Object.defineProperties(ji, Object.getOwnPropertyDescriptors(fu));
console.log(Object.getOwnPropertyDescriptors(ji, 'fu'));

// 两个对象合并
const shalloMerge = (target, source) => Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
const kk = { k: 7, u: 9 };
shalloMerge(kk, fu);
console.log('kk:', kk);

// Object.getOwnPropertyDescriptors()配合Object.create()方法将对象属性克隆到一个新对象
const ccc = Object.create(Object.getPrototypeOf(kk), Object.getOwnPropertyDescriptors(kk));
console.log('ccc:', ccc);

const cdd = (obj) => Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
console.log(cdd(kk));

// Object.getOwnPropertyDescriptors() 实现一个对象继承另外一个对象
// const ooi = {
//     __proto__: inherit,
//     foo: 123
// }
// ES6规定__proto__只有浏览器要部署，其它环境不部署。
// 去掉__proto__
const ew = Object.create(kk);
console.log('ew:', ew);
console.log('kk:', kk);
ew.foo  = 90;
console.log('ew:', ew);

// JavaScript语言的对象继承是通过原型链来实现。
// __proto__属性(内部属性)，用来读取或者设置当前对象的原型对象(prototype)
// Object.setPrototypeOf() 写操作
// Object.getPrototypeOf() 读操作
// Object.create() 生成操作
function isObject(value) {
    return Object(value) === value;
}
Object.defineProperty(Object.prototype, '__proto__', {
    get() {
        let _thisObj = Object(this);
        return Object.getPrototypeOf(_thisObj);
    },
    set(proto) {
        if (this === undefined || this === null) {
            throw new TypeError();
        }
        if (!isObject(this)) {
            return undefined;
        }
        if (!isObject(proto)) {
            return undefined;
        }
        let status = Reflect.setPrototypeOf(this, proto);
        if (!status) {
            throw new TypeError();
        }
    }
})


// 一个对象本身部署了__proto__属性，该属性的值就是对象的原型。
