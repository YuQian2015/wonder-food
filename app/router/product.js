const router = require('koa-router')();
const { product } = require('../controller');

router.post('/', product.create);
router.get('/', product.index); // get请求
router.del('/:id', product.destroy); // 删除

module.exports = router;