// 函数是对象的一个子类型
var o = {};
var f = function () {};
console.log('o:', typeof o);
console.log('f:', typeof f);

// js中检测对象类型使用Object.prototype.toString()方法，typeof的一些返回值在标准文档中并未定义，因此不同的引擎表现可能不同。
// 函数对象天生带有prototype属性，每个函数在创建之后会天生拥有一个与之相关联的原型对象，这个原型对象中拥有一个constructor属性，该属性指向这个函数。这里的constructor属性是从原型链中获取。即Function.prototype.constructor

// 原型对象：当构造函数被创建出来的时候，会默认关联一个Object类型的新对象，这个对象就是当前构造函数的原型对象，构造函数的原型对象默认是一个空对象。构造函数创建出来的对象可以访问该构造函数原型对象的属性和方法。


// -------------------------------------------------------------------------------
// 声明构造函数Man
function Man(name) {
    this.name = name;
}
// 打印Man原型对象 => Object类型的空对象
console.log('Man:', Man.prototype)
// 在Man的原型对象上添加getName方法
Man.prototype.getName = function() {
    console.log('name:', this.name);
}
// 使用构造函数创建对象实例
var d = new Man("滴滴");
d.getName()
console.log('d:', Object.getPrototypeOf(d))
console.log('i:', d.__proto__)
console.log('M:', Man.prototype)
console.log('C:', Man.prototype.constructor)

// 总结：构造函数Man可以通过prototype属性访问它的原型对象；通过构造函数Man实例化出来的d可以通过_proto_属性访问到Man的原型对象；Man的原型对象可以通过constructor构造器属性访问其关联的构造函数。
// 访问原型对象：1、构造函数.prototype 2、实例对象._proto_ 3、object.getPrototypeof(实例对象)
// prototype：函数对象拥有的属性，指向它的原型对象
// proto：__proto__所有的对象都拥有__proto__属性，指向实例的原型
// constructor：构造器，原型对象可以通过constructor来访问其所关联的构造函数。每个实例也从原型中继承了该属性。
// ---------------------------------------------------------------------------------



// 原型链
function Men() {}
function Women() {}

var men = new Men();
var women = new Women();

console.log('men:', men.__proto__)
console.log('Men:', Men.prototype)
console.log('Women:', Women.prototype.constructor)

console.log("Object:", Object)
console.log("Object.prototype:", Object.prototype)
// 原型链的顶端null
console.log('Object.prototype.__proto__:', Object.prototype.__proto__)

console.log('Function:', Function)
console.log('Function.prototype:', Function.prototype)
console.log('Function.prototype.__proto__', Function.prototype.__proto__)
// Function.prototype的原型对象为Object.prototype而不是它自己
console.log(Function.prototype.__proto__ == Object.prototype)
// Function和Object的构造函数都是Function
console.log(Function.constructor == Function)
console.log(Object.constructor == Function)
// Function.prototype的构造函数是Function
console.log(Function.prototype.constructor == Function)

// 原型链访问规则
// 就近原则：对象在访问属性或方法时，先检查自己的实例，如果存在就直接使用。如果不存在就去原型对象上找，存在就直接使用，如果没有就顺着原型链一直往上找，找到即使用，找不到就重复该过程直到原型链的顶端，如果还没有找到相应的属性和方法就返回undefined报错。


// 三种检验方式
// 1、Object.getPrototypeof()方法用于获取指定实例对象的原型对象
function Demo() {}
var demo = new Demo();
// 打印Demo相关联的原型对象
console.log('Object.getPrototypeOf():', Object.getPrototypeOf(demo))
console.log('Demo.prototype:', Demo.prototype)
console.log('Demo.__proto__:', Demo.__proto__)
console.log('deom.__proto__:', demo.__proto__)

// 2、isPrototypeOf()用于检查某对象是否在指定对象的原型链中
console.log(Demo.prototype.isPrototypeOf(demo));
console.log(Object.prototype.isPrototypeOf(demo));

// 3、instanceof 运算符的作用跟isPrototypeOf()方法类似，左操作数是待检测的实例对象，右操作数是用于检测的构造函数。如果右操作数指定构造函数的原型对象在左操作数实例对象的原型链上面结果返回true，否则返回false。
console.log(demo instanceof Demo);
console.log(demo instanceof Object);
console.log(Function instanceof Object);
console.log(Object instanceof Function)
// 总结：instanceof检查的是实例对象是否从当前指定构造函数的原型对象继承属性。


// 父类型
function SuperClass(name) {
    this.name = name;
    this.showName = function () {
        console.log(this.name);
    }
}
// 设置父类型的原型属性和方法
SuperClass.prototype.info =  '信息';
SuperClass.prototype.showInfo = function () {
    console.log(this.info);
}
// 提供子类型
function SubClass(name) {
    SuperClass.call(this, name);
}

// SubClass.prototype = SuperClass.prototype;
// SubClass.prototype.constructor = SubClass;

var sub_one = new SubClass("jack");
var sub_two = new SubClass("lucy");
console.log('one:', sub_one);
console.log('two:', sub_two)