
class SettingService {

    async findSettings(ctx, query = {}) {
        return ctx.model.Setting.findAll({
            ...query,
            order: [
                ['created_at', 'DESC']
            ]
        });
    }

    async createSetting(ctx, data) {
        const { type } = data;
        const setting = await ctx.model.Setting.findOne({
            where: { type }
        });
        if (setting) {
            await setting.update(data);
            return setting;
        }
        return ctx.model.Setting.create(data);
    }
}

module.exports = new SettingService();