<!--
    1、组件类型
        1.1、父子组件：父传子props、子传父$emit/v-on、@触发
        1.2、兄弟组件：$emit/$on => $bus bus.$emit('sendTitle', val) bus.$on('sendTitle', val => {})
        1.3、隔代关系：provide/inject 
    2、vuex：实现了一个单向数据流，在全局拥有一个state存放数据，当组件要更改state中的数据时，必须通过mutation提交修改信息，mutation同时提供了订阅者模式供外部插件调用获取state数据的更新。当所有异步操作(常见于调用后端接口异步获取更新数据)或者批量的同步操作需要走action，但是action也是无法直接修改state的，还是通过mutation来修改state的数据。最后，根据state的变化，渲染到视图上。
        2.1、state：vuex的唯一数据源，如果获取多个state，可以使用...mapState
        2.2、getter：可以将getter理解为计算属性，getter的返回值根据它的依赖缓存起来，依赖发生变化时才会被重新计算，辅助对象...mapGetter
        2.3、mutation：更改vuex的state中唯一的方法是提交mutation，参数为state和一个回调函数payload，回调函数就是进行状态修改的地方,mutation必须是同步函数，辅助对象...mapMutations
        2.4、action：类似mutatio都是修改状态，action提交的mutation不是直接修改状态，action可以包含异步操作，mutation同步；action中的回调函数第一个参数是context，是一个与store实例具有相同属性的方法的对象。action通过store.dispatch触发，mutation通过store.commit提交。辅助对象 mapActions
        2.5、module：由于使用单一状态树，应用的所有状态集中到比较大的对象，当应用变得非常复杂时，store对象就有可能变得非常臃肿。为了解决以上问题，vuex允许我们将store分割成模块，每个模块拥有自己的state,mutation,action,getter
        2.6、vuex是vue的状态管理器，存储的数据是响应式的。但是不会保存起来，刷新之后就回到了初始状态，具体做法应该是在vuex里数据改变的时候把数据拷贝一份保存到localStorage里面，刷新之后，如果localStorage里有保存的数据，取出来再替换store里的state。vuex中保存的状态都是数组，而loaclStorage只支持字符串，所以需要JSON转换。JSON.stringfy(state.subscribeList)
    3、$attrs/$listeners
        背景：多级组件嵌套需要传递数据时，通常使用的方法是通过vuex。但是仅仅是传递数据，而不做中间处理，使用vuex处理未免有点大材小用。
        3.1、$attrs: 包含了父作用域中不被prop所识别(且获取)的特性绑定(class和style除外)，当一个组件没有声明任何prop时，这里会包含所有父作用域的绑定，并且通过v-bind="$attrs"传入内部组件，通常配合inheritAttrs选项一起使用。inheritAttrs: false可以关闭自动挂载到组件根元素上的没有在props声明的属性。
        3.2、$listeners: 包含了父作用域中(不含.native修饰符的)v-on事件监听器。可以通过v-on="$listeners"出入内部组件
    4、provide/inject 这对选项一起使用，以允许一个祖先组件向所有子孙组件注入一个依赖，不论组件层次多深，都会在上下游关系成立的时间里始终生效。跨级组件间建立一种主动提供与依赖注入的关系。
        provide、inject实现数据响应式
        4.1、provide祖先组件的实例，然后在子孙租价中注入依赖，这样可以直接在子孙组件中直接修改祖先组件的实例的属性，不过这种方法有个缺点就是这个实例上挂载很多没有必要的东西比如：props methods
        4.2、使用2.6最新的API Vue.observable优化响应式provide
    5、$parent/$children与ref
        ref：如果在普通的DOM元素上使用，引用指向的是DOM元素；如果用在自组件上，引用就是指向组件实例
        $parent $children访问父/子实例

-->
<template>
  <div>
    <h1>vue组件通信</h1>
  </div>
</template>

<script>
export default {
    data() {
        return {
            productList: []
        }
    }
    // 2.1state：vuex的唯一数据源，如果获取多个state，可以使用...mapState
    // const store = new Vuex.Store({
    //     state: {
    //         productList: [{ name: 'good', price: 100 }]
    //     },
    //    getters: {
    //        getSalePrice: state => {
    //            let saleProduct = state.productList.map(item => {
    //                return {
    //                    name: item.name,
    //                    price: item.price / 2
    //                }
    //            })
    //            return saleProduct;
    //        }
    //    },
    //    mutations: {
    //      reducePrice: (state, payload) => {
    //         return state.productList.forEach(product => {
    //             product.price -= payload
    //         })
    //      }
    //      }，    
        //   actions: {
            // 提交的是mutation可以包含异步操作
        //     reducePriceAsync: (context, payload) => {
        //         setTimeout(() => {
        //             context.commit('reducePrice', payload)
        //         }, 200)
        //     }
        //   }
    // })

    // 2.2 获取getter计算后的值
    // this.productList = this.$store.getters.getSalePrice;

    // 2.3 页面使用mutation
    // this.$store.commit('reducePrice', 5)

    // 2.4 页面使用action
    // this.$store.dispatch('reducePriceAsync', 3)

    // const moduleA = {
    //     state: {},
    //     mutations: {},
    //     actions: {},
    //     getters: {}
    // }
    // const store = new Vuex.Store({
    //     a: moduleA
    // })

    // provide/indeject
    // privide: {
    //     name: '王者'
    // },
    // inject: ['name']

    // provide/inject实现数据响应式
    // 方法一：提供祖先组件的实例
    // provide() {
    //     return {
    //         theme: this
    //     }
    // }
    // 方法二：使用2.6最新的API Vue.observable优化响应式provide
    // provide() {
    //     this.theme = Vue.observable({
    //         color: 'blue'
    //     })
    //     return {
    //         theme: this.theme
    //     }
    // }
}

</script>
<style>
</style>