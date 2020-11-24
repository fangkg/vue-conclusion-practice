<!--
    1、动态指令参数，可以将指令参数动态传递给组件。例如有一个按钮组件，在某些情况下需要监听单击事件，某些情况下需要监听双击事件
-->
<template>
  <div>
    <button v-on:[eventType]="eventHandler($event)">点击</button>
  </div>
</template>

<script>
export default {
    data() {
        return {
            condition: 1
        }
    },
    computed: {
        eventType() {
            return this.condition ? 'click' : 'dbclick'
        }
    },
    methods: {
        eventHandler($event) {
            window.console.log($event)
        }
    }
}

</script>
<style>
</style>