// 模拟实现一个new操作符，传入一个构造函数和参数
function myNew(constructFn, ...args) {
    // 创建对象并继承构造方法的prototype属性
    // 把obj挂在原型链上，相当于obj._proto_ = constructFn.prototype
    let obj = Object.create(constructFn.prototype);
    // 执行构造函数将args参数传入，主要是为了进行赋值this.name = name等操作
    let res = constructFn.apply(obj, args);
    // 确保返回值是一个对象
    return res instanceof Object ? res : obj
}

function Dog(name) {
    this.name = name;

    this.woof = function() {
        console.log('spark');
    }
}

let dog = new Dog('二哈');
console.log('name:', dog.name)
dog.woof()

let dog2 = myNew(Dog, '泰迪');
console.log(dog2.name);
dog2.woof()