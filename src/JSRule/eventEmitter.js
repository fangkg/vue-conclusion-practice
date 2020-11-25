/*
 * @Author: fangkg
 * @Date: 2020-11-25 15:21:46
 * @LastEditTime: 2020-11-25 16:16:18
 * @LastEditors: Please set LastEditors
 * @Description: 发布订阅模式
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\JSRule\eventEmitter.js
 */

class EventEmeitter {
    constructor() {
        // 存储事件/回调键值对
        this._events = this._events || new Map();
        // 设立监听上线
        this._maxListeners = this._maxListeners || 10;
    }
}

// 触发名为type的事件
// EventEmeitter.prototype.emit = function(type, ...args) {
//     let handler;
//     // 从存储事件键值对的this._events中获取对应事件回调函数
//     handler = this._events.get(type);
//     if (args.length > 0) {
//         handler(this, args);
//     } else {
//         handler.call(this);
//     }
//     return true;
// }

// 监听名为type的事件
// EventEmeitter.prototype.addListener = function(type, fn) {
//     // 将type事件以及对应的fn函数放入this._events存储
//     if (!this._events.get(type)) {
//         this._events.set(type, fn);
//     }
// }

// 触发名为type的事件
EventEmeitter.prototype.emit = function(type, ...args) {
    let handler;
    handler = this._events.get(type);
    if (Array.isArray(handler)) {
        // 如果是一个数组说明有多个监听者，需要依此触发里面的函数
        for(let i = 0; i < handler.length; i ++) {
            if (args.length > 0) {
                handler[i].apply(this, args);
            } else {
                handler[i].call(this);
            }
        }
    } else {
        // 单个函数的情况我们直接触发即可
        if (args.length > 0) {
            handler(this, args);
        } else {
            handler.call(this);
        }
    }
    return true;
}

// 监听名为type的事件
EventEmeitter.prototype.addListener = function(type, fn) {
    // 获取对应事件名称的函数清单
    const handler = this._events.get(type);
    if (!handler) {
        this._events.set(type, fn);
    } else if (handler && typeof handler === "function") {
        // 如果handler是函数说明只有一个监听者,多个监听者我们需要用数组缓存
        this._events.set(type, [handler, fn]);
    } else {
        // 已经有多个监听者，直接往数组里push函数即可
        handler.push(fn);
    }
}

// 清除监听
EventEmeitter.prototype.removeListener = function(type, fn) {
    // 获取对应事件名称的函数清单
    const handler = this._events.get(type);
    // 如果是函数，说明只被监听了一次
    if (handler && typeof handler === "function") {
        this._events.delete(type, fn);
    } else {
        let position;
        // 如果handler是数组，说明被监听多次要找到对应的函数
        for (let i = 0; i < handler.length; i++) {
            if (handler[i] === fn) {
                position = i;
            } else {
                position = -1;
            }
        }

        // 如果找到匹配的函数，从数组中删除
        if (position !== -1) {
            // 找到数组对应的位置，直接清除此回调
            handler.splice(position, 1);
            // 如果清除后只有一个函数，那么取消数组，以函数形式保存
            if (handler.length === 1) {
                this._events.set(type, handler[0]);
            } else {
                return this;
            }
        }
    }

}