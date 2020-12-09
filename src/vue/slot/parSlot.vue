<!--
 * @Author: fangkg
 * @Date: 2020-12-09 08:51:35
 * @LastEditTime: 2020-12-09 10:09:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\vue\slot\parSlot.vue
-->
<template>
    <child>
        <!-- 默认插槽 -->
        <!-- 默认插槽名为default，可以省略default直接写v-slot，缩写为#时不能不写参数，写成#default -->
        <!-- 多个插槽混用时，v-slot不能省略default -->
        <template v-slot>
            <div>默认插槽</div>
        </template>
        <!-- 具名插槽 -->
        <template #header>
            <div>具名插槽</div>
        </template>
        <!-- 作用域插槽 -->
        <template #footer="slotProps">
            <div>
                {{ slotProps.testProps }}
            </div>
        </template>
    </child>
</template>