/*
 * @Author: fangkg
 * @Date: 2020-12-07 13:39:19
 * @LastEditTime: 2020-12-07 14:17:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\vivo\keepAlive\index.js
 */

// keep-alive是Vue.js的一个内置组件。<keep-alive></keep-alive>包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。
// 它自身不会渲染一个DOM元素，不不会出现在父组件链中。
// 当组件在<keep-alive></keep-alive>内被切换，它的activated和deactivated这两个声明周期钩子函数将会被对应执行。
// 它提供了include和exclude两个属性，允许组件有条件的进行缓存。include字符串或者正则表达式，只有匹配的组件会被缓存；exclude字符串或正则表达式，任何匹配的组件都不会被缓存。

// 只缓存组件别名name为a的组件
{/* <keep-alive include="a">
    <component></component>
</keep-alive> */}

// 除了name为a的组件，其它都缓存下来
{/* <keep-alive excluce="a">
    <component></component>
</keep-alive> */}

// 生命周期钩子：activated和deactivated
// 因为keep-alive会将组件保存在内存中，并不会销毁以及重新创建，所以不会重新调用组件的created等方法，需要用activated与deactivated这两个生命钩子来得知当前组件是否处于霍东阁状态。

// vue--keep--alive组件源码
// created钩子会创建一个cache对象，用来作为缓存容器，保存vnode节点。
created() {
    // 创建缓存对象
    this.cache = Object.create(null);
    // 创建一个key别名数组(组件name)
    this.keys = [];
}

// destroyed钩子在组件被销毁的时候清除cache缓存中的所有组件实例
destroyed() {
    // 遍历销毁所有缓存的组件实例
    for(const key in this.cache) {
        pruneCacheEntry(this.cache, key, this.keys);
    }
}

render() {
    // 获取插槽
    // 根据插槽获取第一个组件
    // 获取组件名称，是否设置了组件名称，没有则返回组件标签名称
    // 结构对象赋值常量
    // name不在include中或者在exclude中则直接返回vnode

    // 判断当前是否有缓存，有则取缓存实例，没有则进行缓存
    // 判断是否设置了最大缓存的实例数量，超过则删除最老的数据
    // 给vnode打上缓存标记
}

// 销毁实例
function pruneCacheEntry() {
    
}

// 缓存
function pruneCache() {

}

// 筛选过滤函数
function matches() {

}

// 检测include和exclude数据的变化，实时写入读取缓存或者删除