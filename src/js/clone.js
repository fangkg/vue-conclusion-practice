// 深拷贝、浅拷贝
// 浅拷贝：对对象进行浅层次的复制，只复制一层对象的属性，并不包括对象里面的引用类型数据。当遇到有子对象的情况下，子对象就会互相影响，修改拷贝出来的子对象也会影响原有的子对象。
// 深拷贝：对对象以及对象的所有子对象进行拷贝，新拷贝对象的子对象里的属性修改不会影响到原来的对象

let obj = {
    a: 1,
    b: 2,
    c: {
        d: 4,
        e: 6
    }
}
console.log('obj:', obj)
// 浅拷贝 使用Object.assign()
let obj2 = Object.assign({}, obj);
console.log('obj2:', obj2);
obj2.a = 111;
obj2.c.e = 55;

console.log('修改后：', obj);
console.log('修改后obj2:', obj2);

// 浅拷贝 使用展开运算符
let obj3 = { ...obj };
obj3.a = 22;
obj3.c.e = 99;
console.log('obj:', obj)
console.log('obj3:', obj3)


// 数组浅拷贝
let arr = [1, 2, { a: 5 }];

// 使用Array.prototype.slice()
let arr2 = arr.slice();
arr2[0] = 45;
arr2[2].a = 888;
console.log("arr:", arr);
console.log('arr2:', arr2);

// 使用Array.prototype.concat()
let arr3 = arr.concat();
arr3[0] = 10;
arr[2].a = 19;
console.log('arr:', arr);
console.log('arr3:', arr3);

// 使用展开运算符
let arr4 = [...arr];
arr4[0] = 92;
arr4[2].a = 2876;
console.log('arr:', arr);
console.log('arr4:', arr4);

// source源输入 target目标输出
function shallowCopy(source) {
    // 开头判断以一下入参是不是一个对象
    let target = Array.isArray(source) ? [] : {};
    for (let key in source) {
        // 使用hasOwnProperty限制循环只在对象本身，不去遍历原型上的属性
        if (source.hasOwnProperty(key)) {
            target[key] = source[key];
        }
    }

    return target;
}


// 深拷贝
let source = {
    a: 1,
    b: 55,
    c: {
        d: 33,
        e: 90
    }
}

// 使用JSON 该方法只支持object,array,string,number,true,false,null这集中数据或值
let depObj = JSON.parse(JSON.stringify(source));
console.log('depObj:', depObj);

// 递归方式
function deepCopy(source) {
    // 开头判断入参是不是一个对象
    let target = Array.isArray(source) ? [] : {}
    for (let key in source) {
        if (source.hasOwnProperty(key)) {
            // 再做一层判断看看是否有子属性
            if (source[key] && typeof source[key] !== null && typeof source[key] === "object") {
                target[key] = Array.isArray(source[key]) ? [] : {};
                // 递归调用
                target[key] = deepCopy(source[key]);
            } else {
                target[key] = source[key];
            }
        }
    }

    return target;
}
// 这里的深拷贝只能进行简单数据类型的拷贝，如果是复杂数据类型则拷贝的过程中会丢失数据。比如对象里含有正则表达式、函数、日期；递归可能会存在循环引用obj.obj = obj


// 优化
function deepCopyPlus(source, cache = new Map()) {
    if (cache.has(source)) {
        // 如果缓存中已经有值则直接返回，解决循环调用问题
        return cache.get(source);
    }
    // 当入参属于Object复杂数据类型就开始做子类检测，Function Array RegExp Date都属于Object类型
    if (source instanceof Object) {
        let target;
        if (source instanceof Array) {
            // 判断数组的情况
            target = [];
        } else if (source instanceof Function) {
            // 判断函数的情况
            target = function() {
                return source.apply(this, arguments);
            }
        } else if (source instanceof RegExp) {
            // 判断正则表达式的情况
            target = source;
        } else if (source instanceof Date) {
            target = new Date(source);
        } else {
            // 普通对象
            target = {}
        }

        // 将属性和拷贝后的值进行缓存
        cache.set(source, target);

        // 开始做遍历递归调用
        for(let key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = deepCopyPlus(source[key], cache);
            }
        }

        return target;
    } else {
        // 不是复杂数据类型就直接返回
        return source;
    }
}

console.log('--------------------------------------------------------------------')
// 测试深度拷贝
let testObj = {
    a: 1,
    b: undefined,
    c: null,
    d: Symbol(),
    e: new Date(),
    f: new RegExp('123', 'ig'),
    g: function() {
        console.log('函数')
    },
    h: [1, 2, 3, 4],
    i: { a: 33, b: 66 }
}

let testRes = deepCopyPlus(testObj);
console.log('testRes:', testRes)

testRes.g = function() {
    console.log('重写函数！')
}

console.log('g:', testObj.g());
console.log('r_g:', testRes.g())

