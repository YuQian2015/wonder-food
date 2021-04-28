const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

class UploadController {
  async uploadImage(ctx) {
    // 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.resolve(__dirname, '../../upload/');
    console.log(filePath);
    if (!fs.existsSync(filePath)) {
      await mkdirp(filePath);
    }
    // 创建可写流
    const upStream = fs.createWriteStream(path.resolve(filePath, file.name));
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    ctx.setResponse({});
  }
}

module.exports = new UploadController();
