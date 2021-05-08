module.exports = options => {
    return async (ctx, next) => {
        try {
            let role = 'visitor';
            if (ctx.state && ctx.state.user && ctx.state.user.role) {
                role = ctx.state.user.role
            }
            const { originalUrl: path, method } = ctx;
            const result = await ctx.enforcer.enforce(role, path, method);
            if (!result) {
                ctx.status = 403;
                ctx.body = {
                    code: 403,
                    data: {},
                    success: false,
                    message: `没有权限，请联系管理员。`
                };
                return
            }
            await next()
        } catch (e) {
            throw e
        }
    }
};