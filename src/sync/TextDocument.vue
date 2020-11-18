<template>
  <div></div>
</template>

<script>
export default {
    data() {
        return {
            newTitle: ""
        }
    },
    methods: {
        submit() {
            // 修改包含title的prop属性
            this.$emit('update:title', this.newTitle)
        }
    }
}

</script>
<style>
</style>