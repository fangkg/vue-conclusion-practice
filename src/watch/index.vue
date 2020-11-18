<!--
    1、某些情况下，可能需要在组件创建后立即运行监听程序，可以使用watche时使用immediate:true选项
    2、也可以将逻辑迁移至methods中，然后从watch和created钩子函数中分别调用它
-->
<template>
  <div></div>
</template>

<script>
export default {
    data() {
        return {
            dog: ""
        }
    },
    watch: {
        dog: {
            handler(newVal, oldVal) {
                console.log(`Dog changed: ${newVal}, ${oldVal}`)
            }
        },
        immediate: true
    }
}

</script>
<style>
</style>