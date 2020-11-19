// this是声明函数时附加的参数，指向特定的对象，也就是隐藏参数。
// this提供了一种更加优雅的方式来隐式的传递对象应用。
// this的指向在函数声明的时候是不会被确定的，只有在函数执行的时候才被确定，this最终指向的是调用它的对象。
// 非严格模式下，浏览器的尽头当然是window
// 严格模式下就开启了"use strict"的情况，尽头就是undefined
// node的全局环境中尽头是global
function demo() {
    var user = 'jack';
    console.log('this.user:', this.user);
    console.log('-------------------------------------------')
    console.log('this:', this);
    console.log('-------------------------------------------')
    console.log('user:', user);
}
demo();
// window.demo();

var obj = {
    user: 'lucy',
    fn: function() {
        // this指向对象obj
        console.log(this.user);
    }
}
obj.fn()

var test = {
    a: 1,
    b: {
        a: 3,
        fn: function() {
            console.log(this.a)
        }
    }
}
test.b.fn()

// 一个函数中有this，但是它没有被上一级对象引用，在非严格模式下this指向window
// 一个函数中有this，这个函数又被上一级的对象引用，那么this就会指向上一级对象

var jack = {
    a: 1,
    b: {
        fn: function() {
            // this指向对象b,对象b中没有属性a,所以this.a的结果为undefined
            console.log(this.a)
        }
    }
}
jack.b.fn()

console.log('+++++++++++++++++++++++++++++++++++')
var lucy = {
    a: 1,
    b: {
        a: 2,
        fn: function() {
            console.log(this.a);
            // this指向的是window
            console.log(this);
        }
    }
}
// fn函数赋值给变量fn的时候并没有执行
var fn = lucy.b.fn;
// 此时是window在执行fn()
fn()

console.log('===============================')
function returnThis() {
    console.log(this)
    return this;
}
var rose = { name: "玫瑰" };
returnThis();
returnThis.call(rose);
returnThis.apply(rose);
// Object.prototype.call()和Object.prototype.apply()可以通过参数来指定this


console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@');
function backThis() {
    console.log(this);
    return this;
}
var woer = { name: 'woer' };
var backThisFn = backThis.bind(woer);
console.log('backThisFn:', backThisFn);
console.log('fnRes:', backThisFn());
var bill = { name: 'bill' };
backThisFn.call(bill);
// Object.prototype.bind()通过一个新函数来提供了永久的绑定，而且会覆盖call和apply的指向

function NewFn() {
    this.user = 'new';
}
var newObj = new NewFn();
console.log(newObj.user)
// new关键字改变了this的指向，new关键字创建了一个对象实例，可以通过对象点语法点出函数Fn里面的user，这个this指向对象demo
console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
function NewDemo() {
    console.log(this);
}
NewDemo()
new NewDemo()
var huo = { name: "huo" };
NewDemo.call(huo);
var huo2 = NewDemo.bind(huo);
huo2();
new huo2();
console.log('&&&&&&&&&&&&&&&&&&&&')
function returnFn() {
    this.user = 'return';
    return {};
}
var returnA = new returnFn;
console.log(returnA.user)

function returnFn1() {
    this.user = 'fn';
    return function() {};
}
var returnB = new returnFn1;
console.log(returnB.user)

function returnFn2() {
    this.user = 'fn2';
    return 2;
}
var returnFnC = new returnFn2;
console.log(returnFnC.user)

function returnFn3() {
    this.user = 'fn3';
    return undefined;
}
var returnFnD = new returnFn3;
console.log(returnFnD.user)

function returnFn4() {
    this.user = 'fn4';
    return null;
}
var returnFnE = new returnFn4;
console.log(returnFnE.user)
// 函数中包含return,如果返回值是一个对象，那么this指向就是返回的对象；null比较特殊，虽然它是对象，但是这里this还是指向那个函数的实例。如果返回值不是一个对象，那么this还是指向函数的实例。