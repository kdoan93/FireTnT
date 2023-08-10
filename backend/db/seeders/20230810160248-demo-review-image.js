'use strict';

const { ReviewImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up (queryInterface, Sequelize) {

    await ReviewImage.bulkCreate([
      {
       reviewId: 1,
       url: 'https://sample.com/review-image1.jpg'
      },
      {
       reviewId: 2,
       url: 'https://sample.com/review-image2.jpg'
      },
      {
       reviewId: 3,
       url: 'https://sample.com/review-image3.jpg'
      },
      {
       reviewId: 4,
       url: 'https://sample.com/review-image4.jpg'
      },
      {
       reviewId: 5,
       url: 'https://sample.com/review-image5.jpg'
      }
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'ReviewImage'
    await queryInterface.bulkDelete(options, {});
  }
};
