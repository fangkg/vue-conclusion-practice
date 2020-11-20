/*
 * @Author: fangkg
 * @Date: 2020-11-20 16:47:38
 * @LastEditTime: 2020-11-20 18:05:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\CSS\index.js
 */

// 选择器的权重和优先级
// 权重分为四个级别
// 内联样式，权值为1000
// ID选择器，权值为100
// 类、伪类和属性选择器，如.content :hover [attribute] 权值为10
// 元素选择器和伪元素选择器，权值为1，如div p

// 通用选择器(*)、子选择器(>)、相邻同胞选择器(+)并不在这四个等级中，所以它们的权值都是0
// 权重值大的选择器其优先级也高，相同权重的优先级又遵循后定义覆盖前面定义的情况。

// 盒模型 padding内边距  border边框  margin外边距
// 盒模型中设置的宽度都是内容宽度，不是真个盒子的宽度
// 整个盒子的宽度 = 内容宽度 + bordr宽度 + padding宽度 + margin宽度
// 为盒子模型设置宽度：box-sizing: border-box;


// 纵向margin重叠。如果<p></p>的纵向margin是16px，两个<p></p>之间纵向距离也是16，不是16+16=32；如果两者不一样大的话，大的会把小的吃掉

// 浮动float float被设计出来的初衷是用于文字环绕效果；后来大家发现结合float + div可以实现之前通过table实现的网页布局
// float导致父元素塌陷，被设置了float的元素会脱离文档流
// float包裹性，普通div如果没有设置宽度，它会撑满整个屏幕。如果给div增加了float:left之后，它会变得紧凑起来，宽度发生了变化，把内容中的三个字包裹了就是包裹性。为div设置了float之后，其宽度会自动调整为包裹住内容宽度，而不是撑满整个父容器。

// 定位position 用于网页元素的定位，可设置static/relative/absolute/fixed，其中static是默认值
// 相对定位relative，relative会导致自身位置相对变化，不会影响其它元素的位置、大小；relative产生一个新的定位上下文；
// 绝对定位absolute，元素脱离了文档结构。导致父元素塌陷。absolute元素是根据最近的定位上下文确定位置。
// fixed，根据window或者iframe确定位置

// flex布局
// 布局的传统解决方案是基于盒子模型，依赖dispaly属性+position属性+float属性。对于特殊布局非常不方便。
// 设计原理：设置了'display: flex;'的元素，我们称为容器(flex container)，其所有的子节点我们称为成员(flex item)。容器默认存在两根轴：水平为主轴(main axis)和垂直的交叉轴(cross axis)。主轴的开始位置(与边框的交叉点)叫做main start,结束位置叫main end；交叉轴的开始位置叫cross start，结束位置叫cross end。项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴的空间叫做crosss size。
// 设置主轴的方向
// row默认值，主轴为水平方向，起点在左端。
// row-reverse，主轴为水平方向，起点在右端。
// column,主轴为垂直方向，起点在上沿。
// column-reverse，主轴为垂直方向，起点在下沿。