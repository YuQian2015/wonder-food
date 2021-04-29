const { postService } = require("../service"); // 引入service

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class PostController {

  async view(ctx) {
    const { id } = ctx.params;
    const post = await postService.findPost(ctx, { id: id });
    ctx.setResponse(post);
  }

  async index(ctx) {
    const { limit, offset } = ctx.query;
    const query = { limit: toInt(limit), offset: toInt(offset) };
    const posts = await postService.findPosts(ctx, query);
    ctx.setResponse(posts);
  }

  async create(ctx) {
    const { created_by, title, content, type, images } = ctx.request.body;
    const newPost = await postService.createPost(ctx, { created_by, title, content, type, images });
    ctx.setResponse(newPost);
  }
}

module.exports = new PostController();
