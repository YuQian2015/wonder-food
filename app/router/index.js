// app/router/index.js

const Router = require('koa-router');
const config = require('config'); // 引入config
const apiPrefix = config.get('Router.apiPrefix');
const router = new Router();
router.prefix(apiPrefix); // 设置路由前缀
const user = require('./user');
const public = require('./public');
const post = require('./post');

const index = async (ctx, next) => {
    console.log(ctx.app);
    ctx.body = 'Hello World!'
};

router.get('/', index);
router.use('/users', user.routes(), user.allowedMethods()); // 设置user的路由
router.use('/posts', post.routes(), post.allowedMethods()); // 帖子
router.use('/public', public.routes(), public.allowedMethods()); // 设置公共路由

module.exports = router;