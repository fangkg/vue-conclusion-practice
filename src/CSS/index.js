/*
 * @Author: fangkg
 * @Date: 2020-11-20 16:47:38
 * @LastEditTime: 2020-11-23 15:59:52
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

// 清除浮动
// 空div方法<div style="clear: both;"></div>
// Clearfix方法
// .clearfix:after {
//     content: '';
//     display: table;
//     clear: both;
// }
// .clearfix {
//     *zoom: 1;
// }
// overflow: auto/hidden

// 定位position 用于网页元素的定位，可设置static/relative/absolute/fixed，其中static是默认值
// static：正常文档流定位，此时top,right,bottom,left和z-index属性无效，块级元素从上往下纵向排布；行级元素从左往右排列。
// 相对定位relative，relative会导致自身位置相对变化，不会影响其它元素的位置、大小；relative产生一个新的定位上下文；相对于正常文档流的位置。
// 绝对定位absolute，元素脱离了文档结构。导致父元素塌陷。absolute元素是根据最近的定位上下文确定位置。相对于最近的非static定位祖先元素的偏移，来确定元素位置，比如一个绝对定位元素它的父级和祖父级别元素都是relative，它会相对于它的父级而产生偏移。
// fixed，根据window或者iframe确定位置。指定元素相对于屏幕视口viewport的位置来指定元素位置。元素的位置在屏幕滚动时不会改变，比如那种回到顶部的按钮一般都是用fixed定位方式。
// sticky：粘性定位

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

// link和@import的区别
// link属于XHTML标签，@import是CSS提供
// 页面被加载时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载。
// import只有IE5以上可用，而link是XHTML标签，无兼容性问题。
// link方式的样式权重高于@import样式的权重。
// 使用dom控制样式时的差别。当使用javascript控制dom去改变样式的时候，只能使用link标签，因为@import不是dom可以控制的。

// CSS隐藏元素
// opacity: 0;将元素的透明度设置为0，看起来隐藏了，但是依然占据空间且可以交互。
// visibility: hidden; 占据空间，不可以交互。
// overflow: hidden; 只隐藏元素溢出的部分，占据空间不可以交互
// display: none; 彻底隐藏元素，元素从文档流中消失，既不占据空间也不交互，也不影响布局。
// z-index: -9999; 将层级放到底部，这样被覆盖了，看起来隐藏了。
// transform: scale(0, 0);平面变换，将元素缩放为0，但是依然占据空间，但是不可交互。

// 单位
// px：绝对单位，页面按精确像素展示。
// em：相对单位，基准点为父节点字体的大小，如果自身定义了font-size按照自身来计算。浏览器默认字体时16px，整个页面内1em不是一个固定值。
// rem：相对单位，可理解为root em，相对于根节点html的字体大小来计算。

// 块级元素水平居中
// margin: 0 auto;
// flex布局，主流方法
// table方法

// CSS中z-index属性控制重叠元素的垂直叠加顺序，默认元素的z-index为0，可以修改z-index来控制元素的图层位置，而且z-index只能影响设置了position值的元素。

// 层叠上下文，HTML元素的三维概念，这些HTML元素在一条假象的相对于面向电脑屏幕的视窗或网页的用户的z轴上延伸，HTML元素依据其自身属性按照优先级顺序占用层叠上下文空间。

// CSS sprites，雪碧图也叫CSS精灵，是一种CSS图像合成技术，将小图标合并在一起后的图片称为雪碧图。
// 好处：减少加载多张图片的HTTP请求数(一张雪碧图只需要一个请求)；提前加载资源；
// 不足：维护成本高，如果页面背景有少许改动，一般就要改这张合并的图片；加载速度优势在HTTP2开启后就不存在，HTTP2多路复用，多张图片也可以重复利用一个连接通道搞定。


// 媒体查询，由一个可选的媒体类型和零个或多个使用媒体功能的限制了样式表范围的表达式组成，例如宽度、高度和颜色。媒体查询，添加自css3，允许内容的呈现针对一个特定范围的输出设备而进行裁剪，而不必改变内容本身，非常适合web网页应对不同型号的设备而做出对应的相应适配。

// 标准盒模型：元素宽度= margin-left + border-left + padding-left + width + padding-right + border-right + margin-right;
// 怪异盒模型：元素宽度 = border-left + padding-left + content宽度 + padding-right + border-right
// box-sizing: content-box; 标准盒模型
// box-sizing: border-box; 怪异盒模型

// BFC Block Formatting Context 一块对立的区域，让处于BFC内部的元素与外部的元素相互隔离。
// Box: CSS布局的基本单位，Box是CSS布局的对象盒基本单位。
// Formatting context: 块级上下文格式，页面中的一块渲染区域，有一套渲染规则，决定了其子元素将如何定位，以及和其它元素的关系和相互作用。
// 作用：防止margin发生重叠；两栏布局，防止文字环绕；防止元素塌陷；

// translate用来改变位置，不用来改变定位
// translate()是transform的一个值。改变transform或者opacity不会触发浏览器重新布局reflow或重绘repaint，只会触发复合compositions。改变绝对定位会触发重新布局，进而触发重绘和复合。transform使得浏览器为元素创建一个GPU图层，改变绝对定位会使用到GPU。因此translagte()更高效，可以缩短平滑动画的绘制时间。

// 伪类、伪元素
// 伪类是一个以冒号(:)作为前缀，被添加到一个选择器末尾的关键字，希望样式在特定状态下才被呈现到指定的元素时，可以往元素的选择器后面加上对应的伪类。
// 伪元素用于创建一些不在文档树中的元素，并为其添加样式。可以通过::before来在一个元素前面增加一些文本，并为这些文本添加样式。虽然可以看到这些文本，但是这些文本实际上不在文档树中。


// flex
// web应用有不同设备尺寸和分辨率，需要响应式界面设计来满足复杂的布局需求，Flex弹性盒模型的优势在于只声明布局应该具有的行为，而不需要给出具体的实现方式，浏览器负责完成实际的布局，当布局涉及到不定宽度，分布对齐的场景时就要有限考虑弹性布局。