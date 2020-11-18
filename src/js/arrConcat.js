let arr = [1, 3, 66, 78, 23];
let newArr = arr.concat();
console.log('newArr:', newArr);

let list = [1, 5, [5, 8], 44, [22, [33, 77, [88]]]];
console.log('flat:', list.flat(Infinity))

function flatFn(arr) {
    return arr.reduce((prev, cur) => {
        return prev.concat(Array.isArray(cur) ? flatFn(cur) : cur)
    }, [])
}

console.log('flatFn:', flatFn(list));