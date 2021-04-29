// app/controller/user.js

const jwt = require('jsonwebtoken');
const config = require('config');
const jwtSecret = config.get('Token.jwtSecret');
const { userService, postService } = require("../service"); // 引入service

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class PublicController {

  async login(ctx) {
    const { email, password } = ctx.request.body;
    const user = await userService.loginUser(ctx, { email, password });
    if (user) {
      let userToken = {
        id: user.id
      }
      const token = jwt.sign(userToken, jwtSecret, { expiresIn: '3h' }) // token签名 有效期为3小时
      ctx.setResponse({ token });
    } else {
      ctx.status = 404;
      throw new Error('没有找到登录的账号！');
    }
  }

  async register(ctx) {
    const { name, email, password } = ctx.request.body;
    const user = await userService.createUser(ctx, { name, email, password });
    let userToken = {
      id: user.id
    }
    const token = jwt.sign(userToken, jwtSecret, { expiresIn: '3h' }) // token签名 有效期为3小时
    ctx.setResponse({ token });
  }

  async getPosts(ctx) {
    const { limit, offset } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset) };
    const posts = await postService.findPosts(ctx, query);
    ctx.setResponse(posts);
  }
}

module.exports = new PublicController();
