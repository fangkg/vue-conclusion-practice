// 手写call
let obj = {
    msg: '王大锤'
}

function foo() {
    console.log(this.msg)
}
// 调用call的原理：将函数挂载到对象上，然后在对象中执行这个函数
foo.call(obj)
// 等价于：
// obj.foo = foo
// obj.foo()

Function.prototype.myCall = function(thisArg, ...args) {
    // 声明一个独有的Symbol属性，防止fn覆盖已有属性
    const fn = Symbol("fn");
    // 若没有传入this,默认绑定window对象
    thisArg = thisArg || window;
    // this指向调用者
    thisArg[fn] = this;
    // 执行当前函数
    const result = thisArg[fn](...args);
    delete thisArg[fn];
    return result;
}

foo.myCall(obj);