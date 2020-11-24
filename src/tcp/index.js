/*
 * @Author: fangkg
 * @Date: 2020-11-24 10:35:19
 * @LastEditTime: 2020-11-24 10:50:52
 * @LastEditors: Please set LastEditors
 * @Description: TCP特性
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\tcp\index.js
 */
// TCP
// 面向连接、可靠的字节流服务
// 在一个TCP连接中，仅有两方进行彼此通信，广播和多播不能用于TCP
// TCP使用校验、确认、重传机制来保证可靠传输
// TCP给数据分节进行排序，并使用累计确认保证数据的顺序不变和非重复
// TCP使用滑动窗口机制来实现流量控制，通过动态改变窗口大小进行拥塞控制

// 三次握手、四次挥手
