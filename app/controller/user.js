// app/controller/user.js

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class UserController {

  async index(ctx) {
    console.log(ctx.state.user);
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    const result = await ctx.service.user.findUsers(ctx, query);
    ctx.setResponse(result);
  }

  async show(ctx) {
    ctx.body = await ctx.service.user.findUser(ctx, ctx.params.id);
  }

  async create(ctx) {
    const { name, age, email, tel, password, avatar_url, gender } = ctx.request.body;
    const newUser = await ctx.service.user.createUser(ctx, { name, age, email, tel, password, avatar_url, gender });
    ctx.setResponse(newUser);
  }

  async update(ctx) {
    const { name, age, email, tel, password, avatar_url, gender } = ctx.request.body;
    const user = await ctx.service.user.updateUser(ctx, ctx.params.id, { name, age, email, tel, password, avatar_url, gender });
    ctx.setResponse(user);
  }

  async destroy(ctx) {
    await ctx.service.user.updateUser(ctx, ctx.params.id);
  }
}

module.exports = new UserController();
