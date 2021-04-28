class PostService {
    async findPosts(ctx, query = {}) {
        return ctx.model.post.findAll(query);
    }

    async createPost(ctx, data) {
        const { content } = data;
        const { id } = ctx.state.user;
        if (!content) {
            ctx.status = 400;
            throw new Error('请输入内容！');
        }
        data.created_by = id;
        return ctx.model.post.create(data);
    }

}

module.exports = new PostService();