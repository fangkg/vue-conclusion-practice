// 数组去重

let arr = [1, 1, '1', '1', null, null, undefined, undefined, /a/, /a/, NaN, NaN, {}, {}, [], []]

// 1、去除基本类型数据
// 1.1、使用Set
let resSet = [...new Set(arr)];
console.log('resSet:', resSet);

// 1.2、使用filter indexOf()查找元素第一次在数组里出现的下标
let resFilter = arr.filter((item, index) => {
    return arr.indexOf(item) === index
})
console.log('resFilter:', resFilter)

// 1.3、使用reduce
let resReduce = arr.reduce((pre, cur) => {
    return pre.includes(cur) ? pre : [...pre, cur]
}, [])
console.log('resReduce:', resReduce)

// 2、去除引用类型的重复值
// 2.1、利用对象的hasOwnProperty方法进行判断对象上是否含有该属性，如果有则过滤掉，不含有则返回新数组中
let obj = {};
let resObj = arr.filter(item => {
    console.log('item:', (typeof item + item))
    if (obj.hasOwnProperty(typeof item + item)) {
        return false;
    } else {
        obj[typeof item + item] = true;
        return true;
    }
})
console.log('resObj:', resObj);

// 数据类型检查
console.log('type:', typeof 1, typeof '1', typeof undefined, typeof true, typeof Symbol())

// Object.prototype.toString.call 检测数据类型最佳方案
function checkType(param) {
    // return Object.prototype.toString.call(param);
    return Object.prototype.toString.call(param).slice(8, -1).toLowerCase();
}
console.log(checkType(123));
console.log(checkType('123'));
console.log(checkType(true));
console.log(checkType({ a: 123 }))
console.log(checkType(() => {}))
console.log(checkType(Symbol(1)));
console.log(null);
console.log(undefined);

// Object.is 和 ===的区别
// Object.is在严格等于上的基础修复了一些特殊情况下的错误，比如NaN不等于NaN
function is(x, y) {
    console.log('+-Infinity:', 1 / +0, 1 / -0)
    if (x === y) {
        return x !== 0 || y !== 0 || x / 0 === y / 0;
    }
}

console.log('is:',is(NaN, NaN));

// == 和 === 的区别和隐式数据类型转化
// ===严格相等，左右两边值相等、类型相等
console.log('1' === 1)
// ==只要值相等就返回true，而且使用==时会发生隐式类型转换。在js中，当运算符在运算时，如果两边数据不统一，CPU就无法运算，这是编译器会自动将运算符两边的数据做一个数据类型转化，转成一样的数据类型再计算。
// 转成string类型：+字符串连接符如1 + "1" = "11"
// 转成number类型：++、--(自增自减运算符)、+、-、*、/、%、>、<
let i = '1';
console.log(++i);
// 转成boolean类型，使用Boolean转化除了0、-0、NaN、undefined、null、“”(空字符串)、false、document.all()得到false以外，其它情况都是true;
// 如果其中一方为Object，另一方为String、Number、Symbol，会将Object转换成字符串，再进行比较
console.log(1 + 'true');
console.log(1 + true);
console.log(1 + undefined);
console.log(1 + null);
// '2'.charAtCode()
console.log('2' > 5);
console.log('2' > '5');
console.log('abc' > 'b');

// 无视规则，自称体系
console.log(NaN == NaN);
console.log(undefined == undefined);
console.log(undefined === undefined);
console.log(undefined == null);
console.log(undefined === null)

// 复杂的数据类型：对象、数组，先使用valueOf()取得原始值，如果原始值不是number类型，则调用toString()方法转成字符串类型valueOf=> toString
console.log('valueOf:', [1,2] == '1,2')

let a = {};
console.log(a == "[object Object");

// 对象转原始类型，会调用内置的[ToPrimitive]函数
// 如果有设置Symbol.toPrimitive()方法，会优先调用并返回数据
// 调用valueOf()，如果转换为原始类型，则返回
// 调用toString()，如果转换为原始类型，则返回
// 如果没有原始类型，则报错
let objToPrimitive = {
    value: 3,
    valueOf() {
        return 4;
    },
    toString() {
        return 5;
    },
    [Symbol.toPrimitive]() {
        return 6;
    }
}
console.log('toPrimitive:', objToPrimitive + 1)

// 让if(a == 1 && a == 2 && a == 3)成立， 每次调用这个aa对象的时候都会在0的基础上加1，调用3次后就变成了3
let aa = {
    value: 0,
    valueOf() {
        return ++aa.value;
    }
}
console.log('123:', aa == 1 && aa == 2 && aa == 3)

// 如果是数组和对象与number类型比较，先用valueOf()取得原始值，原始值不是number类型则调用toString(),然后再将字符串类型用Number()转成数字类型，调用顺序为valueOf() => toString() => Number()
// 空数组的toString()方法会得到空字符串，而空对象的toString()方法会得到字符串[object Object]

console.log('[]', [] == 0)
console.log(![] == 0)
console.log({} == !{})
console.log([] == ![])

// 引用类型数据存储在堆中的地址，左右两边分别属于两块不同的空间
console.log([] == [])
console.log({} == {})

// typeof
console.log('------typeof------')
console.log(typeof null);
// 从右往左看 右边typeof null整体返回object字符串，再将整体看成typeof object结果为string 
console.log(typeof typeof null);
console.log(typeof typeof typeof null);

