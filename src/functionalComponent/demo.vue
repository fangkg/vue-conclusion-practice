<!--
    1、函数式组件 无状态 无法实例化 内部没有任何生命周期处理方法 非常轻量渲染性能高 特别适合用来只依赖外部数据传递而变化的组件
        1.1、在template标签里标明functional
        1.2、只接受props值
        1.3、不需要script标签
-->
<template functional>
  <div>
    <p v-for="(name, index) in props.users" @click="props.clickHandler(name)" :key="index">
        {{ name }}
    </p>
  </div>
</template>

<script>
export default {

}

</script>
<style>
</style>