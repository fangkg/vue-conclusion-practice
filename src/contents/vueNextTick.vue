<!--
    1、尽管MVVM框架不推荐访问DOM，但是有时候确实会有这样的需求，尤其是和第三方插件进行配合使用的时候，免不了要进行DOM操作。nextTick就提供了一个桥梁，确保我们操作的是更新后的DOM
    2、vue通过MutationObserver监听到DOM改动，MutationObserver是HTML5新增的属性，用于监听DOM修改事件，能够监听到节点的属性、文本内容、子节点等的改动。
    3、事件循环(Event Loop) 在js运行环境中，通常伴随着很多事情的发生，比如用户点击、页面渲染、脚本执行、网络请求等等。为了协调这些事件的处理，浏览器使用事件循环机制。事件循环会维护一个或多个任务队列(task queues)，以上提到的事件作为任务源往队列中加入任务。有一个持续执行的线程来处理这些任务，每执行完一个就从队列中移除它，这就是一个事件循环。
    4、vue数据响应的过程包含：数据更改=>通知watcher=>更新DOM，数据更改可能发生在任何时候，如果恰巧放生在重绘之前，就会发生多次渲染，这意味着性能浪费。
    5、microtask 微任务，每一次事件循环都包含一个microtask队列，在循环结束后会一次执行队列中的microtask并移除，然后再开始下一次事件循环。microtask的这一特性是做队列控制的最佳选择。vue进行DOM更新内部也是调用nextTick来做异步队列控制。当我们自己调用nextTick的时候，它就在更新DOM的那个microtask后追加了我们自己的回调函数，从而确保我们的代码在DOM更新后执行，同时也避免了setTimeout可能存在的多次执行的问题。常见的microtask有Promise、MutationObserver、Object.observe(废弃)以及node中的process.nextTick()
    6、vue降级策略：队列控制最佳选择是microtask，而microtask最佳选择是Promise，如果环境不支持Promise，vue就不得不降级为macrotask来做队列控制。macrotask可选方案有setTimeout,但它不是理想的方案，因为setTimeout执行的最小时间间隔是4ms，略微有点延迟。
-->
<template>
  <div>
    <h1>vue中nextTick原理</h1>
  </div>
</template>

<script>
export default {

}

</script>
<style>
</style>