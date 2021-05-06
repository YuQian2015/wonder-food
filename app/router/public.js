const router = require('koa-router')();
const { public } = require('../controller');

router.post('/login', public.login);
router.post('/register', public.register);
router.get('/posts', public.getPosts);
router.get('/system', public.system);
router.post('/system/init', public.initSystem);

module.exports = router;