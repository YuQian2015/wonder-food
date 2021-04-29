function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class PostController {

  async view(ctx) {
    const { id } = ctx.params;
    const post = await ctx.service.post.findPost(ctx, { id: id });
    ctx.setResponse(post);
  }

  async index(ctx) {
    const { limit, offset } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset) };
    const posts = await ctx.service.post.findPosts(ctx, query);
    ctx.setResponse(posts);
  }

  async create(ctx) {
    const { title, content, type, images } = ctx.request.body;
    const newPost = await ctx.service.post.createPost(ctx, { title, content, type, images });
    ctx.setResponse(newPost);
  }
}

module.exports = new PostController();
