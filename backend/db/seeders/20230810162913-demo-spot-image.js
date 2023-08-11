'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up (queryInterface, Sequelize) {

    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://sample.com/spot-image1.jpg',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://sample.com/spot-image2.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://sample.com/spot-image3.jpg',
        preview: true
      }
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'SpotImages'
    await queryInterface.bulkDelete(options, {});
  }
};
