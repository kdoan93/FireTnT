'use strict';

const { ReviewImage } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up (queryInterface, Sequelize) {

    await ReviewImage.bulkCreate([
      {
       reviewId: 1,
       url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53328509/original/33c7c17c-ab31-455d-b0c4-2c3850d53847.jpeg?im_w=1200'
      },
      {
       reviewId: 2,
       url: 'https://a0.muscache.com/im/pictures/miso/Hosting-788677501749872896/original/35b0cf64-36de-4416-9079-a6f45816e993.jpeg?im_w=1200'
      },
      {
       reviewId: 3,
       url: 'https://a0.muscache.com/im/pictures/f28ca8bd-434d-4422-ad88-37411599facc.jpg?im_w=720'
      },
      {
       reviewId: 4,
       url: 'https://a0.muscache.com/im/pictures/0f804b37-ba6a-4809-8b39-02f0c8b93553.jpg?im_w=1200'
      },
      {
       reviewId: 5,
       url: 'https://a0.muscache.com/im/pictures/miso/Hosting-788677501749872896/original/8708ebd6-6c27-4173-9da3-b7d335c79188.jpeg?im_w=1200'
      },
      {
       reviewId: 6,
       url: 'https://a0.muscache.com/im/pictures/10917571-2377-4e31-b50d-bebeb33acc2f.jpg?im_w=1200'
      },
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'ReviewImages'
    await queryInterface.bulkDelete(options, {});
  }
};
