const router = require('koa-router')();
const { comment } = require('../controller');

router.post('/', comment.create);
router.get('/', comment.findComments);

module.exports = router;