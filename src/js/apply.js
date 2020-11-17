// 手写apply args传入一个数组的形式，原理齐时和call差不多，只是入参不一样
Function.prototype.myApply = function(thisArg, args = []) {
    const fn = Symbol("fn");
    thisArg = thisArg || window;
    thisArg[fn] = this;
    // 虽然apply()接收的是一个数组，但在调用原函数的时候依然要展开参数数组
    const result = thisArg[fn](...args);
    delete thisArg[fn];
    return result;
}

let obj = {
    msg: '手写apply'
}

function foo() {
    console.log(this.msg)
}

foo.myApply(obj);