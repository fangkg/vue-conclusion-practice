<template>
  <div>
    <Demo :users="users" :click-handler="clickHandler.bind(this)"></Demo>
  </div>
</template>

<script>
import Demo from './demo';
export default {
    name: 'index',
    data(){
        return {
            users: ['jack', 'lucy']
        }
    },
    components: {
        Demo
    },
    methods: {
        clickHandler(name) {
            console.log(`clicked: ${name}`)
        }
    }
}

</script>
<style>
</style>