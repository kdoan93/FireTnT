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
        stars: 5
      },
      {
        spotId: 2,
        userId: 3,
        review: 'This was an awesome spot!',
        stars: 5
      },
      {
        spotId: 3,
        userId: 2,
        review: 'Mid af bruh.',
        stars: 3
      },
      {
        spotId: 3,
        userId: 4,
        review: 'This was an awesome spot!',
        stars: 5
      },
      {
        spotId: 2,
        userId: 1,
        review: 'This was NOT an awesome spot!',
        stars: 2
      },
      {
        spotId: 1,
        userId: 2,
        review: 'It was aight... I guess.',
        stars: 4
      },
      {
        spotId: 5,
        userId: 2,
        review: 'Lake views were amazing. Sun burns were not.',
        stars: 3
      },
      {
        spotId: 6,
        userId: 1,
        review: 'Best lake views in North Cackalacky!',
        stars: 5
      },
      {
        spotId: 7,
        userId: 4,
        review: 'Fancy stay, fancier price',
        stars: 4
      },
      {
        spotId: 8,
        userId: 1,
        review: 'Great location surrounded by pizza shops!',
        stars: 5
      },
      {
        spotId: 9,
        userId: 4,
        review: 'Lights from LA were too bright',
        stars: 3
      },
      {
        spotId: 10,
        userId: 1,
        review: 'Amazing stay made me want to do the Carlton',
        stars: 5
      },
      {
        spotId: 11,
        userId: 2,
        review: 'Absolutely amazing mountain and lake views. Even more amazing price',
        stars: 4
      },
      {
        spotId: 8,
        userId: 3,
        review: 'Gained too much weight eating pizza everyday 😭',
        stars: 4
      },
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Reviews'
    await queryInterface.bulkDelete(options, {});
  }
};
