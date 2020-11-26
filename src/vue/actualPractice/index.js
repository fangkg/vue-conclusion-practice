/*
 * @Author: fangkg
 * @Date: 2020-11-26 11:34:51
 * @LastEditTime: 2020-11-26 16:33:00
 * @LastEditors: Please set LastEditors
 * @Description: 开发中遇到的问题
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\vue\actualPractice\index.js
 */

// ***************** ES6 ***************************
// map和forEach的区别
// map接收两个参数：callback函数，它会在map执行之后被触发；上下文变量，执行callback函数时this指向的对象；
// map会返回一个新数组，不等于原数组
// forEach参数跟map相同，但是没有返回值，返回值为undefined；forEach会修改原来数组；

// eventLoop

// ***************** HTML CSS ***************************
// flex布局

// position absolute和fixed的区别？

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
// 使用v-for更新已经渲染的元素列表时，默认用就地复用策略；列表数据修改的时候，会根据key值取判断某个值是否修改，如果修改则重新渲染这一项，否则复用之前的元素；
// 不推荐使用index作为key，如果是在数组中间插入一条记录，插入点之前的记录会被复用，插入点之后的记录都要重新渲染。
// 推荐使用数组中不会变化的那一项作为key值，一般为记录id。此时对比发现只有新插入的记录的key属性是变化的，因此只要渲染新插入的这条纪律就可以了。其它的都是复用之前的。
// 虚拟DOM的Diff算法：两个相同的组件产生类似的DOM结构，不同的组件产生不同的DOM结构；同一层级的一组节点，可以通过唯一的id进行区分。
// key的作用是为了高效的更新虚拟DOM
// Vue中在使用相同标签名的元素过渡切换时，也会使用到key属性，目的是为了让Vue可以区分它们

// 什么时候触发组件更新
// data中数据更新=> Dep中notify() => Watcher中update()
// data对象：Vue中的data方法中返回的对象
// Dep对象：每一个Data属性都会创建一个Dep，用来搜集所有使用到这个Data的Watcher对象
// Watcher对象：用于渲染DOM

// Vue异步更新DOM
// 在Vue的nextTick回调中才能获取到真正的DOM元素
// 更新过程：触发Data.set => 调用Dep.notify() => Dep会遍历所有相关的Watcher执行update() => 执行更新操作 => 将当前Watcher添加到异步队列 => 执行异步队列并传入回调(排序，先渲染父节点，再渲染子节点，遍历所有Watcher进行批量更新，更新DOM)
// Vue在调用Watcher更新视图时，并不会直接进行更新，而是把需要更新的Watcher加入到Queue队列里，然后把具体的更新方法flushSchedulerQueue传给nextTick()

// this.$nextTick()可以获取到更新后的DOM
// Vue.prototype.$nextTick = function (fn: Function) { return nextTick(fn, this) };
// this.$nextTick其实就是调用了nextTick方法，在异步队列中执行回调函数。根据先来后到原则，修改Data触发的更新队列会先得到执行，执行完成后就生成了新的DOM，接下来执行this.$nextTick的回调时，能获取到更新后的DOM元素。

// 总结：修改Vue中的Data时，会触发所有和这个Data相关的Watcher进行更新。首先会将所有的Watcher加入队列Queue，然后调用nextTick()执行异步任务，在异步任务的回调中，把Queue中的Watcher进行排序，然后执行对应的DOM更新。

// 组件生命周期
// Vue实例从创建到销毁的过程
// 开始创建、初始化数据、编译模板、挂载DOM、渲染、更新、渲染、销毁等一系列过程
// 钩子
// beforeCreate：初始化了部分参数，如果有相同的参数，做了参数合并，并执行beforeCreate；实例刚刚被创建，实例初始化之后，数据观测和事件配置之前；
// created：初始化了Inject、Provide、props、methods、data、computed和watch，执行created；实例创建完成后被立即调用，实例已经完成数据观测、属性、方法运算、watch/event事件回调。挂载还没开始，$el属性目前不可见
// beforeMount：检查是否存在el属性，存在的话进行渲染dom操作，执行beforeMount；模板编译挂载之前，HTML界面没生成，相关的render函数首次被调用。
// activated：keep-alive组件激活时调用
// mounted：实例化Watcher，渲染dom，执行mounted；模板已经挂载完成；
// beforeUpdate：在渲染dom后，执行了mounted钩子之后，在数据更新的时候执行beforeUpdate
// updated：检查当前的watcher列表中，是否存在当前要更新的数据watcher，如果存在就执行updated
// beforeDestroy：检查是否已经被卸载，如果已经被卸载，就直接return出去，否则执行beforeDestroy
// destroyed：把所有有关自己痕迹的地方都给删除掉

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