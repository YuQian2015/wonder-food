module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, ENUM } = Sequelize;
    await queryInterface.createTable('comments', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      content: STRING(512),
      images: STRING,
      type: INTEGER,
      comment_id: INTEGER,
      store_id: INTEGER,
      product_id: INTEGER,
      post_id: INTEGER,
      created_by: INTEGER,
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('comments');
  }
};
