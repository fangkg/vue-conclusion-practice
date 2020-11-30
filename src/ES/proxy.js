/*
 * @Author: fangkg
 * @Date: 2020-11-30 09:20:39
 * @LastEditTime: 2020-11-30 10:52:53
 * @LastEditors: Please set LastEditors
 * @Description: 代理与反射
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\ES\proxy.js
 */


// 为开发者提供了拦截并向操作嵌入额外行为的能力。
// 给目标对象定义一个关联的代理对象，这个代理对象可以作为抽象的目标对象来使用。在对目标对象的各种操作影响目标对象之前，可以在代理对象中对这些操作加以控制。

// 空代理
// 除了作为一个抽象的目标对象，什么也不做。

// new Proxy(目标对象，处理程序对象) 缺少其中任何一个参数会抛出TypeError
// const target = {
//     id: 'target'
// }

// const handler = {};
// const proxy = new Proxy(target, handler);

// id 属性会访问同一个值
// console.log(target.id);
// console.log(proxy.id);

// 给目标属性赋值会反映在两个对象上，因为两个对象访问的是同一个值
// target.id = 'foo';
// console.log(target.id);
// console.log(proxy.id);

// 给代理属性赋值会反映在两个对象，因为这个赋值会转移到目标对象
// proxy.id = 'bar';
// console.log(target.id);
// console.log(proxy.id);


// hasOwnProperty()
// console.log(target.hasOwnProperty('id'));
// console.log(proxy.hasOwnProperty('id'));

// Proxy.prototype是undefined，因此不能使用instance操作符
// console.log(target instanceof Proxy);
// console.log(proxy instanceof Proxy);
// 严格相等可以用来区分代理和目标
// console.log(target === proxy);

// 捕获器
// 代理的主要目的是可以定义捕获器(trap)，捕获器在处理程序对象中定义的“基本操作的拦截器”。每个处理程序对象可以包含零个或多个捕获器，每个捕获器都对应一种基本操作，可以直接或间接在代理对象上调用。
// 每次在代理对象上调用这些基本操作的时候，代理可以在这些操作传播到目标对象之前先调用捕获器函数，从而拦截并修改相应的行为。
const tar = {
    foo: 'foo'
}
const han = {
    // 捕获器在处理程序对象中以方法名为键
    get() {
        return 'handler override'
    }
}
const pro = new Proxy(tar, han);
console.log('pro:', pro);
console.log('pro:', pro['foo']);
console.log('tar:', tar['foo']);
// 当通过代理对象执行get()操作时，就会触发定义的get()捕获器。触发方式proxy[property],proxy.property,Object.create(proxy)[property]

// 捕获器参数和反射API
// 所有的捕获器都可以访问相应的参数，基于这些参数可以重建被捕获方法的原始行为。
const tt = {
    tt: 'tt'
}
const hh = {
    // 目标对象、要查询的属性、代理对象
    get(trapTarget, property, receiver) {
        console.log('trapTarget:', trapTarget);
        console.log('property:', property);
        console.log('receiver:', receiver);
        return trapTarget[property];
    }
}
const pp = new Proxy(tt, hh);
pp.tt

// 所有捕获器都可以基于自己的参数重建原始操作。可以通过调用全局Reflect对象(封装了原始行为)上的同名方法来轻松重建。
// 处理程序对象中所有可以捕获的方法都有对应的反射reflect方法，这些方法与捕获器拦截的方法具有相同的名称和函数签名，而且也具有被拦截方法相同的行为。
const aa = {
    aa: 'aa'
}
const nn = {
    get() {
        return Reflect.get(...arguments);
    }
}
// 简写
// const dd = {
//     get: Reflect.get
// }
const rr = new Proxy(aa, nn);
console.log(rr.aa);

const gggg = {
    gggg: 'gggg'
}
const pppp = new Proxy(gggg, Reflect);
console.log(pppp.gggg);
console.log(gggg.gggg);

// 目标对象有一个不可配置且不可写的数据属性，那么捕获器返回一个与该属性不同的值时，会抛出TypeError
const gss = {};
Object.defineProperty(gss, 'gss', {
    configurable: false,
    writable: false,
    value: 'fss'
})
const hss = {
    get() {
        return 'fss'
    }
}
const pss = new Proxy(gss, hss);
console.log(pss.gss)

// 可撤销代理
// 使用new Proxy()创建的普通代理会在代理对象的生命周期内一直存在。
// revocable()支持撤销代理对象与目标对象的关联。撤销代理的操作是不可逆的。撤销函数revoke()是幂等的，调用多少次的结果都一样。撤销之后再调用代理会抛出TypeError。
// 撤销函数和代理对象的在实例化时同时生成的
const ddd = {
    dd: 'ddd'
};
const lll = {
    get() {
        return 'intercepted';
    }
};
const { proxy, revoke } = Proxy.revocable(ddd, lll);
console.log(proxy);
console.log('dd:', proxy.dd)
console.log(revoke);
revoke();
// 撤销代理之后再次调用代理会抛出TypeError
// console.log('dd:', proxy.dd);

// 反射API并不限于捕获处理程序；大多数反射API方法在Object类型上有对应的方法；
// Object上的方法适用于通用程序；反射方法适用于细粒度的对象控制与操作。
const o = {};
try {
    Object.defineProperty(o, 'o', 'o');
    console.log('success');
} catch(e) {
    console.log('failure');
}
// 定义新属性时发生问题，Reflect.defineProperty()返回false，不是抛出错误。

const oo = {};
if (Reflect.defineProperty(oo, 'oo', { value: 'oo' })) {
    console.log('success');
} else {
    console.log('failure');
}

// 反射方法提供状态标记
Reflect.defineProperty();
Reflect.preventExtensions();
Reflect.setPrototypeOf();
Reflect.set();
Reflect.defineProperty();

Reflect.get() // 可以替代对象属性访问操作符
Reflect.set() // 可以替代=赋值操作符
Reflect.has() // 可以替代in操作符或者with()
Reflect.defineProperty() // 可以替代delete操作符
Reflect.construct() // 可以替代new操作符

// Function.prototype.apply.call(myFunc, this.val, argumentList);
// Reflect.apply(muyFunc, thisVal, argumentList);