<!--
    1、MVC model负责保存应用数据，与后端数据进行同步；controller负责业务逻辑，根据用户行为对model数据进行修改；view负责视图展示，将model中的数据可视化出来
        1.1、数据流混乱
        1.2、view比较庞大，controller比较单薄，由于很多开发者都会在view中写一些业务逻辑代码，逐渐导致view中内容越来越庞大，controller越来越淡薄
    2、MVP P: Presenter中间人 负责view和model之间数据流动，防止view和model之间直接交流。应用逐渐变大之后导致presenter体积增大难以维护
    3、MVVM Model View ViewModel
        3.1、Model 应用逻辑全部是数据操作
        3.2、ViewModel通过实现一套数据响应式机制自动响应Model中数据变化，同时ViewModel会实现一套更新策略自动将数据变化转化为视图更新。通过事件监听响应View中用户交互修改Model中的数据，这样在ViewModel中就减少了大量DOM操作代码。MVVM在保持View和Model松耦合的同时，还减少了维护它们关系的代码，使用户专注于业务逻辑，兼顾开发效率和可维护性。
-->
<template>
  <div>
    <h1>MVC MVP MVVM</h1>
  </div>
</template>

<script>
export default {

}

</script>
<style>
</style>