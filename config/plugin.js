// config/plugin.js

const Sequelize = require("sequelize");
const config = require('config');
const dbConfig = config.get('Database');

console.log('init sequelize...');

exports.sequelize = new Sequelize(dbConfig.dbName, dbConfig.user, dbConfig.password, {
    host: dbConfig.host, //数据库地址
    dialect: 'mysql', //指定连接的数据库类型
    pool: {
        max: 5, //连接池最大连接数量
        min: 0, //最小连接数量
        idle: 10000, //如果一个线程 10秒内没有被使用过的话，就释放
    },
    logging: true, // 执行过程会log一些SQL的logging，设为false不显示
})
