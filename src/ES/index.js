/*
 * @Author: fangkg
 * @Date: 2020-11-20 11:53:45
 * @LastEditTime: 2020-11-20 16:42:52
 * @LastEditors: Please set LastEditors
 * @Description: ES基础知识点
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\ES\index.js
 */




// JavaScript是一种弱类型脚本语言，弱类型指的是定义变量时不需要什么类型，在程序运行过程中会自动判断类型。
// 6中原始类型：Boolean, String, Number, Null, Undefined, Symbol
// typeof 判断原始数据类型
console.log(typeof null) // typeof的一个bug, null是原始值，非引用类型
console.log(typeof [1, 2]) // 引用类型除了function其它的全部都是object
console.log(Symbol())

// instanceof 用于实例和构造函数的对应
console.log([1, 2, 3] instanceof Array)

function Foo(name) {
    this.name = name
}
var foo = new Foo('bar');
console.log('foo:', foo);
console.log(typeof Foo);
console.log(foo instanceof Foo)

// 根据JavaScript中变量类型传递方式，分为值类型和引用类型。值类型包括Boolean, String, Number, Undefined, Null;引用类型包括Object类型的所有，如Date,Array,Function等。在参数传递上，值类型是按照值传递，引用类型是按照共享传递。
// 值类型,两者分别修改赋值，相互之间没有任何影响
var a = 10;
var b = a;
b = 20;
console.log(a);
console.log(b);

// 引用类型，c d都是引用类型，指向了同一个内存地址，两者的引用的是同一个值，因此d修改属性时，c的值也随之改动
var c = { x: 10, y: 20 }
var d  = c;
d.x = 100;
d.y = 200;
console.log(c)

function fooA(a) {
    a = a * 10;
}

function fooB(b) {
    b.value = 'new';
}
var aVal = 1;
var bVal = { value: 'old' };
fooA(aVal);
fooB(bVal);
// aVal的值没有发生变化 Number类型按值传递
console.log('aval:', aVal);
// bVal的值发生了改变 Object类型按共享传递
console.log('bVal:', bVal);

// JS中按值传递的类型，复制一份存入栈内存，这类类型一般不会占用太多内存，而且按值传递保证了其访问速度。
// 按共享传递的类型，复制其引用，保证过大的对象等不会因为不停复制内容而造成内存的浪费。

var obj = {
    a: 1,
    b: [1, 2, 3, 4]
}
var objA = obj.a;
var objB = obj.b;
objA = 3;
objB.push(55);
console.log(obj);
// obj本身是个引用类型的变量(对象)，但是内部的a是值类型，b是引用类型；a的赋值不会改变obj.a，但是b的操作却会反映到obj上

// 原型和原型链
// 所有的引用类型(数组、对象、函数)都具有对象特性，即可自由拓展属性(null除外)
// 所有的引用类型(数组、对象、函数)都有一个__proto__属性，属性值是一个普通的对象。
// 所有的函数都有一个prototype属性，属性值也是一个普通的对象
// 所有的引用类型(数组、对象、函数),'__proto__'属性值指向它的构造函数的prototype属性值

// 自由拓展属性
var objC = {};
objC.a = 100;
var arrC = [];
arrC.a = 100;
function fn() {}
fn.a = 100;

console.log(objC.__proto__)
console.log(Object.prototype)
console.log(arrC.__proto__)
console.log(Array.prototype)
console.log(fn.__proto__)
console.log(Function.prototype)
// 引用类型的__proto__属性值指向它的构造函数的prototype属性值
console.log(objC.__proto__ === Object.prototype)

// 构造函数
function FooD(name, age) {
    this.name = name
    this.age = age
}
FooD.prototype.alertName = function() {
    console.log(this.name)
}
// 创建实例
var objD = new FooD('张三');
objD.printName = function() {
    console.log(this.name)
}
objD.printName()
objD.alertName()
// 当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么会去它的'__proto__'即它的构造函数的prototype中寻找。因此objD.alertName()就会找到FooD.prototype.alertName
// 如何判断这个属性是不是对象本身的属性，使用hasOwnProperty，常用于遍历一个对象的时候
for(item in objD) {
    // 高级浏览器已经在for in中屏蔽了来自原型的属性，加上这个判断保证了程序的健壮性
    if (objD.hasOwnProperty(item)) {
        console.log(item)
    }
}

// 原型链，objD本身没有toString()，并且objD.__proto__(即FooD.prototype)中也没有toString。
// 当试图得到一个对象的某个属性时，如果这个对象本身没有这个属性，那么回去它的__proto__即它的构造函数的prototype中寻找。
objD.toString();
// 如果在objD.__proto__(即FooD)中没有找到toString，那么就继续去objD.__proto__.__proto__中寻找，因为objD.__proto__就是一个普通的对象
// objD.__proto__即FooD.prototype，没有找到toString 继续往上寻找
// objD.__proto__.__proto__即FooD.prototype.__proto__。FooD.prototype就是一个普通的对象，因此FooD.prototype.__proto__就是Object.prototype，在这里可以找到toString
// 这样一直往上找是一个链式的结构，所以叫原型链，如果一直找到最上层都没有找到返回undefined。最上层是Object.prototype__proto__ === null
// 所有从原型链或者更高级原型中得到、执行的方法，其中的this在执行时就指向了当前触发这个时间执行的对象

// 作用域、闭包 index.html

// 执行上下文
// 变量提升
console.log('objE', objE);
var objE = 111;

fnE('jack');
function fnE(name) {
    age = 30;
    console.log(name, age);
    var age;
}

// console.log('objF:', objF);
// objF = 100;
// 全局执行上下文，在一段js脚本执行之前，要先解析代码，解析的时候会先创建一个全局执行上下文环境。先把代码中即将中执行的变量、函数声明都拿出来。变量先暂时赋值为undefined,函数则先声明好可使用。这一步做完了再开始正式执行程序。
// objE是undefined objF却报错了 JS在代码执行之前要全文解析，发现var a知道有个a变量，存入了执行上下文。而objF却没有找到var关键字，这时候没有在执行上下文提前占位。所以代码执行的时候提前报道的objE是有记录的，只不过暂时还没有赋值即为undefined。而objF在执行上下文没有找到，自然就会报错。
// 函数执行上下文，一个函数在执行之前，也会创建一个函数执行上下文环境

// this,this的值是在执行的时候才能确认，定义的时候不能确认。因为this是执行上下文环境的一部分，执行上下文需要在代码执行之前确定，而不是在定义的时候。
var objG = {
    name: 'G',
    fn: function() {
        console.log(this.name)
        console.log('this:', this === objG)
    }
}
objG.fn()

objG.fn.call({ name: '改变G' })

var objH = objG.fn
objH() // 全局调用，此时this为全局对象window


// 作用域：一个独立的地盘，让变量不会外泄、暴露出去。js没有块级作用域，只有全局作用域和函数作用域
var objI = 100;
function fnI() {
    var objI = 200;
    console.log('fnI:', objI)
}
console.log('global:', objI);
fnI()

// 作用域链，当前作用域没有找到的变量向父级作用域寻找，父级没有再一层层向上寻找，直到找到全局作用域还是没有找到就宣布放弃。这种一层一层的关系就是作用域链。
// 自由变量，要得到objj变量，但是在当前作用域中没有定义objj，这样的变量称为自由变量。自由变量向父级作用域寻找。
var objj = 100;
function fnJ() {
    var objk = 200;
    console.log(objj);
    console.log(objk);
}
fnJ()

var objL = 222;
function fnL() {
    var objM = 55;
    function fnM() {
        var objN = 77;
        console.log(objL);
        console.log(objM);
        console.log(objN);
    }
    fnM()
}
fnL()

// 闭包
// 函数作为返回值
// 自由变量将从作用域链中去寻找，依据的是函数定义时的作用域链，而不是函数执行时的作用域链。
function fnO() {
    var objO = 99;
    return function() {
        console.log('objO', objO);
    }
}
var fO = fnO()

console.log('fO:', fO)
var objO = 888;
fO()

function fnP(fn) {
    var objO = 44;
    console.log(fn())
}
fnP(fO)

// 异步:中间步骤没有阻塞接下来程序的运行
console.log('333');
setTimeout(function() {
    console.log(666);
}, 1000)
console.log('555')

// 同步：中间步骤阻塞了后面程序的执行
console.log('234');
// alert('4556');
console.log('9876');

// JavaScript是单线程运行，即在同一时间只能做一件事
// var objP = true;
// setTimeout(function() {
//     objP = false;
// }, 100);
// while(objP) {
//     console.log('while')
// }
// JS是单线程，所以进入while循环之后，没有线程去跑定时器了，所以这个代码跑起来是个死循环。

// 前端异步场景：定时setTimeout,setInterval;网络请求如Ajax <img>加载
// img常用于打点统计
// console.log('img start');
// var img = document.createElement('img');
// img.onload = function() {
//     console.log('loaded');
//     img.onload = null;
// }
// console.log('end');

var arrQ = [1, 3, 66, 88];
// 普通JS函数
arrQ.map(function(item, index) {
    console.log(index)
    return item + 1;
})
// ES6箭头函数
arrQ.map((item, index) => {
    console.log(index)
    return item + 4;
})

// 箭头函数存在的意义：写起来更加简洁；解决ES6之前函数执行中this是全局变量的问题

function fnR() {
    console.log('fnR:', this)
    var arr = [2, 55, 77];
    // 普通JS，打印的是全局变量this
    arr.map(function(item) {
        console.log('R_this:', this);
        return item + 1;
    })
    // 箭头函数，打印出来的是父作用域的this
    arr.map(item => {
        console.log('=>:', this);
        return item + 3;
    })
}
fnR.call({ a: 44 })

// ES6 Module模块化 如果只是输出一个唯一的对象使用export default，如果要输出多个对象，import的时候要加{ ... }

// ES6 class取代之前构造函数初始化对象的形式，从语法上更加符合面向对象的写法
// JS构造函数的写法
function MathHandle(x, y) {
    this.x = x;
    this.y = y;
}
MathHandle.prototype.add = function() {
    return this.x + this.y;
}
var m = new MathHandle(1, 3);
console.log(m.add())

// Es6 class的写法
class MathAdd {
    // 构造器，初始化实例时默认执行
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    add() {
        return this.x + this.y;
    }
}
const mm = new MathAdd(5, 3);
console.log(mm.add())

// 继承
function Animal() {
    this.eat = function() {
        console.log('animal');
    }
}
function Dog() {
    this.bark = function() {
        console.log('dog');
    }
}
Dog.prototype = new Animal()
console.log('DOg:', Dog)
var hashiqi = new Dog()
console.log('hashiqi:', hashiqi)
console.log('bark:',hashiqi.bark())
console.log('eat:', hashiqi.eat())

// ES6 class实现继承
class Parent {
    constructor(name) {
        this.name = name;
    }
    smile() {
        console.log(`${this.name} smile`)
    }
}
// 使用extends即可实现继承，更加符合面向对象语法
class Child extends Parent {
    constructor(name) {
        // 字类constructor一定要执行super()以调用父类的constructor
        super(name);
        this.name = name;
    }

    laugh() {
        console.log(`${ this.name } laugh`);
    }
}

const ddd = new Child('lucy');
ddd.smile()
ddd.laugh()

// Set和Map
// Set类似于数组，但是数组允许元素重复，Set不允许元素重复
// Map类似于对象，但普通对象的key必须是字符串或数字，Map的key可以是任何数据类型
const set = new Set([1, 33, 66, 88]);
console.log(set);
// const addSet = new Set();
[22, 55, 1, 88, 5555, 333, 22, 77].forEach(item => set.add(item));
console.log('addSet:', set)
// size：获取元素的数量
// add(value):添加元素，返回Set实例本身
// delete（value):删除元素，返回一个布尔值，表示删除时候成功
// has(value):返回一个布尔值，表示该值是否是Set实例的元素
// clear()：清除所有元素，没有返回值

const s = new Set();
console.log(s.add(1).add(3).add(3));
console.log('size:', s.size)
console.log(s.has(1))
console.log(s.delete(1))
console.log(s.has(1))
s.clear()
console.log(s)

const setA = new Set([1, 33, 66, 88]);
console.log('keys:', setA.keys())
console.log('values:', setA.values())
console.log('entries:', setA.entries())
for(let item of setA.entries()) {
    console.log('item:', item)
}
setA.forEach((value, key) => {
    console.log(key + ':' + value)
})

// Map
const mapS = new Map();
const objS = {
    p: 'Hello'
}
mapS.set(objS, 'OK');
console.log('map:', mapS)
console.log('objS:', mapS.get(objS))
console.log('has:', mapS.has(objS))
console.log('delete:', mapS.delete(objS))
console.log('has:', mapS.has(objS))

// size设置成员的数量
// set设置成员的key 和 value
// get 获取成员的属性值
// has 判断成员是否存在
// delete删除成员
// clear 清空所有

const mapT = new Map();
mapT.set('aaa', 200);
mapT.set('bbb', 444);
console.log('T_size:', mapT.size);
console.log(mapT.get('aaa'))
console.log(mapT.has('aaa'))
console.log(mapT.delete('aaa'))
console.log(mapT.has('aaa'))
console.log(mapT.clear())

// Promise CommonJS提出的一种规范，可以将回调变成链式调用写法，流程更加清晰，代码更加优雅
// 三个状态：pending fulfilled rejected
// 两个过程 pending => fulfilled (resolve);pending => rejected(reject)
// 一个方法 then