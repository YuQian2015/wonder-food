const casbin = require('casbin');
const { SequelizeAdapter } = require('casbin-sequelize-adapter');
const config = require('config');
const path = require('path');
const dbConfig = config.get('Database');

async function initCasbin() {
    // Initialize a Sequelize adapter and use it in a Node-Casbin enforcer:
    // The adapter can not automatically create database.
    // But the adapter will automatically and use the table named "casbin_rule".
    // ORM should not create databases automatically.
    const a = await SequelizeAdapter.newAdapter({
        username: dbConfig.user,
        password: dbConfig.password,
        database: dbConfig.dbName,
        dialect: 'mysql',
    });

    const e = await casbin.newEnforcer(path.resolve(__dirname, '../../config/keymatch_model.conf'), a);

    // Check the permission.
    // e.enforce('alice', '/alice_data/*', 'GET');

    // Modify the policy.
    // await e.addPolicy(...);
    await e.addPolicy('alice', '/alice_data/*', 'GET');
    // await e.removePolicy(...);

    // Save the policy back to DB.
    await e.savePolicy();
    return e;
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
