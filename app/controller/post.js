const { postService } = require("../service"); // 引入service

class PostController {
  async index(ctx) {
    const { limit, offset } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset) };
    const posts = await postService.findPosts(ctx, query);
    ctx.setResponse(posts);
  }

  async create(ctx) {
    const { name, age, email, tel, password, avatar_url, gender } = ctx.request.body;
    const newPost = await postService.createPost(ctx, { name, age, email, tel, password, avatar_url, gender });
    ctx.setResponse(newPost);
  }
}

module.exports = new PostController();
