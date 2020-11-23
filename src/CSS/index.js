/*
 * @Author: fangkg
 * @Date: 2020-11-20 16:47:38
 * @LastEditTime: 2020-11-23 10:13:14
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

// 定位上下文
// relative元素的定位永远是相对自身元素位置的，和其它元素没有关系，也不会影响其它元素。
// fixed元素的定位是相对于window或者iframe边界的，和其它元素没有关系。但是它有破坏性，会导致其它元素位置的变化。
// absolute的定位相对于relative和fixed要复杂许多。如果为absolute设置了top和left，浏览器会递归查找该元素的所有父元素，如果找到了一个设置position: relative/absolute/fixed的元素，就以该元素为基准定位，如果没有找到，就以浏览器边界定位。

// flex布局
// 布局的传统解决方案是基于盒子模型，依赖dispaly属性+position属性+float属性。对于特殊布局非常不方便。
// 设计原理：设置了'display: flex;'的元素，我们称为容器(flex container)，其所有的子节点我们称为成员(flex item)。容器默认存在两根轴：水平为主轴(main axis)和垂直的交叉轴(cross axis)。主轴的开始位置(与边框的交叉点)叫做main start,结束位置叫main end；交叉轴的开始位置叫cross start，结束位置叫cross end。项目默认沿主轴排列。单个项目占据的主轴空间叫做main size，占据的交叉轴的空间叫做crosss size。
// 设置主轴的方向
// row默认值，主轴为水平方向，起点在左端。
// row-reverse，主轴为水平方向，起点在右端。
// column,主轴为垂直方向，起点在上沿。
// column-reverse，主轴为垂直方向，起点在下沿。

// 设置主轴的对齐方式
// justify-content属性定义了项目在主轴上的对齐方式
// flex-start：默认值，向主轴开始方向对齐
// flex-end: 向主轴结束方向对齐
// center：居中
// space-between：两端对齐，项目之间的间隔都相等
// space-around：每个项目两侧的间距相等。所以，项目之间的间隔比项目与边框的间隔大一倍。

// 交叉轴对齐方式
// align-items：属性定义项目在交叉轴上的对齐方式
// flex-start：交叉轴的起点对齐
// flex-end：交叉轴的终点对齐
// center：交叉轴的中的对齐
// baseline：项目的第一行文字的基线对齐
// stretch默认值：如果项目未设置高度或者设置为auto，将占满整个容器的高度

// 居中对齐
// 水平居中 inline元素用text-align: center; block元素使用margin: auto; 绝对定位元素可结合left和margin实现，但是必须直到宽度。

// 垂直居中
// inline元素可以设置line-height的等于height值，如单行文字垂直居中。
// 绝对定位元素，可结合left和margin实现，必须直到尺寸；兼容性好，需要提前知道尺寸。
// 绝对定位可结合transform实现居中；不需要提前知道尺寸；兼容性不好；
// 绝对定位结合margin: auto，不需要提前知道尺寸，兼容性好。

// 语义化
// 让人写程序、读程序更容易读懂；让计器浏览器、搜索引擎更容易读懂。

// CSS3动画
// 使用@keyframes定义一个动画，名称为testAnimation。通过百分比来设置不同的css样式，规定动画的变化。
// animation-name对应到动画的名称，animation-duration是动画时长。
// animation-timing-function：规定动画的速度曲线。默认是ease
// animation-delay：规定动画何时开始。默认是0
// animation-iteration-count：规定动画被播放的次数。默认是1
// animation-direction： 规定动画是否在下一周期逆向的播放。默认是normal
// animation-play-state：规定动画是否正在运行或暂停。默认是running
// animation-fill-mode：规定动画执行之前和之后如何给动画的目标应用，默认是none,保留在最后一帧可以用forwards

// transition和animation的区别
// 从语义上理解：transition是过渡，由一个状态过渡到另一个状态，比如高度从100px过渡到200px；而animation是动画，专业做动效的，animation有帧的概念，可以设置关键帧keyframe，一个动画可以由多个关键帧多个过渡组成，另外animation也包括上面提到的多个属性。

// 重绘和回流
// 重绘：当页面中的元素不脱离文档流，而简单地进行样式的变化，比如修改颜色、背景等，浏览器重新绘制样式
// 回流：指的是处于文档流中DOM的尺寸大小，位置或某些属性发生变化时，导致浏览器重新渲染部分或者全部文档的情况。


