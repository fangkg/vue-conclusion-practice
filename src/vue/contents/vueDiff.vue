<!--
    1、diff算法是虚拟DOM技术的必然产物：通过新旧虚拟DOM对比(即diff)，将变化的地方更新在真实DOM上；另外，也需要diff高效的执行对比过程，从而降低时间复杂度未O(n)
    2、vue2.x中为了降低watcher粒度，每个组件只有一个watcher实例与之对应，只有引入diff才能精确找到发生变化的地方
    3、vue中diff执行的时刻是组件实例执行其更新函数时，它会比对上一次渲染结果oldVnode和新的渲染结果newVnode比过程称为patch
    4、diff过程整体遵循深度优先、同层比较的策略；两个节点之间比较会根据它们是否拥有子节点或者文本节点做不同操作；比较两组子节点是算法的重点，首先假设头尾节点可能相同做4次比对尝试，如果没有找到相同节点才按照通用方式遍历查找，查找结束再按情况处理剩下的节点；借助key通常可以非常精确找到相同节点，因此整个Patch过程非常高效
-->
<template>
  <div>
    <h1>vue中diff算法</h1>
  </div>
</template>

<script>
export default {

}

</script>
<style>
</style>