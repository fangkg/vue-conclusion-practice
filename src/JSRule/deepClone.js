/*
 * @Author: fangkg
 * @Date: 2020-11-25 10:02:17
 * @LastEditTime: 2020-11-25 10:31:46
 * @LastEditors: Please set LastEditors
 * @Description: 深克隆
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\JSRule\deepClone.js
 */

// JSON.parse(JSON.stringfy(oldObj));
// 局限性：
// 无法实现对函数、RegExp等特殊对象的克隆
// 会抛弃对象的constructor，所有的构造函数会指向Object
// 对象有循环引用，会报错

const clone = parent => {
    // 判断类型
    const isType = (obj, type) => {
        if (typeof obj !== 'object') {
            return false;
        }
        const typeString = Object.prototype.toString.call(obj);
        let flag;
        switch(type) {
            case "Array":
                flag = typeString === "[object Array]";
                break;
            case "Date":
                flag = typeString === "[object Date]";
                break;
            case "RegExp":
                flag = typeString === "[object RegExp]";
                break;
            default:
                flag = false;
        }

        return flag;
    }

    // 处理正则
    const getRegExp = re => {
        let flags = '';
        if (re.global) {
            flags += 'g';
        }
        if (re.ignoreCase) {
            flags += 'i';
        }
        if (re.multiline) {
            flags += 'm';
        }
        return flags;
    }

    // 维护两个存储循环引用的数组
    const parents = [];
    const children = [];

    const _clone = parent => {
        if (parent === null) {
            return null;
        }
        if (typeof parent !== 'object') {
            return parent;
        }
        let child, proto;

        if (isType(parent, "Array")) {
            // 对数组做特殊处理
            child = [];
        } else if (isType(parent, "RegExp")) {
            // 对正则对象做特殊处理
            child = new RegExp(parent.source, getRegExp(parent));
            if (parent.lastIndex) {
                child.lastIndex = parent.lastIndex;
            }
        } else if (isType(parent, "Date")) {
            // 对Date对象做特殊处理
            child = new Date(parent.getTime());
        } else {
            // 处理对象原型
            proto = Object.getPrototypeOf(parent);
            // 利用Object.create切断原型链
            child = Object.create(proto);
        }

        // 处理循环引用
        const index = parents.indexOf(parent);

        if (index != -1) {
            // 如果父数组存在本对象，说明之前已经被引用过，直接返回此对象
            return children[index];
        }

        parents.push(parent);
        children.push(child);

        for (let i in parent) {
            // 递归
            child[i] = _clone(parent[i]);
        }

        return child;
    }

    return _clone(parent);
}

console.log('clone:', clone);

console.log('type:', )