const router = require('koa-router')();
const { public } = require('../controller'); // 引入 user controller

router.post('/login', public.login);

module.exports = router;