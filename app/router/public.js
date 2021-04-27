const router = require('koa-router')();
const { public } = require('../controller'); // 引入 user controller

router.post('/login', public.login);
router.post('/register', public.register);

module.exports = router;