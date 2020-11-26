/*
 * @Author: fangkg
 * @Date: 2020-11-26 11:34:51
 * @LastEditTime: 2020-11-26 12:47:12
 * @LastEditors: Please set LastEditors
 * @Description: 开发中遇到的问题
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\vue\actualPractice\index.js
 */

// ***************** ES6 ***************************
// map和forEach的区别

// eventLoop

// ***************** HTML CSS ***************************
// flex布局

// ***************** vue ***********************************

// computed 和 watch哪个先执行？区别？
// computed
// computed计算属性类似于过滤器，对绑定到视图的数据进行处理，并监听变化进而执行对应的方法;
// 计算属性是基于它们的依赖进行缓存的，只有在相关依赖发生改变的时候它们才会重新求值。computed中声明的计算属性不能再组件的props和data中定义。
// computed计算属性的初始化是发生在vue实例初始化阶段的initState函数中，计算属性是一个computed watcher。当计算属性最终计算的值发生变化才会触发watcher重新渲染，本质上是一种优化
// watch
// 侦听属性是一个侦听的动作，用来观察和响应vue实例上的数据变动
// watch选项允许我们执行异步操作，限制我们执行该操作的频率，并在我们得到最终结果前设置中间状态。这些是computed计算属性无法做到的。
// 侦听属性的初始化也是发生在Vue实例化阶段的initstate函数中，在computed初始化之后，本质上是一个user watcher。
// 初始化的时候watch是不会执行的，只有到监听的属性的值改变的时候才会执行监听计算。
// immediate: true，代表在watch里声明了监听属性这个方法之后立即先去执行handler()
// 如果对一个对象做深度观测的时候，需要设置deep：true
// 相同：computed和watch都起到监听依赖一个数据，并进行处理的作用。
// 不同：它们都是Vue对监听器的实现，computed主要用于对同步数据的处理，watch则主要用于观测某个值的变化去完成一段开销较大的复杂业务逻辑。能用computed的时候优先用computed，避免多个数据影响其中某个数据的时候多次调用watch的尴尬情况。

// v-for中的key的作用

// 什么时候触发组件更新

// 组件生命周期

// 数据响应式 watcher通知update更新的时候update()方法里做了什么？

// 组件通信

// 双向绑定
// 实现过程：观察者对数据的观察，订阅者对数据的订阅，对HTML模板的解析和渲染。
// 观察者，观察对象data，订阅者订阅这个对象的某个属性，比如data.name。当data.name有变动时，观察者就告诉订阅者订阅的数据更新了。
let data = {
    name: 'jack',
    age: 26
}
console.log('data:', data);

// 生成观察者，对象的观察其核心是使用Object.defineProperty()对字段进行数据劫持，这个类为观察者生成器。
class Observer {
    constructor(data) {
        this.data = data;
        Object.keys(data).forEach(key => {
            let value = data[key];

            Object.defineProperty(data, key, {
                get() {
                    return value;
                },
                set(newVal) {
                    if (newVal !== value) {
                        value = newVal;
                    }
                }
            })
        })
    }
}
console.log('Observer:', Observer);
// 使用Object.defineProperty()对数据进行劫持。

// 生成订阅者，订阅者生成器
class Watcher {
    constructor(data, key, cb) {
        this.data = data;
        this.cb = cb;
        this.key = key;
        this.value = data[key];
    }

    update(newVal) {
        let oldVal = this.value;
        if (newVal !== oldVal) {
            this.value = newVal;
            this.cb(newVal, oldVal);
        }
    }
}
console.log('Watcher:', Watcher);
// 构造函数接收data，订阅的key、回调函数，存在一个update的方法，当值不同时进行回调的更新。

// 订阅库来记录某个订阅者，订阅库生成器
class Dep {
    constructor() {
        this.subs = [];
    }

    add(sub) {
        this.subs.push(sub);
    }

    notify(newVal) {
        this.subs.forEach(sub => {
            sub.update(newVal);
        })
    }
}
console.log('Dep:', Dep);
// 订阅库是一个数组，add()方法往库里添加订阅者，notify()去通知这个库里面的所有订阅者(即调用订阅者的update())
// Dep.target = null; 可以写成 let target = null; 一个变量，默认为null,有订阅者时就等于这个订阅者，离开了就还原为null
// 生成观察者，对象的观察其核心是使用Object.defineProperty()对字段进行数据劫持，这个类为观察者生成器。
class ObserverRet {
    constructor(data) {
        this.data = data;
        Object.keys(data).forEach(key => {
            let value = data[key];
            // 生成订阅库
            let dep = new Dep();

            Object.defineProperty(data, key, {
                get() {
                    // 如果当前指向了订阅者并要订阅这个，就加入订阅库。
                    Dep.target && dep.add(Dep.target);
                    return value;
                },
                set(newVal) {
                    if (newVal !== value) {
                        value = newVal;
                        // 通知订阅库里的订阅者们
                        dep.notify(newVal);
                    }
                }
            })
        })
    }
}
console.log('ObserverRet:', ObserverRet);

// 生成订阅者，订阅者生成器
class WatcherRet {
    constructor(data, key, cb) {
        this.data = data;
        this.cb = cb;
        this.key = key;
        // 指向当前订阅者
        Dep.target = this;
        // 触发data属性的get()方法，进而将该订阅者加入到该属性的订阅库当中
        this.value = data[key];
        // 订阅者离开，销毁指向
        Dep.target = null;
    }

    update(newVal) {
        let oldVal = this.value;
        if (newVal !== oldVal) {
            this.value = newVal;
            this.cb(newVal, oldVal);
        }
    }
}
console.log('WatcherRet:', WatcherRet)