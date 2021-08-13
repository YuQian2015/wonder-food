const router = require('koa-router')();
const { setting } = require('../controller');

router.post('/', setting.create);
router.get('/', setting.index);

module.exports = router;