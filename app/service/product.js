
function toInt(str) {
    if (typeof str === 'number') return str;
    if (!str) return str;
    return parseInt(str, 10) || 0;
}

class ProductService {

    async findProducts(ctx, query = {}) {
        return ctx.model.Product.findAll({
            ...query,
            order: [
                ['created_at', 'DESC']
            ],
            include: [{
                model: ctx.model.Store,
                attributes: ['name', 'id']
            }]
        });
    }

    async createProduct(ctx, data) {
        const { name } = data;
        if (!name) {
            ctx.status = 400;
            throw new Error('请输入内容！');
        }
        return ctx.model.Product.create(data);
    }

    async deleteProduct(ctx, id) {
        const product = await ctx.model.Product.findByPk(toInt(id));
        if (!product) {
            ctx.status = 404;
            return;
        }
        await product.destroy();
        ctx.status = 200;
    }

}

module.exports = new ProductService();