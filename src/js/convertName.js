// 实现一个函数将下划线命名转化成驼峰命名法
function formatHump(str) {
    if (typeof str !== "string") {
        return false;
    }
    // 将str分割成数组
    str = str.split("_");
    if (str.length > 1) {
        // 从1开始for循环遍历，因为数组第一个字符串的首字母不需要转大写
        // 将数组里的每一个字符串第一个字母变成大写
        for(let i = 1; i < str.length; i++) {
            str[i] = str[i][0].toUpperCase() + str[i].substr(1);
        }
        // 将数组拼接回字符串
        return str.join("")
    }
}
console.log('res:', formatHump("ee_jdjs_eiei"))