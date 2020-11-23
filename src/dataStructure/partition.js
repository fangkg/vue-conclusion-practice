/*
 * @Author: fangkg
 * @Date: 2020-11-23 11:05:59
 * @LastEditTime: 2020-11-23 11:19:16
 * @LastEditors: Please set LastEditors
 * @Description: 快排
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\dataStructure\partition.js
 */

 // 划分操作函数
function fn(array, left, right) {
    // 用index取中间值而非splice
    const pivot = array[Math.floor(right + left) / 2];
    let i = left;
    let j = right;

    while(i <= j) {
        while(compare(array[i], pivot === -1)) {
            i++;
        }
        while(compare(array[j], pivot) === -1) {
            j--;
        }
        if (i <= j) {
            swap(array, i, j);
            i++;
            j--;
        }
    }
    return i
}

// 比较函数
function compare(a, b) {
    if (a === b) {
        return 0;
    }
    return a < b ? -1 : 1;
}

// 原地交换函数，而非用临时数组
function swap(array, a, b) {
    [array[a], array[b]] = [array[b], array[a]];
}

const arr = [34, 66, 89, 122, 4578, 654];
console.log('arr:', arr)
console.log('arr_reverse:', swap(arr, 2, 5))
console.log('arr:', arr)

function quick(array, left, right) {
    let index;
    if (array.length > 1) {
        index = fn(array, left, right);
        if (left < index -1) {
            quick(array, left, index - 1);
        }
        if (index < right) {
            quick(array, index, right);
        }
    }
    return array;
}

function quickSort(array) {
    return quick(array, 0, array.length - 1);
}