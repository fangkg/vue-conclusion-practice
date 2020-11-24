<template>
  <div>
    <p>count: {{ count }}</p>
    <button @click="add">+1</button>
    <button @click="sub">-1</button>
  </div>
</template>

<script>
import { actions, getters } from './miniStore';
export default {
    name: 'demo',
    computed: {
        count() {
            return getters.count;
        }
    },
    methods: {
        add: actions.setCount(this.count + 1),
        sub: actions.setCount(this.count - 1)
    }
}

</script>
<style>
</style>