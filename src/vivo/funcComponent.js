/*
 * @Author: fangkg
 * @Date: 2020-12-07 14:34:45
 * @LastEditTime: 2020-12-07 14:43:19
 * @LastEditors: Please set LastEditors
 * @Description: 函数式组件
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\vivo\funcComponent.js
 */

// 没有管理任何状态；无响应式数据
// 没有监听任何传递给它的状态；
// 没有生命周期方法；
// 只是接收一些prop的函数
// 无实例，无this上下文

// 函数式组件优点：渲染开销低

// 写法
// {
//     functional: true,
//     // props可选
//     props: {},
//     // 为了弥补缺少的实例，提供第二个参数作为上下文
//     render: function(createElement, context) {}
// }

// 组件需要的一切都是通过context参数传递，它是包含如下字段的对象
// props: 提供所有prop的对象
// children: VNode子节点的数组
// slots: 一个函数，返回了包含所有插槽的对象
// scoptedSlots: 一个暴露传入的作用域插槽的对象，也以函数形式暴露普通插槽
// data: 传递组件的整个数据对象，作为createElement的第二个参数传入组件
// parent: 对父租价的引用
// listeners: 一个包含了所有父组件为当前组件注册的事件监听器对象，是data.on的一个别名。
// injections: 使用inject选项，该对象包含了应当被注入的属性。


