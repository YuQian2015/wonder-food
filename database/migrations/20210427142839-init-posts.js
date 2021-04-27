'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, DATE, STRING, ENUM } = Sequelize;
    await queryInterface.createTable('posts', {
      id: { type: INTEGER, primaryKey: true, autoIncrement: true },
      created_by: INTEGER,
      title: STRING,
      content: STRING,
      type: INTEGER,
      images: STRING,
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('posts');
  }
};
