// 开启ESLint 
// 自动修复 简单的代码风格 eslint 可以直接修复，比如我们希望 eslint 修复 src 文件夹下的 js 文件，那么在 package.json 中添加一条自定义命令
// 安装eslint模块
// `$ npm install eslint --save-dev`
//  复制代码# 添加eslint修复命令
// "lint-fix": "eslint --fix --ext .js src/"
// 执行npm run lint-fix 将自动修复。无法修复的将在控制台给出提示