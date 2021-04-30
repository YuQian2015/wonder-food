function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class CommentController {
  async create(ctx) {
    const { post_id, comment_id, content, type, images, store_id } = ctx.request.body;
    const newComment = await ctx.service.comment.createComment(ctx, { post_id, comment_id, content, type, images, store_id });
    ctx.setResponse(newComment);
  }

  async findComments(ctx) {
    const { post_id } = ctx.request.query;
    const comments = await ctx.service.comment.findComment(ctx, { post_id });
    ctx.setResponse(comments);
  }
}

module.exports = new CommentController();
