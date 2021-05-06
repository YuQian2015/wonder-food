const router = require('koa-router')();
const { role } = require('../controller');

router.post('/', role.create);
router.get('/', role.index); // get请求
router.del('/:id', role.destroy); // 删除

module.exports = router;