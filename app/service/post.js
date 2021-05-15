class PostService {
    async findPost(ctx, id) {
        await ctx.model.Post.increment('view_count', { by: 1, where: { id } });

        return ctx.model.Post.findByPk(id, {
            // attributes: ['name', 'age', 'id', 'email', 'avatar_url', 'gender', 'role', 'user_status']
            include: [{
                model: ctx.model.User,
                attributes: ['name', 'avatar_url', 'id', 'role_id']
            }],
        });
        // return ctx.model.Post.findOne({
        //     ...query,
        //     // order: [ [ ctx.model.Comment, 'created_at', 'DESC'] ],
        //     // include: [{
        //     //     model: ctx.model.User,
        //     //     attributes: ['name', 'avatar_url', 'id', 'role']
        //     // }, {
        //     //     model: ctx.model.Comment,
        //     //     required: false, // 可能存在没有评论的情况，因此为false
        //     //     as: 'comments',
        //     //     // through: {
        //     //     //     attributes: ['createdAt', 'startedAt', 'finishedAt'],
        //     //     //     where: { completed: true }
        //     //     // },
        //     //     where: { post_id: query.id },
        //     //     include: [{
        //     //         model: ctx.model.User,
        //     //         attributes: ['name', 'avatar_url', 'id', 'role']
        //     //     }]
        //     // }]
        // });
    }

    async findPosts(ctx, query = {}) {
        return ctx.model.Post.findAll({
            ...query,
            order: [
                ['created_at', 'DESC']
            ],
            include: [{
                model: ctx.model.User,
                attributes: ['name', 'avatar_url', 'id', 'role_id']
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