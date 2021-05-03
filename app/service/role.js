
function toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
}

class RoleService {

    async findStores(ctx, query = {}) {
        return ctx.model.Store.findAll({
            ...query,
            order: [
                ['created_at', 'DESC']
            ]
        });
    }

    async createStore(ctx, data) {
        const { name } = data;
        if (!name) {
            ctx.status = 400;
            throw new Error('请输入内容！');
        }
        return ctx.model.Store.create(data);
    }

    async deleteStore(ctx, id) {
        const store = await ctx.model.Store.findByPk(toInt(id));
        if (!store) {
            ctx.status = 404;
            return;
        }
        await store.destroy();
        ctx.status = 200;
    }

}

module.exports = new RoleService();