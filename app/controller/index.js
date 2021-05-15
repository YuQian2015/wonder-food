const fs = require("fs");
const path = require("path");

let files = fs.readdirSync(path.resolve(__dirname)); //同步遍历目录

let controllerFiles = files.filter((f) => {
    return f.endsWith('.js');
}, files);

let controller = {};

console.log(`导入controller...`);
for (let f of controllerFiles) {
    let name = f.substring(0, f.length - 3); //user.js ==> name : user
    if (name === 'index') {
        continue;
    }

    controller[name] = require(path.resolve(__dirname, f));
}

module.exports = controller;
