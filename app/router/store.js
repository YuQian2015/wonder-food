const router = require('koa-router')();
const { store } = require('../controller');

router.post('/', store.create);
router.get('/', store.index); // get请求
router.del('/:id', store.destroy); // 删除

module.exports = router;