function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class CommentController {
  async create(ctx) {
    const { post_id, comment_id, content, type, images, store_id, product_id } = ctx.request.body;
    const newComment = await ctx.service.comment.createComment(ctx, { post_id, comment_id, content, type, images, store_id, product_id });
    ctx.setResponse(newComment);
  }

  async findComments(ctx) {
    let { post_id } = ctx.request.query;
    post_id = toInt(post_id)
    const comments = await ctx.service.comment.findComments(ctx, { post_id });
    ctx.setResponse(comments);
  }
}

module.exports = new CommentController();
