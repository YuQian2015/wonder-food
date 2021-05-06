// https://eggjs.org/zh-cn/tutorials/sequelize.html
module.exports = {
  // 在执行数据库升级时调用的函数，创建 users 表
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, ENUM } = Sequelize;
    await queryInterface.createTable('users', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(30),
      age: INTEGER,
      email: STRING(200),
      password: STRING, // md5SignValue
      avatar_url: STRING,
      gender: ENUM('男', '女', '保密'), // 性别 0未设置 1男 2女
      role: INTEGER, // 角色
      user_status: INTEGER, // 0 访客 1 正式用户
      created_at: DATE,
      updated_at: DATE,
    });
  },
  // 在执行数据库降级时调用的函数，删除 users 表
  down: async queryInterface => {
    await queryInterface.dropTable('users');
  },
};