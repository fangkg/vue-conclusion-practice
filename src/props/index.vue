<!--
    1、验证props是vue中的基本做法，可以自定义验证函数
-->
<template>
  <div></div>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
            required: true,
            validator: function(value) {
                return [
                    '张三',
                    'jack'
                ].indexOf(value) !== -1
            }
        }
    }
}

</script>
<style>
</style>