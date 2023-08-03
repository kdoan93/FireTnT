'use strict';

/* @type {import('sequelize-cli').Migration} */

const { User } = require('../models');
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  //  Defines your schema through the options object
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {

    await User.bulkCreate([
      {
        email: 'kdoan93@gmail.com',
        username: 'JumboWumbo',
        hashedPassword: bcrypt.hashSync('noPasswords')
      },
      {
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password')
      },
      {
        email: 'derpy@user.io',
        username: 'FakeDerp',
        hashedPassword: bcrypt.hashSync('derpderp69')
      },
    ], { validate: true });
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: [ 'JumboWumbo', 'Demo-lition', 'FakeDerp' ] }
    }, {});
  }
};
