/*
 * @Author: fangkg
 * @Date: 2020-12-07 10:08:37
 * @LastEditTime: 2020-12-07 11:05:15
 * @LastEditors: Please set LastEditors
 * @Description: 深克隆思路：
 * 1、传递进来的是函数时，不需要操作直接返回即可；因为在一个执行环境栈中一个名字的函数只能有一个，如果我们自己又克隆一个会把原来的替换掉，这样做没有意义。
 * 2、传递进来的是基本数据类型时，不需要操作直接返回即可。
 * 3、传递的是对象类型时：
 *     3.1、正则对象：创建一个新的实例储存当前正则即可(因为我们的目的让空间地址不一样即可)
 *     3.2、日期对象：创建一个日期实例储存当前日期
 *     3.3、普通对象&数组对象：创建一个新的实例，循环存储当前信息
 *     3.4、普通对象、数组对象中可能还会存在多层嵌套的关系，递归
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\vivo\clineDeep.js
 */

function _cloneDeep(obj) {
    // 传递进来的不是对象，无需处理，直接返回原始值即可
    // 一般Symbol、Function也不会进行处理
    if (obj === null) {
        return null;
    }
    if (typeof obj !== "object") {
        return obj;
    }
    
    // 过滤掉特殊对象
    // 正则对象、日期对象直接使用原始值创建当前类的一个新的实例即可，这样克隆后的是新的实例，但是值和之前一样
    if (obj instanceof RegExp) {
        return new RegExp(obj);
    }
    if (obj instanceof Date) {
        return new Date(obj);
    }

    // 如果传递的是数组或者对象，需要创建一个新的数组或者对象，用来存储原始的数据
    // obj.constructor获取当前值的构造器Array/Object
    let cloneObj = new obj.constructor;
    for (let key in obj) {
        // 循环原始数据中的每一项，把每一项赋值给新的对象
        if (!obj.hasOwnProperty(key)) {
            break;
        }
        // 递归
        cloneObj[key] = _cloneDeep(obj[key]);
    }

    return cloneObj;
}

let jack = {
    name: 'jack',
    age: 10,
    teacher: {
        0: 'lll',
        1: '222'
    }
}
let rose = {
    age: 22,
    school: 'gu',
    teacher: {
        1: 'sss'
    }
}

// 把两个对象合并为一个对象
// 用后一个替换前一个，返回合并后的新对象；浅比较，只比较第一级；
// 其中同时共有的属性teacher是一个对象数据类型，只比较了一级，就用后一项对应的空间地址替换了前一项obj1的teacher值的空间地址；
let oo = Object.assign(jack, rose);
console.log('oo:', oo);

// 很多时候我们想要的是把相同属性名对应的属性值也合并


// 深比较
// let res = _assignDeep(obj1, obj2);
// 首先克隆一份obj1
// 循环拿出obj2中的每一项与克隆的obj1比较，如果当前拿出的这一项是对象数据类型并且克隆的obj1中相同属性名对象的也是对象类型的值，再次进行深比较(递归)；其余情况直接用obj2的值替换obj1的值；
function _assignDeep(obj1, obj2) {
    // 先把obj1中的每一项深克隆一份赋值给新的对象
    let obj = _cloneDeep(obj1);

    // 再拿obj2替换obj1中的每一项
    for (let key in obj2) {
        if (!obj2.hasOwnProperty(key)) {
            break;
        }

        let v2 = obj2[key], v1 = obj[key];
        // 如果obj2遍历的当前项是个对象，并且对应的obj这项也是一个对象，此时不能直接替换，需要把两个对象重新合并一下，合并后的最新结果赋值给新对象中的这一项。
        if (typeof v1 === 'object' && typeof v2 === 'object') {
            obj[key] = _assignDeep(v1, v2);
            continue;
        }
        obj[key] = v2;
    }

    return obj;
}