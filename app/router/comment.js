const router = require('koa-router')();
const { comment } = require('../controller');

router.post('/', comment.create);

module.exports = router;