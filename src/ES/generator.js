/*
 * @Author: fangkg
 * @Date: 2020-12-01 15:03:27
 * @LastEditTime: 2020-12-01 16:10:34
 * @LastEditors: Please set LastEditors
 * @Description: Generator函数的异步应用
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\ES\generator.js
 */

// Generator函数是一个状态机，封装了多个内部状态
// 执行Generator函数会返回一个遍历器对象，Generator函数除了状态机，还是一个遍历器对象生成函数。
// Generator函数两个特征：function关键字与函数名之间有一个星号；函数体内部使用yield表达式，定义不同的内部状态。
function* helloWorldGenerator() {
    yield 'hello';
    yield 'world';
    return 'ending';
}
let hw = helloWorldGenerator();
// Generator()函数调用后并不执行，返回的也不是函数运行的结果，而是一个指向内部状态的指针对象Iterator Object。
// 调用遍历器对象的next()方法，使得指针移向下一个状态。每次调用next()内部指针就从函数头部或者上一次停下来的地方开始执行，直到遇到下一个yield表达式或return语句为止。
// Generator()函数是分段执行的，yield表达式是暂停执行的标记，next()方法可以恢复执行。
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());
console.log(hw.next());

// yield表达式
// 暂停标志
// return
// yield和return都能返回紧跟在语句后面的哪个表达式的值。区别在于每次遇到yield，函数暂停执行，下一次再从该位置继续向后执行，return语句不具备记忆的功能。
// 一个函数中只能执行一次return语句，(或者说只有一个return语句)但是可以执行多次yield表达式。

// Generator() 与 Iterator接口
// 任意一个对象的Symbol.iterator方法，等于该对象的遍历器生成函数，调用该函数会返回该对象的一个遍历器对象。
var myIterable = {};
// Generator函数赋值给Symbol.iterator属性，从而使得myIterable对象具有了Iterator接口，可以被...运算符遍历了。
myIterable[Symbol.iterator] = function* () {
    yield 1;
    yield 2;
    yield 3;
}
console.log('myIterable:', myIterable);
console.log([...myIterable]);

function* gen() {
    yield 1;
    return 4;
}
console.log('gen:', gen);
// gen()是一个Generator函数，调用它会生成一个遍历器对象g，它的Symbol.iterator属性也是一个遍历器对象生成函数，执行后返回它自己。
let g = gen();
console.log('g:', g);
console.log('ee:', g[Symbol.iterator]() === g)

function* f() {
    for(let i = 0; true; i++) {
        let reset = yield i;
        if (reset) {
            i = -1;
        }
    }
}
let ff = f();
// next()方法没有参数，每次运行到yield表达式，变量reset的值都是undefined。
console.log(ff.next());
console.log(ff.next());
// next()方法带一个参数true时，变量reset被重置为这个参数true。
console.log(ff.next(true));
// Generator函数从暂停状态到恢复运行，它的上下文状态context是不变的。通过next()方法的参数，有办法在Generator()函数开始运行之后，继续向函数体内部注入值。
// 可以在Generator()函数运行的不同阶段从外部向内部注入不同的值，从而调整函数的行为。

function* ffo(x) {
    let y = 2 * (yield (x + 1));
    let z = yield(y / 3);
    return (x + y + z);
}

// let ra = ffo(5);
// console.log(ra.next());
// console.log(ra.next());
// console.log(ra.next());

let rb = ffo(5);
console.log('rb:',rb.next());
console.log('rb:',rb.next(12));
console.log('rb:',rb.next(13));
// next()方法的参数是上一个yield表达式的返回值，所以第一次使用next()传参是无效的。
// 从语义上讲，第一个next()方法用来启动遍历器对象，所以不用带有参数。

// for of 循环
function* fof() {
    yield 1;
    yield 2;
    yield 3;
    yield 4;
    yield 5;
    return 6;
}
for(let v of fof()) {
    console.log('v:', v);
}
// 一旦next()方法返回的对象的done属性为true,for...of循环就会终止，且不包含该返回对象。

// Generator()函数和for...of循环实现斐波那契
function* fib() {
    let [prev, curr] = [0, 1];
    for(;;) {
        yield curr;
        [prev, curr] = [curr, prev + curr];
    }
}
for(let n of fib()) {
    if (n > 1000) {
        break;
    }
    console.log('n:', n);
}