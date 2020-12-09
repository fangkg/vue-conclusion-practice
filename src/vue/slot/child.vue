<!--
    1、v-slot直接在组件标签上写入该插槽的scope
    2、v-slot只能在组件或者template标签上使用，不能使用在普通原生的HTML标签上
    3、v-slot还可以简写为#default
-->
<template>
  <div>
    <List v-slot="{ filterItems }" :items="items">
        <p v-for="(item, index) in filterItems" :key="index">{{ item }}</p>
    </List>
    <Promised :promise="usersPromise">
        <template v-slot:pending>
            <p>Loading...</p>
        </template>
        <template v-slot="users">
            <ul>
                <li v-for="(user, index) in users" :key="index">{{ user.name }}</li>
            </ul>
        </template>
        <template v-slot:rejected="error">
            <p>Error: {{ error.message }}</p>
        </template>
    </Promised>
    <Promised :promise="userPromise">
        <template #pending>
            <p>Loading...</p>
        </template>
        <template #default="users">
            <ul>
                <li v-for="(user, index) in users" :key="index">{{ user.name }}</li>
            </ul>
        </template>
        <template #rejected="error">
            <p>Error: {{ error.message }}</p>
        </template>
    </Promised>
  </div>
</template>

<script>
export default {

}

</script>
<style>
</style>