const router = require('koa-router')();
const { post } = require('../controller');

router.post('/', post.create);
router.get('/', post.index);

module.exports = router;