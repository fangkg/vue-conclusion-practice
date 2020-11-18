<!--
    1、vue中style标签的scoped属性表示它的样式只作用于当前组件，是样式私有化，设计的初衷 是让样式变得不可修改
    2、渲染规则
        2.1、给HTML的DOM节点添加一个不重复的data属性来表示唯一性
        2.2、在对应的CSS选择器末尾添加一个当前组件的data属性选择器来私有化样式
        2.3、若组件内部包含其它组件，只会给其它组件的最外层标签加上当前组件的data-v属性
    3、添加scoped属性后，父组件无法修改子组件的样式
    4、使用深层选择器deep修改子组件样式
-->
<template>
  <div class="demo">
    <span class="content">
        Vue.js scoped
    </span>
  </div>
</template>

<script>
export default {

}

</script>
<style lang="less" scoped>
.demo {
    font-size: 14px;
    .content {
        color: red;
    }
}
</style>