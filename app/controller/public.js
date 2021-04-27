// app/controller/user.js

const jwt = require('jsonwebtoken');
const config = require('config');
const jwtSecret = config.get('Token.jwtSecret');
const { userService } = require("../service"); // 引入service

class PublicController {

  async login(ctx) {
    const { email, password } = ctx.request.body;
    const user = await userService.loginUser(ctx, { email, password });
    let userToken = {
      id: user.id
    }
    const token = jwt.sign(userToken, jwtSecret, { expiresIn: '3h' }) // token签名 有效期为3小时
    ctx.setResponse({ token });
  }
}

module.exports = new PublicController();
