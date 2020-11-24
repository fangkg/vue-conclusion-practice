<!--
    1、图片懒加载组件
    2、使用渐进式图像加载方式来加载图片，通过设置src-placeholder先加载缩略图，同时使用css应用自己的过度效果
-->
<template>
  <div>
    <v-lazy-image src=""
                  src-placeholder=""/>
  </div>
</template>

<script>
import Vue from 'vue';
import { VLazyImagePlugin } from 'v-lazy-image';
Vue.use(VLazyImagePlugin);
export default {

}

</script>
<style scoped>
.v-lazy-image {
    filter: blur(10px);
    transition: filter 0.7s;
}
.v-lazy-image-loaded {
    filter: blur(0);
}
</style>