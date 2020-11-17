// 实现一个instanceof
function instanceOfIns(left, right) {
    if (typeof left !== 'object' || left === null) {
        return false
    }
    // 获取原型
    let proto = Object.getPrototypeOf(left);
    while(proto) {
        // 如果原型为null则已经到了原型链顶端，判断结束
        if (proto === null) {
            return false;
        }
        // 左边的原型等于右边的原型，返回结果
        if (proto === right.prototype) {
            return true;
        }
        // 继续向上获取原型
        proto = Object.getPrototypeOf(proto);
    }
}
instanceOfIns()