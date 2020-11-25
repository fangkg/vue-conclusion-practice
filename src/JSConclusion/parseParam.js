/*
 * @Author: fangkg
 * @Date: 2020-11-25 08:54:33
 * @LastEditTime: 2020-11-25 09:04:06
 * @LastEditors: Please set LastEditors
 * @Description: 解析URL Params为对象
 * @FilePath: \vue-component-practiced:\KKB\Vue\vue总结\vue-conclusion\vue-conclusion-practice\src\JSConclusion\parseParam.js
 */

function parseParam(url) {
    // 将?后面的字符串取出来
    const paramStr = /.+\?(.+)$/.exec(url)[1];
    // 将字符串以&分割后存到数组中
    const paramArr = paramStr.split('&');
    let paramObj = {};
    // 将params存到对象中
    paramArr.forEach(param => {
        // 处理有value的参数
        if (/=/.test(param)) {
            // 分割key和value
            let [key, val] = param.split('=');
            // 解码
            val = decodeURIComponent(val);
            // 判断是否是数字
            val = /^d+$/.test(val) ? parseFloat(val) : val;

            // 如果对象有key，则添加一个值
            if (paramObj.hasOwnProperty(key)) {
                paramObj[key] = [].concat(paramObj[key], val);
            } else {
                // 如果对象没有这个key，创建key并设置值
                paramObj[key] = val;
            }
        } else {
            // 处理没有value的参数
            paramObj[paramObj] = true;
        }
    })

    return paramObj;
}

let url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&enabled';
console.log('ret:', parseParam(url));
