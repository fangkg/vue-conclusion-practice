/*
 * @Author: fangkg
 * @Date: 2020-11-27 11:52:44
 * @LastEditTime: 2020-11-27 12:06:27
 * @LastEditors: Please set LastEditors
 * @Description: 创建对象
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\ES\object2.js
 */

// 使用Object构造函数或对象字面量可以方便的创建对象，但是这些方式也有不足，创建具有同样接口的多个对象需要重复编写很多代码
// 类 继承

// 工厂模式，用于抽象创建可定对象的过程
function createPer(name, age, job) {
    let o = new Object();
    o.name = name;
    o.age = age;
    o.job = job;
    o.sayName = function() {
        console.log(this.name);
    }
    return o;
}
let per1 = createPer('jack', 22, 'enginner');
let per2 = createPer('lucy', 33, 'doctor');
console.log(per1, '---', per2);
// 这种工厂模式可以解决创建多个类似对象的问题，但是没有解决对象标识的问题(即新创建的对象是什么类型)

// 构造函数模式
// 构造函数是用于创建特定类型对象。Object、Array原生构造函数，运行时可以直接在执行环境中使用。

function CreatePer(name, age, job) {
    this.name = name;
    this.age = age;
    this.job = job;
    this.sayName = function() {
        console.log('this.name:', this.name);
    }
}
let cper1 = new CreatePer('jack', 66, 'teacher');
let cper2 = new CreatePer('lll', 12, 'student');
cper1.sayName();
cper2.sayName();
// 没有显示的创建对象
// 属性和方法直接赋值给了this
// 没有return
// 函数名首字母大写

// 调用构造函数创建实例
