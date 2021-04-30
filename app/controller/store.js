function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class StoreController {
  async create(ctx) {
    const { name, description, address, tel, images } = ctx.request.body;
    const newStore = await ctx.service.store.createStore(ctx, { name, description, address, tel, images });
    ctx.setResponse(newStore);
  }

  async index(ctx) {
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    const result = await ctx.service.store.findStores(ctx, query);
    ctx.setResponse(result);
  }

  async destroy(ctx) {
    const { id } = ctx.params;
    await ctx.service.store.deleteStore(ctx, id);
    ctx.setResponse('删除成功！');
  }
}

module.exports = new StoreController();
