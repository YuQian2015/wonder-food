const router = require('koa-router')();
const { user } = require('../controller'); // 引入 user controller

router.post('/', user.create); // post请求，指定到创建用户
router.get('/', user.index); // get请求
router.get('/info', user.info); // get请求

module.exports = router;