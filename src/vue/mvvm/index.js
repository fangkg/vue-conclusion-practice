/*
 * @Author: fangkg
 * @Date: 2020-11-24 11:40:33
 * @LastEditTime: 2020-11-24 11:52:34
 * @LastEditors: Please set LastEditors
 * @Description: MVVM模式
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\vue\mvvm\index.js
 */

// Model层：对应数据层的域模型，主要做域模型的同步。通过Ajax/fetch等API完成客户端和服务端业务Model的同步。在层间关系里，主要用于抽象出ViewModel中视图的Model
// View层：视图模板，动态模板。除了定义机构、布局外，它展示的是ViewModel层的数据和状态。View层不负责处理状态，做的是数据绑定的声明、指令的声明、事件绑定的声明。
// ViewModel层：把View需要的层数据暴露，并对View层的数据绑定声明、指令声明、事件绑定声明负责，处理View层的具体业务逻辑。ViewModel底层会做好绑定属性的监听。当ViewModel中数据变化，View层会得到更新；当Veiw中声明了数据的双向绑定(通常是表单元素)，框架也会监听View层(表单)值的变化。一旦值变化，View层绑定的ViewModel中的数据也会得到自动更新。

// 优点：分离视图(View)和模型(Model)，降低代码耦合，提高视图或者逻辑的重用性；提高可测试性；自动更新DOM，利用双向绑定，数据更新后视图自动更新，让开发者从繁琐的后动dom中解放
// 缺点：bug很难调试；一个大的模块中model也会很大，虽然使用方便了也很容易保证了数据的一致性，但是长期持有，不释放内存就造成了花费更多的内存；
