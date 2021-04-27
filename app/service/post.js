class PostService {
    async findPosts(ctx, query = {}) {
        return ctx.model.post.findAll(query);
    }

    async createPost(ctx, data) {
        const { name, email, password } = data;
        if (!name || !password || !email) {
            ctx.status = 400;
            throw new Error('缺少必填信息！');
        }
        return ctx.model.post.create(data);
    }

}

module.exports = new PostService();