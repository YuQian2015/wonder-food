module.exports = () => {
    return async (ctx, next) => {
        try {
            await next();
        } catch (err) {
            console.log(err);
            if (err.name == 'UnauthorizedError') {
                ctx.status = 401;
            }
            throw err
        }
    }
}
