/*
 * @Author: fangkg
 * @Date: 2020-11-25 10:32:11
 * @LastEditTime: 2020-11-25 15:21:11
 * @LastEditors: Please set LastEditors
 * @Description: event bus是node各个模块的基石，前端通信的依赖手段，订阅-发布模式
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\JSRule\eventBus.js
 */

class EventEmeitter {
    constructor() {
        // 存储事件/回调键值对
        this._events = this._events || new Map();
        // 设立监听上限
        this._maxListener = this._maxListener || 10;
    }
}

// 触发名为type的事件
EventEmeitter.prototype.emit = function(type, ...args) {
    let handler;
    // 从存储事件键值对的this._events中获取对应事件回调函数
    handler = this._events.get(type);
    if (args.length > 0) {
        handler.apply(this, args);
    } else {
        handler.call(this);
    }
    return true;
}
 
// 监听名为type的事件
EventEmeitter.prototype.addListener = function(type, fn) {
    // 将type事件以及对应的fn函数放入this._events中存储
    if (!this._events.get(type)) {
        this._events.set(type, fn);
    }
}
