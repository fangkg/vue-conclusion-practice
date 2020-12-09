<!--
 * @Author: fangkg
 * @Date: 2020-12-09 08:44:19
 * @LastEditTime: 2020-12-09 08:47:22
 * @LastEditors: Please set LastEditors
 * @Description: slot 插槽 父作用域
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\vue\slot\parent.vue
-->
<template>
    <div>
        <child>
            <!-- 默认插槽 -->
            <div>默认插槽</div>
            <!-- 具名插槽 -->
            <div slot="header">具名插槽header</div>
            <!-- 作用域插槽 -->
            <div slot="footer" slot-scope="slotProps">
                {{ slotProps.testProps }}
            </div>
        </child>
    </div>
</template>