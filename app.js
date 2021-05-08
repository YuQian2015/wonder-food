// app.js

require('dotenv-safe').config(); // 只需要引入一次
const Koa = require('koa');
const path = require('path');
const config = require('config'); // 引入config
const appConfig = config.get('App'); // 直接使用 config 获取App的配置
const apiPrefix = config.get('Router.apiPrefix'); // 可以通过Router.apiPrefix获取具体的值
const jwtSecret = config.get('Token.jwtSecret');
const bodyParser = require('koa-bodyparser');
const cors = require('koa-cors'); // 引入 koa-cors 中间件
const jwt = require('koa-jwt');
const serve = require('koa-static');

// 引入路由文件
const router = require('./app/router');

// 引入logger
const logger = require('./app/middleware/logger');
const responseHandler = require('./app/middleware/response_handler');
const jwtHandler = require('./app/middleware/jwt_handler');
const modelTool = require('./app/middleware/model_tool');
const casbin = require('./app/middleware/casbin');
const authz = require('./app/middleware/authz');

const app = new Koa(); // 创建koa 应用

app.use(serve(path.resolve(__dirname, 'upload'))); // 本地静态资源服务器
app.use(logger()); // 处理log的中间件
app.use(cors()); // 启用cors， 支持传递配置
app.use(bodyParser()); // 使用bodyParser中间件，可以从post请求获取请求体
app.use(responseHandler()); // 处理响应的中间件
app.use(modelTool()); // 挂载model
app.use(jwtHandler());
app.use(jwt({ secret: jwtSecret }).unless({ path: [/^\/api\/public/] })); // 除了 /api/public 开头的请求都需要验证token

// 挂载casbin
casbin().then(enforcer => {
    app.use(async (ctx, next) => {
        try {
            ctx.enforcer = enforcer;
            await next();
        } catch (err) {
            console.log(err);
            throw err
        }
    });
    // app.use(authz());


    // 使用koa-router中间件
    app.use(router.routes()).use(router.allowedMethods());

    app.listen(appConfig.port, appConfig.ip, () => {
        console.log(`服务已经启动，访问：http://${appConfig.ip}:${appConfig.port}${apiPrefix}`);
    });
});

