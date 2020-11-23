/*
 * @Author: fangkg
 * @Date: 2020-11-23 11:25:25
 * @LastEditTime: 2020-11-23 11:30:06
 * @LastEditors: Please set LastEditors
 * @Description: 二分查找
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\dataStructure\twoPiece.js
 */

function find(target, array) {
    let i = 0;
    let j = array[i].length - 1;
    while(i < array.length && j >= 0) {
        if (array[i][j] < target) {
            i++;
        } else if (array[i][j] > target) {
            j--;
        } else {
            console.log('i:', i, j)
            return true;
        }
    }
    return false;
}

console.log(find(10, [[1, 2, 3, 4], [5, 9, 10, 11], [13, 20, 21, 23]]))