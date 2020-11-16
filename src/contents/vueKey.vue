<!--
    1、key的作用主要是为了高效的更新虚拟DOM，其原理是vue在patch过程中通过key可以精准判断两个节点是否是同一个，从而避免频繁更新不同的元素，使得整个patch过程更高效，减少DOM操作量，提高性能
    2、如果不设置key可能在列表更新时引发一些隐蔽的bug
    3、vue中在使用相同标签名元素的过度切换时，也会使用到Key属性，其目的也是为了让vue可以区分它们，否则vue只会替换其内部属性而不会触发过度效果
-->
<template>
  <div>
      <h1>vue中key的作用和工作原理</h1>
  </div>
</template>

<script>
export default {

}

</script>
<style>
</style>