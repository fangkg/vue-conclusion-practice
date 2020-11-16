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
    // 1、路由懒加载
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

    // 7、vue组件销毁时，会自动解绑它的全部指令及事件监听器，但是仅仅限于组件自身的事件
    // created() {
    //     this.timer = setInterval(this.refresh, 2000)
    // },
    // beforeDestroy() {
    //     clearInterval(this.timer)
    // }

    // 9、第三方插件按需引入，像element-ui这样的第三方组件可可以按需引入避免体积太大
    // Vue.use(Button)
    // Vue.use(Select)
}

</script>
<style>
</style>