<!--
    1、new Vue({ el: '#app' })
    2、单文件组件中，template下的元素div，其实就是树状数据结构中的根
    3、diff算法要求只能由一个根元素

    4、<template></template>标签：
        4.1、隐藏性：该标签不会显示在页面的任何地方，即便里面有多少内容，它永远都是隐藏的状态，设置了display: none
        4.2、任意性：该标签可以写在任何地方，甚至是head body script标签内
        4.3、无效性：该标签里的任何HTML内容都是无效的，不会起任何作用；只能innerHTML来获取到里面的内容
    5、一个vue单文件组件就是一个vue实例，如果template下有多个div，那么如何指定vue实例的根入口？为了让组件可以正常生成一个vue实例，这个div会自然的处理成程序的入口，通过这个根节点来递归遍历整个vue树下的所有节点，并处理为vdom，最后再渲染成真正的HTML，插入在正确的位置。

-->
<template>
  <div>
    <h1>vue要求组件模板只能有一个根元素</h1>
  </div>
</template>

<script>
export default {

}

</script>
<style>
</style>