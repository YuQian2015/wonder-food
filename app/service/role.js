const { Op } = require("sequelize");
function toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
}

class RoleService {

    async findRoles(ctx, query = {}) {
        return ctx.model.Role.findAll({
            ...query,
            order: [
                ['created_at', 'DESC']
            ]
        });
    }

    async findRole(ctx, data) {
        return ctx.model.Role.findOne({
            where: {
                ...data
            }
        });
    }

    async createRole(ctx, data) {
        const { name, key } = data;
        if (!name || !key) {
            ctx.status = 400;
            throw new Error('请输入内容！');
        }
        console.log(data);
        const role = await ctx.model.Role.findOne({
            where: {
                [Op.or]: [{ name: data.name }, { key: data.key }],
            }
        });
        if (role) {
            throw new Error('已经存在的角色！');
        }
        return ctx.model.Role.create(data);
    }

    async deleteRole(ctx, id) {
        const role = await ctx.model.Role.findByPk(toInt(id));
        if (!role) {
            ctx.status = 404;
            return;
        }
        if (role.system) {
            throw new Error('不能删除系统角色！');
        }
        await role.destroy();
        ctx.status = 200;
    }

}

module.exports = new RoleService();