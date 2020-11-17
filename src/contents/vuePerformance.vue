<!--
    1、路由懒加载
    2、keep-alive缓存页面
    3、使用v-show复用DOM
    4、v-for遍历避免同时使用v-if
    5、长列表性能优化 如果列表是纯粹的数据展示，不会有任何改变，就不需要做响应化
    6、如果是大数据长列表，可采用虚拟滚动，只渲染少部分区域内容
    7、事件销毁 vue组件销毁时，会自动解绑它的全部指令及事件监听器，但是仅限于组件本身的事件
    8、图片懒加载 对于图片过多的页面，为了加速页面加载速度，所以很多时候我们需要将页面内未出现在可视区域内的图片先不做加载，等到滚动到可视区域后再去加载。
    9、第三方插件按需引入，像element-ui这样的第三方组件可可以按需引入避免体积太大
    10、无状态组件标记为函数式组件
    11、webpack中css import 使用alias相对路径
-->
<template>
  <div>
    <h1>vue性能优化</h1>

    <!--2、 keep-alive缓存页面 -->
    <div id="app">
        <keep-alive>
            <router-view/>
        </keep-alive>
    </div>

    <!-- 3、使用v-show复用DOM -->
    <div class="cell">
        <div v-show="value" class="on">
            <Heavy :n="1000"/>
        </div>
        <section v-show="!value" class="off">
            <Heavy :n="100"/>
        </section>
    </div>

    <!-- 4、v-for遍历避免同时使用v-if -->
    <div>
        <ul>
            <li v-for="user in activeUsers" :key="user.id">{{ user.name }}</li>
        </ul>
    </div>

    <!-- 6、如果数据是大数据长列表，可采用虚拟滚动，只渲染少部分区域的内容 -->
    <recycle-scroller class="items" :items="items" :item-size="24">
        <template v-slot="{ item }">
            <FetchItemView :item="item" @vote="voteItem(item)"></FetchItemView>
        </template>
    </recycle-scroller>

    <!-- 8、图片懒加载 对于图片过多的页面，为了加速页面加载速度，所以很多时候我们需要将页面内未出现在可视区域内的图片先不做加载，等到滚动到可视区域后再去加载。 -->
    <img v-lazy="/static/img/logo.png">
  </div>
</template>

<!--
    <template functional></template>
-->


<script>
// import Vue from 'vue';
// import { Button, Select } from "element-ui";

export default {
    // 1、路由懒加载 把十几个甚至更多的路由页面全部打包进一个js文件，虽然将多个请求合并了，但是同样也加载了很多并不需要的代码，耗费了更长的时间。为了首页能够更快的呈现给客户，需要使用按需加载，将每个路由页面单独打包为一个文件。
    // 在入口文件index.js中，通过import()方法，异步引入a.js文件。
    // 路由懒加载：当我们用webpack打包并构建应用时，输出的bundle包会变得非常大，影响页面加载和体验。如果能将不同路由对应的组件分割成不同的代码块，然后当路由被访问的时候才加载对应组件，而不是一开始全部加载，这样就更加高效了
    // 方式一、将异步组件定义为返回一个Promise
    // {
    //     path: '/user',
    //     name: 'user',
    //     component: resolve => require(['../views/user'], resolve)
    // }
    // 方式二、结合webpack和ES语法使用import()，可以使用动态import语法来定义代码分块点(split point)
    // import('./user.vue')  // 返回Promise
    // 定义一个能够被webpack自动代码分割的异步组件
    // {
    //     path: '/user',
    //     name: 'user',
    //     component: () => import('@/views/user')
    // }
    // const router = new VueRouter({
    //     routes: [
    //         { path: '/foo', component: () => { import('./Foo.vue') }}
    //     ]
    // })
    data() {
        return {
            users: [],
            items: [],
            timer: ''
        }
    },
    computed: {
        // 4、v-for遍历避免同时使用v-if
        activeUsers: function() {
            return this.users.filter(function(user) {
                return user.isActive
            })
        }
    },
    // 5、如果列表是纯粹的数据展示，不会有任何改变，就不需要做响应化
    // async created() {
    //     const users = await axios.get('/api/users');
    //     this.users = Object.freeze(users);
    // },

    // 6、渲染上千条数据的列表，如果一次渲染这么多DOM节点对性能会有很大损耗。把渲染DOM节点的数量控制在一定范围内，仅仅是渲染当前屏幕所看到的部分DOM节点，从而实现优化。vue-virtual-scroller
    //    6.1、最外层recycle-scroller节点需要设置为一个固定高度，它代表可视区域
    //    6.2、中间层recycle-scroller-holder节点高度为渲染所有数据的总高度，它的目的在于撑出recycle-scroller的滚动条
    //    6.3、最内层recycle-scroller-wrapper包裹我们实际渲染的数据，它会预加载上一屏与下一屏的数据，在滚动时进行复用。通过改变recycle-scroller-wrapper的纵向偏移量(translateY的值)使得实际渲染的数据一直出现在可视范围内，不变更新渲染的数据，模拟滚动的效果。

    // 7、vue组件销毁时，会自动解绑它的全部指令及事件监听器，但是仅仅限于组件自身的事件
    // created() {
    //     this.timer = setInterval(this.refresh, 2000)
    // },
    // beforeDestroy() {
    //     clearInterval(this.timer)
    // }

    // 9、第三方插件按需引入，像element-ui这样的第三方组件可可以按需引入避免体积太大。把组件变成一个函数，起初不执行它，只有页面加载的时候才触发它加载进来。
    // Vue.use(Button)
    // Vue.use(Select)

    // 11、在用webpack处理打包时，可以将某一个目录配置一个别名，代码中就能使用与别名的相对路径引用资源。alias: { '@': resolve('src') }
    // 引用js文件没有问题，在css文件中比如less,sass,stylus中使用@import '@/style/theme'的语法引用相对@的目录会报错，找不到@目录，说明webpack没有正确识别资源的相对路径。原因是css文件会被css-loader处理，这里的css @import后的字符串会被css-loader视为绝对路径解析，因为我们并没有添加css-loader的alias,所以找不到@目录。
    // 解决：在引用路径的字符串最前面添加~符号，如@import "~@/style/theme",webpack会将以~符号作为前缀的路径视为依赖模块去解析，这样@的alias配置就可以生效。
    
}

</script>
<style>
</style>