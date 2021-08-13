class SettingController {

    async index(ctx) {
        const { type } = ctx.query;
        const query = { type };
        const setting = await ctx.service.setting.findSettings(ctx, query);
        ctx.setResponse(setting);
    }

    async create(ctx) {
        const { type, data } = ctx.request.body;
        const newSetting = await ctx.service.setting.createSetting(ctx, { type, data });
        ctx.setResponse(newSetting);
    }
}

module.exports = new SettingController();
