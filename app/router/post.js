const router = require('koa-router')();
const { post } = require('../controller');

router.get('/', post.index);
router.post('/', post.create);

module.exports = router;