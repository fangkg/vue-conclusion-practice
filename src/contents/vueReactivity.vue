<!--
    1、observer类会附加到每一个被侦测的object上，一旦被附加，observer会把object的所有属性转换为getter/setter的形式，当属性发生变化的时候及时通知依赖
    2、data通过Observer转换成了getter/setter的形式来追踪变化，当外界通过watcher读取数据时，会触发getter从而将watcher添加到依赖中。当数据变化时，会触发setter从而向Dep中的依赖(watcher)发送通知，watcher接收到通知后，会向外界发送通知，变化通知到外界后可能会触发视图更新，也可能触发用户的某个回调函数
    3、数据发生变化后，会重新对页面渲染，这就是vue响应式。侦测数据的变化，收集视图以来了哪些数据，数据变化时自动通知需要更新的视图部分并进行更新。对应的专业术语：数据劫持、数据代理，依赖收集，发布订阅
-->
<template>
  <div>
    <h1>vue响应式</h1>
  </div>
</template>

<script>
// observer类 用来将一个正常的object转换成被侦测的object，然后判断数据类型。只有object类型才会调用walk将每一个属性转换成getter/setter形式来侦测变化。最后在defineReactive中新增new Observer(val)来递归子属性。当data中的属性变化时，与这个属性对应的依赖就会收到通知。
export class Observer {
    constructor (value) {
        this.value = value
        if (!Array.isArray(value)) {
            // 判断是否为数组
            // 劫持对象
            this.walk(value)
        }
    }

    walk(obj) {
        // 会把每个属性转换为getter/setter形式来侦测数据变化
        const keys = Object.keys(obj)
        for(let i = 0; i < keys.length; i ++) {
            defineReactive(obj, keys[i], obj[keys[i]])
        }
    }

    defineReactive(data, key, value) {
        // 递归属性
        if(typeof val === 'object') {
            new Observe(val)
        }

        let dep = new Dep()
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get: function() {
                dep.depend()
                return val
            },
            set: function(newVal) {
                if (val === newVal) {
                    return
                }
                val = newVal;
                dep.notify()
            }
        })
    }
}

// dep依赖收集 getter中收集依赖
export class Dep {
    constructor () {
        // 观察者集合
        this.subs = []
    }

    // 添加观察者
    addSub(sub) {
        this.subs.push(sub)
    }

    // 移除观察者
    removeSub(sub) {
        remove(this.subs, sub)
    }

    // 核心，如果存在，则进行依赖收集操作
    depend() {
        if (window.target) {
            this.addDep(window.target)
        }
    }

    // 通知更新
    notify() {
        // 避免污染原来的集合
        const subs = this.subs.slice()
        // 如果不是异步执行，先进行排序，保证观察者执行顺序
        if (process.env.NODE_ENV !== 'production' && !config.async) {
            subs.sort((a, b) => a.id - b.id)
        }

        for(let i = 0, l = subs.length; i < l; i ++) {
            // 发布执行
            subs[i].update()
        }
    }

    remove(arr, item) {
        if (arr.length) {
            const index = arr.indexOf(item)
            if (index > -1) {
                return arr.splice(index, 1)
            }
        }
    }
}

// watcher是一个中介角色，数据发生变化时通知它，然后它再去通知其它地方
export class Watcher {
    // 组件实例对象，要观察的表达式、函数或字符串能触发取值操作，被观察者发生变化后的回调
    constructor(vm, expOrFn, cb) {
        // Watcher有一个vm属性，表明它是属于哪个组件
        this.vm = vm
        // 执行his.getter()及时读取数据
        this.getter = parsePath(expOrFn)
        this.cb = cb
        this.value = this.get()
    }

    get() {
        window.target  = this
        let value = this.getter.call(this.vm, this.vm)
        window.target = undefined
        return value
    }

    update() {
        const oldValue = this.value
        this.value = this.get()
        this.cb.call(this.vm, this.value, oldValue)
    }
}


export default {

}

</script>
<style>
</style>