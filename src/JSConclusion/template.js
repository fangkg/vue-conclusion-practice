/*
 * @Author: fangkg
 * @Date: 2020-11-25 09:05:37
 * @LastEditTime: 2020-11-25 09:11:48
 * @LastEditors: Please set LastEditors
 * @Description: 模板引擎实现
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\JSConclusion\template.js
 */

function render(template, data) {
    // 模板字符串正则
    const reg = /\{\{(\w+)\}\}/;
    // 判断模板里是否有模板字符串
    if (reg.test(template)) {
        // 查找当前模板里第一个模板字符串的字段
        const name = reg.exec(template)[1];
        // 将第一个模板字符串渲染
        template = template.replace(reg, data[name]);
        // 递归的渲染并返回渲染后的结构
        return render(template, data);
    }
    // 如果模板没有模板字符串直接返回
    return template;
}

let template = '我是{{name}}，年龄{{age}}，性别{{sex}}';
let data = {
    name: '姓名',
    age: 18
}
console.log('render:', render(template, data));
