// 数组扁平化方法
// 1、使用ES6中的Array.prototype.flat方法
let arr = new Array();
arr.flat(Infinity);

// 2、使用reduce的方式
function arrFlat(arr) {
    return arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? arrFlat(cur) : cur)
    }, [])
}

arrFlat(arr);

// 3、使用递归加循环的方式
function arrFlatRec(arr) {
    let result = [];
    arr.map(item => {
        if (Array.isArray(item)) {
            result = result.concat(arrFlatRec(item));
        } else {
            result.push(item);
        }
    })

    return result;
}

arrFlatRec(arr);

// 4、将数组先变成字符串再复原toString()，这种方法存在缺陷，就是数组中元素都是Number或者String类型的才能展开
function arrFlatNumStr(arr) {
    return arr.toString().split(',').map(item => +item)
}

arrFlatNumStr(arr);