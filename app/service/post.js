class PostService {
    async findPost(ctx, query = {}) {
        console.log(query.id);
        return ctx.model.Post.findOne({
            ...query,
            order: [ [ ctx.model.Comment, 'created_at', 'DESC'] ],
            include: [{
                model: ctx.model.User,
                attributes: ['name', 'avatar_url', 'id', 'role']
            }, {
                model: ctx.model.Comment,
                // required: true,
                as: 'comments',
                // through: {
                //     attributes: ['createdAt', 'startedAt', 'finishedAt'],
                //     where: { completed: true }
                // },
                where: { post_id: query.id },
                include: [{
                    model: ctx.model.User,
                    attributes: ['name', 'avatar_url', 'id', 'role']
                }]
            }]
        });
    }

    async findPosts(ctx, query = {}) {
        return ctx.model.Post.findAll({
            ...query,
            order: [
                ['created_at', 'DESC']
            ],
            include: [{
                model: ctx.model.User,
                attributes: ['name', 'avatar_url', 'id', 'role']
            }]
        });
    }

    async createPost(ctx, data) {
        const { content } = data;
        const { id } = ctx.state.user;
        if (!content) {
            ctx.status = 400;
            throw new Error('请输入内容！');
        }
        data.created_by = id;
        return ctx.model.Post.create(data);
    }

}

module.exports = new PostService();