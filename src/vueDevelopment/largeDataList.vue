<!--
    1、在2.x版本中Vue会通过Object.defineProperty对数据进行劫持，以实现双向数据绑定。但是在一些特定的业务场景，组件只需要进行纯数据展示，不会做任何变化，在大量数据需要进行呈现时，如果禁止vue对数据进行劫持，会明显减少组件初始化的时间。
        1.1、Object.freeze方法冻结对象
-->
<template>
  <div>
    <h1></h1>
  </div>
</template>

<script>
export default {
    data() {
        return {
            userList: []
        }
    },
    async created() {
        const userList = await this.$service.get('/getUserList');
        this.userList = Object.freeze(userList);
    }
}

</script>
<style>
</style>