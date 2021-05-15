// app/controller/user.js

const jwt = require('jsonwebtoken');
const config = require('config');
const jwtSecret = config.get('Token.jwtSecret');

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class PublicController {

  async login(ctx) {
    const { email, password } = ctx.request.body;
    const user = await ctx.service.user.loginUser(ctx, { email, password });
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
    const user = await ctx.service.user.createUser(ctx, { name, email, password });
    let userToken = {
      id: user.id
    }
    const token = jwt.sign(userToken, jwtSecret, { expiresIn: '3h' }) // token签名 有效期为3小时
    ctx.setResponse({ token });
  }

  async getPosts(ctx) {
    const { limit, offset } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset) };
    const posts = await ctx.service.post.findPosts(ctx, query);
    ctx.setResponse(posts);
  }

  async system(ctx) {
    const root = await ctx.service.role.findRole(ctx, { key: 'root' });
    if (root) {
      ctx.setResponse('初始化~');
    } else {
      throw new Error('系统未初始化~');
    }
  }
  async initSystem(ctx) {
    console.log(3);
    const newRole = await ctx.service.role.createRole(ctx, { name: '超级管理员', key: 'root' });
    await ctx.service.role.createRole(ctx, { name: '管理员', key: 'admin' });
    await ctx.service.role.createRole(ctx, { name: '用户', key: 'user' });
    await ctx.enforcer.addPolicy('admin', '/api/**', '(GET)|(POST)|(PUT)|(DELETE)');
    console.log(12313);
    if (newRole) {
      const { name, age, email, tel, password, avatar_url, gender } = ctx.request.body;
      const newUser = await ctx.service.user.createUser(ctx, { name, age, email, tel, password, avatar_url, gender, role_id: newRole.id });
      if (newUser) {
        let userToken = {
          id: newUser.id,
          role: 'root'
        }
        const token = jwt.sign(userToken, jwtSecret, { expiresIn: '3h' }) // token签名 有效期为3小时
        ctx.setResponse({ token });
      } else {
        throw new Error('初始化失败~');
      }
    } else {
      throw new Error('初始化失败~');
    }
  }
}

module.exports = new PublicController();
