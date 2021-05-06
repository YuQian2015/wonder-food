function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class RoleController {

  async index(ctx) {
    const { limit, offset } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset) };
    const roles = await ctx.service.role.findRoles(ctx, query);
    ctx.setResponse(roles);
  }

  async create(ctx) {
    const { name, key } = ctx.request.body;
    const newRole = await ctx.service.role.createRole(ctx, { name, key });
    ctx.setResponse(newRole);
  }

  async destroy(ctx) {
    const { id } = ctx.params;
    await ctx.service.role.deleteRole(ctx, id);
    ctx.setResponse('删除成功！');
  }

}

module.exports = new RoleController();
