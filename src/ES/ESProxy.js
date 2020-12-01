/*
 * @Author: fangkg
 * @Date: 2020-12-01 17:13:27
 * @LastEditTime: 2020-12-01 17:16:04
 * @LastEditors: Please set LastEditors
 * @Description: proxy用于修改某些操作的默认行为，等同于在语言层面做出修改，对编程语言进行编程。
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\ES\ESProxy.js
 */
// 在目标对象之前架设一层拦截，外界对该对象的访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。
