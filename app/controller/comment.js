const { commentService } = require("../service"); // 引入service

function toInt(str) {
  if (typeof str === 'number') return str;
  if (!str) return str;
  return parseInt(str, 10) || 0;
}

class CommentController {
  async create(ctx) {
    const { created_by, title, content, type, images } = ctx.request.body;
    const newComment = await commentService.createComment(ctx, { created_by, title, content, type, images });
    ctx.setResponse(newComment);
  }
}

module.exports = new CommentController();
