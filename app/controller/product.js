function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}
class ProductController {
  async create(ctx) {
    const { name, description, store_id, images } = ctx.request.body;
    const newProduct = await ctx.service.product.createProduct(ctx, { name, description, store_id, images });
    ctx.setResponse(newProduct);
  }

  async index(ctx) {
    const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
    const result = await ctx.service.product.findProducts(ctx, query);
    ctx.setResponse(result);
  }

  async destroy(ctx) {
    const { id } = ctx.params;
    await ctx.service.product.deleteProduct(ctx, id);
    ctx.setResponse('删除成功！');
  }
}

module.exports = new ProductController();
