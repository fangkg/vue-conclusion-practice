<!--
    1、监听函数的声明周期函数
    1.1、在父组件监听子组件挂载后mounted做一些逻辑处理 @hook可以监听到子组件的声明周期钩子函数如created,updated等
-->
<template>
  <div>
    <Child @hook:mounted="doSomething"></Child>
  </div>
</template>

<script>
import Child from './Child'
export default {
    components: {
        Child
    },
    methods: {
        doSomething() {
            console.log('child component has mounted!')
        }
    }
}

</script>
<style>
</style>