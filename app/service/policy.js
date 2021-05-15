
function toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
}

class PolicyService {

    async findPolicies(ctx, query = {}) {
        return ctx.model.Policy.findAll({
            ...query,
            order: [
                ['created_at', 'DESC']
            ]
        });
    }

    async createPolicy(ctx, data) {
        const { name } = data;
        if (!name) {
            ctx.status = 400;
            throw new Error('请输入内容！');
        }
        return ctx.model.Policy.create(data);
    }

    async deletePolicy(ctx, id) {
        const p = await ctx.model.Policy.findByPk(toInt(id));
        if (!p) {
            ctx.status = 404;
            return;
        }
        await p.destroy();
        ctx.status = 200;
    }

}

module.exports = new PolicyService();