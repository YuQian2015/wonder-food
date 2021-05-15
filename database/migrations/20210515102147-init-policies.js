module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, ENUM } = Sequelize;
    await queryInterface.createTable('policies', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      name: STRING(200),
      api: STRING(256),
      methods: INTEGER, // 0001表示GET，0010表示POST， 0100表示PUT，1000表示DELETE 分别为 1 2 4 8
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('policies');
  }
};
