const fs = require("fs");
const path = require("path");

let files = fs.readdirSync(path.resolve(__dirname)); //同步遍历目录

let serviceFiles = files.filter((f) => {
    return f.endsWith('.js');
}, files);

let service = {};

console.log(`导入service...`);
for (let f of serviceFiles) {
    let name = f.substring(0, f.length - 3); //user.js ==> name : user
    if (name === 'index') {
        continue;
    }
    service[name] = require(path.resolve(__dirname, f));
}

module.exports = (ctx) => {
    // for (s in service) {
    //     service[s].ctx = ctx;
    // }
    return service;
};
