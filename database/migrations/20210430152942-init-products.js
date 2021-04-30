module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, ENUM } = Sequelize;
    await queryInterface.createTable('products', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(200),
      description: STRING(512),
      images: STRING,
      type: INTEGER,
      store_id: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('products');
  }
};
