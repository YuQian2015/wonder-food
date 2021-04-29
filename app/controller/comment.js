function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class CommentController {
  async create(ctx) {
    const { post_id, comment_id, content, type, images } = ctx.request.body;
    const newComment = await ctx.service.comment.createComment(ctx, { post_id, comment_id, content, type, images });
    ctx.setResponse(newComment);
  }
}

module.exports = new CommentController();
