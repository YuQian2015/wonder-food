module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, ENUM } = Sequelize;
    await queryInterface.createTable('stores', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(200),
      description: STRING(512),
      images: STRING,
      type: INTEGER,
      tel: STRING(30),
      address: STRING(300),
      location: STRING(100),
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('stores');
  }
};
