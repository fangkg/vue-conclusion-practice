<!--
    1、provide/inject这对选项需要一起使用，允许一个祖先向所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终有效。
    2、provide选项应该是一个对象或者返回一个对象的函数。该对象包含可注入其子孙的属性
    3、inject选项是一个字符串数组或者一个对象，对象的key是本地的绑定名，value是在可用的注入内容中搜索用的key,字符串或Symbol或一个对象
    4、provide和inject绑定并不是响应式的，这是刻意而为之，如果传入一个可监听的对象，其对象的属性还是可响应式的。
-->
<template>
  <div></div>
</template>

<script>
export default {
    // 父级组件提供foo
    provide: {
        foo: 'bar'
    },
    // 子组件注入foo
    inject: ['foo'],
    created() {
        console.log('foo:', this.foo)
    }
}

</script>
<style>
</style>