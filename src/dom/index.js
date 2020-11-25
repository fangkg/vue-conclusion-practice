/*
 * @Author: fangkg
 * @Date: 2020-11-24 11:03:45
 * @LastEditTime: 2020-11-24 11:15:14
 * @LastEditors: Please set LastEditors
 * @Description: DOM
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\dom\index.js
 */

 // 事件模型
 // 脚本模型(行内绑定)、内联模型(同类一个，后者覆盖)、动态绑定(同类多个)
 
 // 事件流
 // 事件就是文档或者浏览器窗口中发生的一些特定的交互瞬间；而事件流又叫事件传播，描述的是从接收事件的顺序。

 // 事件冒泡(文档中嵌套层次最深的那个节点)
 // 事件开始时由最具体的元素接收，然后逐级向上传播到较为不具体的节点。

 // 事件捕获
 // 不太具体的节点应该更早的接收到事件，而最具体的节点应该最后接收到事件。事件捕获的用以在于在事件到达预定目标之前就捕获它。

 // 事件委托
 // 利用事件冒泡只指定一个事件处理程序，就可以管理某一类型的所有事件。在绑定大量事件的时候往往选择事件委托。
 // 优点：节省内存占用，减少事件注册；新增子对象时无需再次对其绑定事件，适合动态添加元素。
 // 局限：focus、blur之类的事件本身没有事件冒泡机制，所以无法委托；mousemove、mouseout这样的事件，虽然有事件冒泡，但是只能不断通过位置去计算定位，对性能消耗高，不适合事件委托。

 