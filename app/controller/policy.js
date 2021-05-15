function toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
  }
  
  class PolicyController {
    async create(ctx) {
      const { name, api, methods } = ctx.request.body;
      const newPolicy = await ctx.service.policy.createPolicy(ctx, { name, api, methods });
      ctx.setResponse(newPolicy);
    }
  
    async index(ctx) {
      const query = { limit: toInt(ctx.query.limit), offset: toInt(ctx.query.offset) };
      const result = await ctx.service.policy.findPolicies(ctx, query);
      ctx.setResponse(result);
    }
  
    async destroy(ctx) {
      const { id } = ctx.params;
      await ctx.service.policy.deletePolicy(ctx, id);
      ctx.setResponse('删除成功！');
    }
  }
  
  module.exports = new PolicyController();
  