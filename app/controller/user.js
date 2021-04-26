// app/controller/user.js

const { user } = require("../service"); // 引入service

class UserController {

  async index(ctx) {
    try {
      const result = await ctx.model.user.create({
        name: '123'
      });
      ctx.setResponse(result);
    } catch (err) {
      ctx.status = 400;
      throw new Error(err);
    }
  }

  async create(ctx) {
    try {
      const { email, password, name, sex } = ctx.request.body;
      const result = await ctx.model.user.create({
        email, password, name, sex
      });
      ctx.setResponse(newUser);
    } catch (err) {
      ctx.status = 400;
      throw new Error(err);
    }
  }
}

module.exports = new UserController();
