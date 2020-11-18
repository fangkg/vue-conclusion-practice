// 参数{Object} object
// 用法：让一个对象可响应，VUe内部会用它来处理data函数返回的对象。返回的对象可以直接用于渲染函数和计算属性内，并且会在发生改变时触发相应的更新。也可以作为最小化的跨组件状态存储器。
import Vue from 'vue';
const state = Vue.observable({ count: 0 });
const Demo = {
    render(h) {
        return h('button', {
            on: { click: () => { state.count++ }}
        }, `count is: ${state.count}`)
    }
}