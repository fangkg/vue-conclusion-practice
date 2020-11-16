<!-- 
    1、v-for优先于v-if被执行
    2、如果同时出现，每次渲染都会先执行循环再判断条件，无论如何循环都不可避免，浪费了性能。
    3、要避免出现这种情况，则在外层嵌套template，在这一层进行v-if判断，然后在内部进行v-for循环
    4、`如果条件出现在循环内部，可通过计算属性提前过滤掉那些不需要显示的项
-->
<template>
  <div>
    <h1>v-for和v-if谁的优先级更高？应该如何正确使用避免性能问题?</h1>
    <div>
        <!-- 错误示例 -->
        <!-- <p v-for="(child, index) in children" v-if="isFolder" :key="index">{{ child.title }}</p> -->
        <template v-if="isFolder">
            <p v-for="(child, index) in children" :key="index">{{ child.title }}</p>
        </template>
    </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            children: [
                { title: 'foo' },
                { title: 'boo' }
            ]
        }
    },
    computed: {
        isFolder() {
            return this.children && this.children.length > 0
        }
    }
}

</script>
<style>
</style>