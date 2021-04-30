// app/router/index.js

const Router = require('koa-router');
const config = require('config'); // 引入config
const apiPrefix = config.get('Router.apiPrefix');
const router = new Router();
router.prefix(apiPrefix); // 设置路由前缀
const user = require('./user');
const public = require('./public');
const post = require('./post');
const upload = require('./upload');
const comment = require('./comment');
const store = require('./store');
const product = require('./product');

const index = async (ctx, next) => {
    console.log(ctx.app);
    ctx.body = 'Hello World!'
};

router.get('/', index);
router.use('/users', user.routes(), user.allowedMethods()); // 用户路由
router.use('/posts', post.routes(), post.allowedMethods()); // 帖子路由
router.use('/public', public.routes(), public.allowedMethods()); // 设置公共路由
router.use('/upload', upload.routes(), upload.allowedMethods()); // 上传路由
router.use('/comments', comment.routes(), comment.allowedMethods()); // 评论路由
router.use('/stores', store.routes(), store.allowedMethods()); // 商家路由
router.use('/products', product.routes(), product.allowedMethods()); // 商品路由

module.exports = router;