/*
 * @Author: fangkg
 * @Date: 2020-11-23 13:48:06
 * @LastEditTime: 2020-11-23 13:58:39
 * @LastEditors: Please set LastEditors
 * @Description: 开发环境相关
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\devEnvironment\index.js
 */

 // 前端构建工具
 // 构建可以理解为编译，将开发环境的代码转成运行环境代码的过程。开发环境的代码是为了更好地阅读，运行环境的代码是为了更好的执行。两者目的不同。因此代码形式也不一样。
 // 处理模块化：CSS和JS的模块化语法，目前都无法被浏览器兼容。因此开发环境可以使用既定的模块化语法，但是需要构建工具将模块化语法编译成浏览器可以识别的形式。例如，使用webpack等处理JS模块化。
 // 编译语法：编写CSS时使用的是Less、Sass，编写JS时使用的ES6,TypeScritp等。这些标准心在无法被浏览器兼容，因此需要构建工具编译。例如，使用Babel编译ES6语法。
 // 代码压缩：将CSS、JS代码混淆压缩，使得代码体积更小，加载更快。

 // 调试方法，PC端的网页可以通过Chrome、Firefox等浏览器自带的开发者工具来查看网页的所有网络请求。这种监听、查看网络请求的操作称为抓包