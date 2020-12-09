/*
 * @Author: fangkg
 * @Date: 2020-12-09 08:32:19
 * @LastEditTime: 2020-12-09 10:11:11
 * @LastEditors: Please set LastEditors
 * @Description: slot
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\vue\slot\index.js
 */

// vue的slot是组件的一块HTML模板，这块模板由使用组件者即父组件提供。可以说是子组件暴露的一个让父组件传入自定义内容的接口。
// 把父组件的内容与子组件自己的模板混合起来使用，这样的一个过程在vue中称为内容分发。即slot插槽。

// slot作用，让用户可以拓展组件，去更好地复用组件和对其定制化处理。
// slot分类，默认插槽，具名插槽，作用域插槽。

// 使用：子组件
// 插槽用标签来确定渲染的位置，里面放如果父组件没传内容时的后备内容。
// 具名插槽用name属性来表示插槽的名字，不传为默认插槽。
// 作用域插槽在作用域上绑定属性来将子组件的信息传给父组件使用，这些属性会被挂在父组件slot-scope接受的对象上。

// 使用：父组件
// 默认插槽直接在子组件的标签内写入内容即可。
// 具名插槽是在默认插槽的基础上加上slot属性，值为子组件插槽name属性的值。
// 作用域插槽是通过slot-scope获取子组件的信息，在内容中使用。用结构语法去直接获取想要的属性。

// v-slot
// slot属性弃用，具名插槽通过指令参数v-slot：插槽名 的形式传入，可以简化为#插槽名。
// slot-scope属性弃用，作用域插槽通过v-slot:xxx="slotProps" 的slotProps来获取子组件传出的属性。
// v-slot属性只能在template上使用，只有默认插槽时，可以在组件标签上使用。

// 作用域插槽原理
// slot本质上是返回VNode的函数，Vue中的组件要渲染到页面上需要经过template=> render function => VNode => DOM过程。
// 组件挂载的本质是执行渲染函数得到VNode