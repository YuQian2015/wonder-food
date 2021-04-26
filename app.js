// app.js

require('dotenv-safe').config(); // 只需要引入一次
/* 扫描所有的model模型 */
const fs = require("fs");
const path = require("path");
const Koa = require('koa');
const config = require('config'); // 引入config
const appConfig = config.get('App'); // 直接使用 config 获取App的配置
const apiPrefix = config.get('Router.apiPrefix'); // 可以通过Router.apiPrefix获取具体的值
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors'); // 引入 koa-cors 中间件

let files = fs.readdirSync(path.resolve(__dirname, 'app', 'model')); //同步遍历目录

let js_files = files.filter((f) => {
    return f.endsWith('.js');
}, files);

let model = {};

for (let f of js_files) {
    console.log(`import model from file ${f}...`);

    let name = f.substring(0, f.length - 3); //User.js ==> name : User
    model[name] = require(path.resolve(__dirname, 'app', 'model', f));
}

// 引入路由文件
const router = require('./app/router');

// 引入logger
const logger = require('./app/middleware/logger');
const responseHandler = require('./app/middleware/response_handler');

const app = new Koa(); // 创建koa 应用

app.use(async (ctx, next) => {
    ctx['model'] = model;
    await next();
});
app.use(logger()); // 处理log的中间件
app.use(cors()); // 启用cors， 支持传递配置
app.use(bodyParser()); // 使用bodyParser中间件，可以从post请求获取请求体
app.use(responseHandler()); // 处理响应的中间件

// 使用koa-router中间件
app.use(router.routes()).use(router.allowedMethods());

app.listen(appConfig.port, appConfig.ip, () => {
    console.log(`服务已经启动，访问：http://localhost:${appConfig.port}${apiPrefix}`);
});
