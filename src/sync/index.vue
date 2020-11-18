<!--
    1、需要对一个prop进行双向绑定，会带来维护上的问题。子组件修改父组件，且在父组件和子组件都没有明显的改动来源
    2、带有.sync修饰符的v-bind不能和表达式一起使用
    3、用一个对象同时设置多个prop时，可以将这个.sync修饰符和v-bind配合使用
-->
<template>
  <div>
    <TextDocument v-bind:title="doc.title" v-on:update:title="doc.title = $event"></TextDocument>
    <TextDocument v-bind:title.sync="doc.title"></TextDocument>
    <!-- 带有 .sync 修饰符的 v-bind 不能和表达式一起使用. -->
    <!-- <TextDocument v-bind:title.sync="doc.title + '!'"></TextDocument> -->
    <!-- 这样会把 doc 对象中的每一个属性 (如 title) 都作为一个独立的 prop 传进去，然后各自添加用于更新的 v-on 监听器。 -->
    <TextDocument v-bind.sync="doc"></TextDocument>
  </div>
</template>

<script>
import TextDocument from './TextDocument'
export default {
    components:{
        TextDocument
    },
    data() {
        return {
            doc: {
                title: ""
            }
        }
    }
}

</script>
<style>
</style>