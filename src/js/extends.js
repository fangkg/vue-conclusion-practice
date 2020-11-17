// ES5实现一个继承
function Parent() {
    this.name = "大人";
    this.hairColor = "黑色";
}

function Child() {
    Parent.call(this);
    this.name = "小孩";
}


Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child
let c5 = new Child();
console.log('小孩：', c5.name, c5.hairColor)
console.log(Object.getPrototypeOf(c5))
console.log(c5.constructor)

let p5 = new Parent()
console.log(p5.name, p5.hairColor);
console.log(Object.getPrototypeOf(p5));
console.log(p5.constructor)

// ES6实现继承
class Parent6 {
    constructor() {
        this.name = "大人6";
        this.hairColor = "黑色6";
    }
}

class Child6 extends Parent6 {
    constructor() {
        // 调用父级的方法和属性
        super();
        this.name = "小孩6";
    }
}

let c6 = new Child6();
console.log(c6.name, c6.hairColor);

let p6 = new Parent6();
console.log(p6.name, p6.hairColor);