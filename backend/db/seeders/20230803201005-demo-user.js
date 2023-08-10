'use strict';

const { User } = require('../models');
const bcrypt = require("bcryptjs");

let options = {};
//  Defines your schema through the options object
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up (queryInterface, Sequelize) {

    await User.bulkCreate([
      {
        firstName: 'Kenny',
        lastName: 'Doan',
        email: 'kdoan93@gmail.com',
        username: 'JumboWumbo',
        hashedPassword: bcrypt.hashSync('noPasswords')
      },
      {
        firstName: 'John',
        lastName: 'Smith',
        email: 'john.smith@gmail.com',
        username: 'john.smith',
        hashedPassword: bcrypt.hashSync('secret password')
      },
      {
        firstName: 'Derp',
        lastName: 'McDerp',
        email: 'derpy@user.io',
        username: 'SenorDerp',
        hashedPassword: bcrypt.hashSync('derpyderp69')
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Users';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {});
  }
};
