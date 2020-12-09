<!--
 * @Author: fangkg
 * @Date: 2020-12-09 08:30:43
 * @LastEditTime: 2020-12-09 08:45:13
 * @LastEditors: Please set LastEditors
 * @Description: slot插槽 子组件
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\vue\slot\slot.vue
-->
<template>
    <div>
        <main>
            <!-- 默认插槽 -->
            <slot>
                <!-- slot内为后备内容 -->
                <h3>没传内容</h3>
            </slot>
        </main>
        <header>
            <!-- 具名插槽 -->
            <slot name="header">
                <h3>没传header插槽</h3>
            </slot>
        </header>
        <footer>
            <!-- 作用域插槽 -->
            <slot name="footer" testProps="子组件的值">
                <h3>没传footer插槽</h3>
            </slot>
        </footer>
    </div>
</template>