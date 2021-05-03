module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, ENUM } = Sequelize;
    await queryInterface.createTable('roles', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(200),
      key: STRING(200),
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('roles');
  }
};
