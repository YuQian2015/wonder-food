const router = require('koa-router')();
const { policy } = require('../controller');

router.post('/', policy.create);
router.get('/', policy.index); // get请求
router.del('/:id', policy.destroy); // 删除

module.exports = router;