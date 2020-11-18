<template>
  <div>
    <span v-for="(item, index) in users" :key="index">
        {{ item.name }}
    </span>
  </div>
</template>

<script>
export default {
    data() {
        return {
            users: []
        }
    },
    created() {
        let users = Array.from({ length: 100000 }, (item, index) => ({ name: index }));
        this.users = users;
    }
}

</script>
<style>
</style>