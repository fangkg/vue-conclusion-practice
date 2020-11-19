// 栈，操作受限的线性表，只能从一端插入或者删除数据；入栈出栈时间复杂度、空间复杂度都是O(1)
function Stack() {
    var items = [];
    // 添加元素到栈顶
    this.push = function(element) {
        items.push(element);
    }
    // 移除栈顶元素同时返回它们
    this.pop = function() {
        return items.pop()
    }
    // 返回栈顶的元素，不对栈做任何修改
    this.peek = function() {
        return items[items.length - 1];
    }
    // 判断栈是否为空，为空返回true，否则返回false
    this.isEmpty = function() {
        return items.length === 0;
    }
    // 返回栈里的元素的个数
    this.size = function() {
        return items.length;
    }
    // 清空栈
    this.clear = function() {
        items = [];
    }
}