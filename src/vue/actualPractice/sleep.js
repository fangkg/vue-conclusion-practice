/*
 * @Author: fangkg
 * @Date: 2020-12-01 14:49:12
 * @LastEditTime: 2020-12-01 14:51:43
 * @LastEditors: Please set LastEditors
 * @Description: 箭头函数实现sleep()
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\vue\actualPractice\sleep.js
 */
async function sleep(delay) {
    return new Promise((resolve) => setTimeout(resolve, delay));
}
async function foo() {
    const t0 = Date.now();
    // 暂停1500毫秒
    await sleep(1500);
    console.log(Date.now() - t0);
}
foo();