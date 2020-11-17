// 使用Object.defineProperty(Obj, prop, desc)

function _const(key, value) {
    const desc = {
        value,
        writable: false
    }
    Object.defineProperty(window, key, desc);
}

// 定义obj
_const('obj', { a: 1 })
// 重新赋值不生效
// obj = {}