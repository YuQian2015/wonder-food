// 扫描所有的model模型
const fs = require("fs");
const path = require("path");

let files = fs.readdirSync(path.resolve(__dirname, '../model')); //同步遍历目录

let modelFiles = files.filter((f) => {
    return f.endsWith('.js');
}, files);

let model = {};

for (let f of modelFiles) {
    console.log(`从${f}导入model...`);
    let name = f.substring(0, f.length - 3); //user.js ==> name : user
    model[name] = require(path.resolve(__dirname, '../model', f));
}

module.exports = () => {
    return async (ctx, next) => {
        ctx['model'] = model;
        await next();
    };
}
