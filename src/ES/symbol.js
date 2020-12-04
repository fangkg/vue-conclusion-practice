/*
 * @Author: fangkg
 * @Date: 2020-12-04 11:43:34
 * @LastEditTime: 2020-12-04 13:45:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\ES\symbol.js
 */

// Symbol，保证对象的每个属性的名字都是独一无二的，防止属性名的冲突。
// JavaScript原始数据类型：undefined, null, 布尔值(Boolean), 字符转(String), 数值(Number), 对象(Object)
// Symbol值通过Symbol函数生成。
let s = Symbol();
console.log('s:', s);
// Symbol()函数前不能使用new命令，否则会报错。生成的Symbol是一个原始类型的值，不是对象。不能添加属性。
// Symbol()函数可以接受一个字符串作为参数，表示对Symbol实例的描述
let s1 = Symbol('foo');
let s2 = Symbol('bar');
console.log(s1);
console.log(s2);
console.log(s1.toString());
// Symbol()参数是一个对象，就调用该对象的toString()方法，将其转为字符串，然后生成一个Symbol值
const obj = {
    toString() {
        return 'abc';
    }
}
const ss = Symbol(obj);
console.log('ss:', ss);
// Symbol()函数的参数只是表示对当前Symbol值的描述，因此相同的参数的Symbol函数的返回值是不相等的。
console.log(Symbol() === Symbol());
console.log(Symbol('foo') === Symbol('foo'));

// Symbol值不能与其它类型的值进行运算会报错
// console.log('aa:' + Symbol());
// 但是Symbol()值可以显示转成字符串
console.log(String(Symbol()));
let sym = Symbol('mmmm');
console.log('str:', sym.toString())
// Symbol值可以转为布尔值
console.log('flag:', Boolean(sym));
console.log('flag:', !sym);
// 不能转为数值
// console.log(Number(sym));
// console.log(sym + 2);

// Symbol.prototype.description()
// 创建Symbol的时候可以添加一个描述
// Symbol实例的属性description返回Symbol的描述
const ssy = Symbol('ssy');
console.log(ssy.description);
// 作为属性名Symbol能防止某一个键被不小心改写或者覆盖
let a = {};
a[ssy] = 'hello';
console.log('a:', a);
let b = {
    [ssy]: 'world'
};
console.log('b:', b);
let c = {};
Object.defineProperty(c, ssy, { value: 'hello ssy' });
console.log(c);
console.log(c.ssy);
// Symbol值作为对象属性名时，不能用点运算符。因为点运算符后面总是字符串，所以不会读取ssy作为标识名所指代的那个值。
// 在对象内部使用Symbol值定义属性时，Symbol值必须放在方括号之中
// Symbol类型可以用于定义一组常量，保证这组常量的值都是不相等的。
const log = {};
log.levels = {
    DEBUG: Symbol('debug'),
    INFO: Symbol('info'),
    WARN: Symbol('warn')
}
console.log(log.levels.DEBUG)
