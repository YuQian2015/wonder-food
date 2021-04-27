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
      images: {
        type: STRING,
        allowNull: true,
        get() {
          return this.getDataValue('images').split(',');
        },
        set(value) {
          return this.setDataValue('images', value.join(','))
        }
      },
      created_at: DATE,
      updated_at: DATE,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('posts');
  }
};
