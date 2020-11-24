<!--
    1、vue组件可能存在多个实例，如果使用对象形式定义data,则会导致它们共用一个data对象，那么状态变更将会影响所有组件实例，这是不合理的；采用函数形式定义，在initData时会将其作为工厂函数返回权限的data对象，有效规避多个实例之间状态污染的问题。
    2、vue根实例创建过程中不存在该限制，因为根实例只能有一个，不需要担心这种情况。
-->
<template>
  <div>
    <h1>vue组件中data为什么必须是个函数而Vue的根实例则没有此限制？</h1>
  </div>
</template>

<script>
export default {

}

</script>
<style>
</style>