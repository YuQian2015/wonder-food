module.exports = () => {
    return async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            if (err.name == 'UnauthorizedError') {
                ctx.status = 401;
            }
        }
    }
}
