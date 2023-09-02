'use strict';

const { Review } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up (queryInterface, Sequelize) {

    await Review.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        review: 'This was an awesome spot!',
        stars: 5.0
      },
      {
        spotId: 2,
        userId: 3,
        review: 'This was an awesome spot!',
        stars: 5.0
      },
      {
        spotId: 3,
        userId: 2,
        review: 'Mid af bruh.',
        stars: 3.0
      },
      {
        spotId: 3,
        userId: 4,
        review: 'This was an awesome spot!',
        stars: 5.0
      },
      {
        spotId: 2,
        userId: 1,
        review: 'This was NOT an awesome spot!',
        stars: 2.0
      },
      {
        spotId: 1,
        userId: 2,
        review: 'It was aight... I guess.',
        stars: 4.0
      },
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Reviews'
    await queryInterface.bulkDelete(options, {});
  }
};
