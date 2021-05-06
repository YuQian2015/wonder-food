const casbin = require('casbin');
const { SequelizeAdapter } = require('casbin-sequelize-adapter');
const config = require('config');
const path = require('path');
const dbConfig = config.get('Database');

// load the casbin model and policy from files, database is also supported.
const model = path.join(__dirname, '../../config/keymatch_model.conf');
const policy = path.join(__dirname, '../../config/keymatch_policy.csv');

async function initCasbin() {
    // Initialize a Sequelize adapter and use it in a Node-Casbin enforcer:
    // The adapter can not automatically create database.
    // But the adapter will automatically and use the table named "casbin_rule".
    // ORM should not create databases automatically.
    const adapter = await SequelizeAdapter.newAdapter({
        username: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.dbName,
        dialect: 'mysql',
    });


    // const e = await casbin.newEnforcer(model, policy); // 使用文件
    const enforcer = await casbin.newEnforcer(model, adapter); // 使用适配器

    // Check the permission.
    // e.enforce('alice', '/alice_data/*', 'GET');

    // Modify the policy.
    // await e.addPolicy(...);
    // await e.addPolicy('alice', '/alice_data/*', 'GET');
    // await e.removePolicy(...);

    // 以下是添加权限的示例
    // console.log(await enforcer.addPolicy('admin', '/pack/list', '(GET)|(POST)'));
    // console.log(await enforcer.addPolicy('admin', '/pack', '(GET)|(POST)'));
    // console.log(await enforcer.addPolicy('admin', '/file', '(GET)|(POST)'));
    // console.log(await enforcer.addPolicy('admin', '/ui', '(GET)|(POST)'));
    // console.log(await enforcer.addPolicy('admin', '/home', '(GET)|(POST)'));
    // console.log(await enforcer.addPolicy('admin', '/tenant/*', '(GET)|(POST)|(PUT)|(DELETE)'));
    // console.log(await enforcer.addPolicy('user', '/api/v1/**', '(GET)|(POST)|(PUT)|(DELETE)'));
    // console.log(await enforcer.addPolicy('user', '/**', '(GET)|(POST)|(PUT)|(DELETE)'));


    // console.log(await enforcer.removePolicy('user', '/**', '(GET)|(POST)|(PUT)|(DELETE)'));
    // console.log(enforcer.getPolicy());

    return enforcer;
}

module.exports = async (app) => {
    const enforce = await initCasbin();
    app.use(async (ctx, next) => {
        try {
            ctx.enforce = enforce;
            await next();
        } catch (err) {
            console.log(err);
            throw err
        }
    });
}
