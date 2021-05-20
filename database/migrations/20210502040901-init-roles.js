module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, ENUM, BOOLEAN } = Sequelize;
    await queryInterface.createTable('roles', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: {
        type: STRING(200),
        unique: true,
        allowNull: false
      },
      key: {
        type: STRING(200),
        unique: true,
        allowNull: false
      },
      system: {
        type: BOOLEAN,
        defaultValue: false,
        allowNull: false
      },
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('roles');
  }
};
