/*
 * @Author: fangkg
 * @Date: 2020-11-27 09:17:37
 * @LastEditTime: 2020-11-27 11:51:39
 * @LastEditors: Please set LastEditors
 * @Description: 对象、类与面向对象编程
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\ES\object.js
 */

// 创建对象
// 创建一个Object的新实例，然后给它添加属性和方法
let person = new Object();
person.name = "Nicholas";
person.age = 25;
person.sayName = function() {
    console.log('person:', this.name);
}
// 对象字面量
let per = {
    name: 'jack',
    age: 23,
    sayName() {
        console.log('per:', this.name);
    }
}
console.log(per.sayName());

// 属性类型
// 使用一些内部特性来描述属性的特征。这些特性是为JavaScript实现引擎的规范定义的。开发者不能在JavaScript中直接访问这些属性。将某个属性标识为内部特性，规范会用两个中括号把特性的名称括起来，比如[[Enumerable]]
// 数据属性：包含一个保存数据值的位置，值会从这个位置读取，也会写入到这个位置。
// [[Configurable]]：属性是否可以通过delete删除并重新定义，是否可以修改它的特性，是否可以把它改为访问其属性。默认情况下所有直接定义在对象上的属性的这个特性都是true;
// [[Enumerable]]：属性是否可以通过for-in 循环返回。默认情况下所有直接定义在对象上的属性的这个特性都是true;
// [[writable]]：属性是否可以被修改。默认为true
// [[value]]：包含属性实际的值。读取和写入属性值的位置。默认为undefined

// 修改属性的默认特性
// Object.defineProperty(要给其添加属性的对象，属性的名称，描述符对象);
// 描述符对象上的属性可以包含：configurable，enumerable，writable，value
let jack = {};
Object.defineProperty(jack, 'name', {
    writable: false,
    value: 'jack'
})
console.log('jack:', jack.name);
person.name = 'lucy';
console.log('jack:', jack.name);
// writable被设置为false，这个属性值不能再修改，严格模式下尝试修改只读属性会抛出错误

let lucy = {};
Object.defineProperty(lucy, 'name', {
    configurable: false,
    value: 'lucy'
})
console.log('lucy:', lucy.name);
delete lucy.name;
console.log('lucy:', lucy.name);
// configurable设置为false，这个属性不能从对象上删除。非严格模式调用delete没有效果，严格模式下会抛出错误
// 一个属性被定义为不可配置之后，就不能再变回可配置。再次调用Object.defineProperty()并修改任何非writable属性会导致错误

// 调用Object.defineProperty()时，configuable，enumerable，writable的值如果不指定，默认为false

// 访问器属性
// 不包含数据值，包含一个获取getter函数和一个设置setter函数。在读取访问器属性时，会调用获取函数，返回一个有效的值。在写入访问器属性时，会调用设置函数并传入新值，这个函数必须决定对数据做出什么修改。
// 访问器属性有4个特性描述它们的行为[[Configurable]]，[[Enumerable]]，[[Get]]，[[Set]]
// 访问器属性不能直接定义，必须使用Object.defineProperty()
let book = {
    year_: 2017,
    edition: 1
}
Object.defineProperty(book, 'year', {
    get() {
        return this.year_;
    },
    set(newVal) {
        if (newVal > 2017) {
            this.year_ = newVal;
            this.edition += newVal - 2017;
        }
    }
})
console.log('book edition:', book.edition);
book.year = 2019;
console.log('book edition:', book.edition);
// 对象book有两个默认属性：year_和edition，year_中的下划线常用来标识该属性并不希望在对象方法的外部被访问。另一个属性year被定义为一个访问器属性，其中获取函数简单的放回year_的值。
// 设置函数会做一些计算以决定正确的版本edition。
// 只定义获取函数意味着属性是只读的，尝试修改属性会被忽略。在严格模式下，尝试写入只定义了获取函数的属性会抛出错误。只有一个设置函数的属性是不能读取的，非严格模式下读取会返回undefined，严格模式下会抛出错误。


// 定义多个属性
let rose = {};
Object.defineProperties(rose, {
    year_: {
        value: 2033
    },
    edition: {
        value: 1
    },
    year: {
        get() {
            return this.year_;
        },
        set(newVal) {
            if (newVal > 2017) {
                this.year_ = newVal;
                this.edition += newVal - 2017;
            }
        }
    }
})
// 所有属性都是同时定义的，并且数据属性的configurable，enumerable，writable特性值都是false

// 读取属性的特性
// Object.getOwnPropertyDescriptor(属性所在对象，要取得其描述符的属性名)取得指定属性的属性描述符
let descriptor = Object.getOwnPropertyDescriptor(rose, 'year_');
console.log('value:', descriptor.value);
console.log('configurable:', descriptor.configurable);
console.log('type:', typeof descriptor.get)
// 数据属性year_，value等于原来的值，configurable是false，get是undefined

let yearDescriptor = Object.getOwnPropertyDescriptor(rose, 'year');
console.log('year:', yearDescriptor.value);
console.log('year_enumerable:', yearDescriptor.enumerable);
console.log('year_type:', typeof yearDescriptor.get);
// 访问其属性：value是undefined，enumerable是false，get是一个指向获取函数的指针。

// Object.getOwnPropertyDescriptors()，这个方法实际会在每个自由属性上调用Object.getOwnPropertyDescriptor()并在一个新对象中返回它们。
console.log('rose:', Object.getOwnPropertyDescriptors(rose));

// 合并对象
// 把源对象所有的本地属性一起复制到目标对象上。这种操作也被称为混入，因为目标对象通过混入源对象的属性得到了增强。
// Object.assign(目标对象，一个或多个源对象)，然后将每个源对象中可枚举(Object.propertyIsEnumerable()返回true)和自有(Object.hasOwnProperty()返回true)属性赋值到目标对象。
// 以字符串和符号为键的属性被复制
// 对每个符合条件的属性，这个方法会使用源对象上的[[Get]]取得属性的值，然后使用目标对象上的[[Set]]设置属性的值。
let dest = {};
let src = { id: 'ddd' };
let result = Object.assign(dest, src);
console.log('dest', dest);
console.log('isEqual:', dest === result);

// 多个源对象
let src1 = { name: 'ddd' };
result = Object.assign(dest, src, src1);
console.log('dest1:', result);

dest = {
    set a(val) {
        console.log('set a');
    }
}
src = {
    get a() {
        console.log('get a');
        return 'foo';
    }
}
Object.assign(dest, src);
console.log('dest:', dest);

// Object.assign()对每个对象执行的是浅复制，如果多个源对象都有的属性，使用最后一个复制的值
// 从源对象访问器属性取得的值，会作为一个静态值赋给目标对象，不能在两个对象中间转移获取函数和设置函数。

// 对象引用，浅复制意味着只会复制对象的引用
let co = {};
let srcCo = { a: {} };
Object.assign(co, srcCo);
console.log('co:', co);
console.log(co.a === srcCo.a);

// 赋值期间出错，操作会终止并退出，同时抛出错误。Object.assgin()没有回滚之前赋值的概念。可能只会完成部分赋值的方法
let re = {};
let srcRe = {
    a: 'fo',
    get b() {
        // 在调用这个获取函数的时候会抛出错误
        throw new Error();
    },
    c: 'bar'
}

try {
    Object.assign(re, srcRe);
} catch(e) {
    console.log('e:', e);
}
console.log('re:', re);

// 对象标识及相等判定
console.log(true === 1);
console.log(true == 1);
console.log({} === {});
console.log('2' === 2);
console.log(+0 === -0);
console.log(+0 === 0);
console.log(-0 === 0);
console.log(NaN === NaN);
console.log(isNaN(NaN));


// Object.is()，跟====很像，同时考虑了边界情形
console.log(Object.is(true, 1));
console.log(Object.is({}, {}));
console.log(Object.is('2', 2));
console.log(Object.is(+0, -0));
console.log(Object.is(+0, 0));
console.log(Object.is(-0, 0));
console.log(Object.is(NaN, NaN));

// 属性值简写
// 可计算属性表达式
// 简写方法名

// 对象结构
// 使用与对象匹配的结构来实现对象属性赋值
let perJack = {
    name: 'jack',
    age: 24
}
let { name: name_, age: age_} = perJack;
console.log('name_', name_);
console.log('age_', age_);

let { name, age } = perJack;
console.log('name:', name);
console.log('age:', age);

let { job } = perJack;
console.log('name:', name);
// 引用的属性不存在，该变量的值就是undefined
console.log('job:', job);
let { ll = 'll' } = perJack;
console.log('ll:', ll);

let { length } = 'foobar';
console.log('length:', length);
let { constructor: c } = 5;
console.log(c === Number);
// 解构在内部使用函数ToObject()，不能在运行环境中直接访问，把源数据解构转换为对象。在对象解构的上下文中，原始值会被当成对象。null和undefined不能被解构，否则会抛出错误。
// let { m } = null;
// let { n } = undefined;

let perName, perAge;
let perLucy = {
    name: 'lucy',
    age: 44,
    job: {
        title: 'engineer'
    }
};
({ name: perName, age: perAge } = perLucy);
console.log('perName:', perName, 'PerAge:', perAge)

// 嵌套解构
let perLucyCopy = {};
({name: perLucyCopy.name, age: perLucyCopy.age, job: perLucyCopy.job} = perLucy);
console.log('perLucyCopy:', perLucyCopy.name, perLucyCopy.age, perLucyCopy.job);
// perLucy.job.title = 'Hacker';
perLucy.job.title = 'jjjjj';
console.log('perLucy:', perLucy)
console.log('perLucyCopy:', perLucyCopy);

let { job: { title }} = perLucy;
console.log('title:', title);

// 部分解构，涉及多个属性的解构赋值是一个输出无关的顺序化操作。如果一个解构表达式涉及多个赋值，开始的赋值成功而后面的赋值出错，则整个解构赋值只会完成一部分。

let objJack = {
    name: 'jack',
    age: 44
}
let objName, objBar, objAge;
try {
    ({name: objName, foo: { bar: objBar }, age: objAge } = objJack);
} catch(e) {
    console.log('e:', e);
}
console.log('obj:', objName, objBar, objAge);

// 参数上下文匹配
// 在函数参数列表中可以进行解构赋值，对参数的解构赋值不会影响arguments对象，但是可以在函数签名中声明在函数体内使用局部变量。
let rrr = {
    name: 'matt',
    age: 44
}
function printR(foo, { name, age }, bar) {
    console.log(arguments);
    console.log(name, age);
    console.log('bar:', bar);
}
function printRR(foo, { name: objName, age: objAge }, bar) {
    console.log(arguments);
    console.log('obj:', objName, objAge);
    console.log('bar:', bar);
}

printR('sss', rrr, 'lll');

printRR('ttt', rrr, 'yyy');