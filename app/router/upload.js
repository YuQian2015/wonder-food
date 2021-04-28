const router = require('koa-router')();
const { upload } = require('../controller');
const koaBody = require('koa-body');

router.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
    }
}));
router.post('/image', upload.uploadImage);

module.exports = router;