// app/service/user.js

function toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
}

class UserService {

    async findUsers(ctx, query = {}) {
        return ctx.model.User.findAll(query);
    }

    async findUser(ctx, id) {
        return ctx.model.User.findByPk(toInt(id));
    }

    async loginUser(ctx, data) {
        const { email, password } = data
        return ctx.model.User.findOne({
            where: {
                email, password
            }
        });
    }

    async createUser(ctx, data) {
        const { name, email, password } = data;
        if (!name || !password || !email) {
            ctx.status = 400;
            throw new Error('缺少必填信息！');
        }
        return ctx.model.User.create(data);
    }


    async updateUser(ctx, id, data) {
        const user = await ctx.model.User.findByPk(toInt(id));
        if (!user) {
            ctx.status = 404;
            return;
        }
        await user.update(data);
        return user;
    }

    async deleteUser(ctx, id) {
        const user = await ctx.model.User.findByPk(toInt(id));
        if (!user) {
            ctx.status = 404;
            return;
        }
        await user.destroy();
        ctx.status = 200;
    }

}

module.exports = new UserService();