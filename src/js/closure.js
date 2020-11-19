// 闭包：当函数可以记住并访问所在的词法作用域时，就产生了闭包，及时函数是在当前此法作用域之外执行。
function demo() {
    var a = 1;
    return function() {
        return a;
    }
}
var a = demo();
console.log(a());
// 闭包由函数、创建该函数的环境构成。环境由闭包创建时在作用域中的任何局部变量组成。
// 外部函数调用之后其变量对象本应该被销毁，但闭包阻止了它们的销毁，仍然可以访问外部函数的变量对象。创建一个闭包，函数的作用域就会一直保存到闭包不存在为止。
function addCalculator(x) {
    return function(y) {
        return x + y;
    }
}
var add1 = addCalculator(2);
console.log('add1:', add1)
console.log('addRes:', add1(4))
// 释放对闭包的引用
add1 = null;
// TypeError: add1 is not a function
// console.log(add1(7));

// 模块模式
var calculator = (function() {
    var a = 1;
    function addCalculate(val) {
        a += val;
    }
    return {
        add1: function() {
            addCalculate(1);
        },
        add2: function() {
            addCalculate(2);
        },
        result: function() {
            return a;
        }
    }
})();
console.log('calculator:', calculator)
console.log('result:', calculator.result())
calculator.add1()
console.log(calculator.result())
calculator.add2()
console.log(calculator.result())