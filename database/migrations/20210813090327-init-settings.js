module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, ENUM } = Sequelize;
    await queryInterface.createTable('settings', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      type: ENUM('banner'), // 设置类型
      data: STRING(2000), // 设置的静态化数据
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('settings');
  }
};
