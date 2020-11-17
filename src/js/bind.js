// 手写bind
Function.prototype.myBind = function(thisArg, ...args) {
    // this指向thisArg调用者
    let self = this;
    let fnBound = function() {
        // this instanceof self ? this : thisArg判断是构造函数还是普通函数
        // args.concat(Array.prototype.slice.call(arguments)) 利用函数柯里化来获取调用时传入的参数
        self.apply(this instanceof self ? this : thisArg, args.concat(Array.prototype.slice.call(arguments)));
    }

    // 继承原型上的属性和方法
    fnBound.prototype = Object.create(self.prototype);
    // 返回已经绑定的函数
    return fnBound;
}

let obj = {
    msg: "手写bind"
}

function foo() {
    console.log(this.msg)
}

foo.myBind(obj, 1, 2, 3)()

// 通过构造函数调用
function fn() {
    this.test = "测试数据";
}

fn.prototype.protoData = "原型数据";
let fnBound = fn.myBind(obj, "giao", 18);
let newBind = new fnBound();
console.log(newBind.protoData)


// foo.bind(A).bind(B).bind(C)  bind是永久绑定，往后的操作都不会再更改其指向
let param1 = { a: 1 };
let param2 = { a: 2 };
let param3 = { a: 3 };
let param4 = { a: 4 };

function func() {
    console.log('a:', this.a)
}

let boundFn = func.bind(param1).bind(param2).bind(param3);
// boundFn()
boundFn.call(param4);
// boundFn()
boundFn.apply(param4);
boundFn()