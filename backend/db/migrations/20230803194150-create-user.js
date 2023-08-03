'use strict';

/* @type {import('sequelize-cli').Migration} */

let options = {};
if (process.env.NODE_ENV === 'production') {
  //  define your schema in options object
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(30),
        allowNull: false,
        unique: true,
        // onDelete: 'CASCADE'
      },
      email: {
        type: Sequelize.STRING(256),
        allowNull: false,
        unique: true,
        // onDelete: 'CASCADE'
      },
      hashedPassword: {
        type: Sequelize.STRING,
        allowNull: false,
        // onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    }, options);
  },
  async down(queryInterface, Sequelize) {
    // await queryInterface.dropTable('Users');
    options.tableName = "Users";
    return queryInterface.dropTable(options);
  }
};
