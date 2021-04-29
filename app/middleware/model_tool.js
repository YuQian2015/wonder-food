// 扫描所有的model模型
const fs = require("fs");
const path = require("path");
const model = require("../model");

module.exports = () => {
    return async (ctx, next) => {
        ctx['model'] = model;
        await next();
    };
}
