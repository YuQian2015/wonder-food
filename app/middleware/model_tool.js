const model = require("../model");
const controller = require("../controller");
const service = require("../service");

module.exports = () => {
    return async (ctx, next) => {
        ctx['controller'] = controller;
        ctx['model'] = model;
        ctx['service'] = service(ctx);
        await next();
    };
}
