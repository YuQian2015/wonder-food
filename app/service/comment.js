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
}

module.exports = new CommentService();