class CommentService {
    async createComment(ctx, data) {
        const { content } = data;
        const { id } = ctx.state.user;
        if (!content) {
            ctx.status = 400;
            throw new Error('请输入内容！');
        }
        data.created_by = id;
        ctx.model.Post.increment('comment_count', { by: 1, where: { id: data.post_id } });
        return ctx.model.Comment.create(data);
    }

    async findComments(ctx, data) {
        console.log(data);
        return ctx.model.Comment.findAll({
            ...data,
            where: { post_id: data.post_id },
            order: [['created_at', 'DESC']],
            include: [{
                model: ctx.model.User,
                attributes: ['name', 'avatar_url', 'id', 'role']
            }, {
                model: ctx.model.Store
            }, {
                model: ctx.model.Product
            }]
        });
    }
}

module.exports = new CommentService();