/*
 * @Author: fangkg
 * @Date: 2020-11-23 10:24:09
 * @LastEditTime: 2020-11-23 10:37:46
 * @LastEditors: Please set LastEditors
 * @Description: 事件类Event，包含绑定事件、解绑事件和派发事件
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\dataStructure\Event.js
 */

class Event {
    constructor() {
        // 存储事件的数据结构，为了快速查找，使用了对象(字典)
        this._cache = {};
    }

    // 绑定
    on(type, callback) {
        // 为了按类型查找方便和节省空间，将同一类型事件放到一个数组中，这里的数组时队列，遵循先进先出，即先绑定的事件先触发
        let fns = (this._cache[type] = this._cache[type] || []);
        if (fns.indexOf(callback) === -1) {
            fns.push(callback);
        }
        return this;
    }

    // 触发
    trigger(type, data) {
        let fns = this._cache[type];
        if (Array.isArray(fns)) {
            fns.forEach(fn => {
                fn(data);
            })
        }
        return this;
    }

    // 解绑
    off(type, callback) {
        let fns = this._cache[type];
        if (Array.isArray(fns)) {
            if (callback) {
                let index = fns.indexOf(callback);
                if (index !== -1) {
                    fns.splice(index, 1);
                }
            } else {
                // 全部清除
                fns.length = 0;
            }
        }
        return this;
    }
 }



 const event = new Event();
 event.on('test', a => {
     console.log('a:', a);
 })

 event.trigger('test', 'hello world');

 event.off('test');
 event.trigger('test', 'bye');