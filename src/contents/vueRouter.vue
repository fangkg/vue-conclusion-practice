<!--
    1、全局的钩子函数
        1.1、beforeEach(to, from, next)路由改变前调用，常用于验证用户权限，to:即将要进入的目标路由对象，from：当前正要离开的路由对象，next：路由控制参数
            next()如果一切正常，则调用这个方法进入下一个钩子 next(false)去掉导航，路由不发生改变 next('/login')当前导航被中断，然后进入一个新的导航 next(error)如果一个Error实例，则导航会被终止且该错误会被传递给router.onError()
        1.2、afterEach(to, from) 路由改变后的钩子，常用于自动让页面返回最顶端，用法相似，少了next参数
    2、路由配置中导航钩子
    3、组件内的钩子函数
        3.1、beforeRouteEnter(to, from, next) 该组件的对应路由被confirm前调用，此时实例还没有被创建，所以不能获取实例this
        3.2、beforeRouteUpdate(to, from, next) 当前路由改变，但该组件被复用时调用，该函数内可以访问组件实例this
        3.3、beforeRouteLeave(to, from, next) 当导航离开组件的对应路由时调用，该函数内可以访问获取到组件实例this
-->
<template>
  <div>
    <h1>vue-router中的导航钩子</h1>
  </div>
</template>

<script>
export default {
    // 1、全局钩子验证用户权限
    // router.beforeEach((to, from, next) => {
    //     if (to.fullPath !== '/login') {
    //         // 不是登录组件
    //         // 如果没有登录，就先进入login组件进行登录
    //         if (!localStorage.getItem('username')) {
    //             next('/login')
    //         } else {
    //             // 登录过
    //             next()
    //         }
    //     } else {
    //         // 是登录组件
    //         next()
    //     }
    // })

    // 2、路由配置中的导航钩子
    // const router = new VueRouter({
    //     routes: [
    //         {
    //             path: '/foo',
    //             component: Foo,
    //             beforeEnter: (to, from, next) => {

    //             },
    //             beforeEnter: (router) => {

    //             }
    //         }
    //     ]
    // })

    // 3、组件内钩子函数
    // const Foo = {
    //     template: `...`,
    //     beforeRouteEnter(to, from, next) {
    //         // 在渲染该组件的对应路由被confirm前调用，不能获取到组件实例this,因为当前钩子执行前，组件实例还没有创建
    //     },
    //     beforeRouteUpdate(to, from, next) {
    //         // 在当前路由改变，但是该组件被复用时调用，比如对于一个带有动态参数的路径/foo/:id，在/foo/1和/foo/2 之间跳转的时候由于会渲染同样的Foo组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。可以访问组件实例this
    //     },
    //     beforeRouteLeave(to, from, next) {
    //         // 导航离开该组件的对应路由时调用，可以访问到组件实例this
    //     }
    // }
}

</script>
<style>
</style>