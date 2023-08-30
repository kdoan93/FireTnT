'use strict';

const { SpotImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up (queryInterface, Sequelize) {

    await SpotImage.bulkCreate([
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53328509/original/0557b7aa-6e90-4a13-b45b-41184f7a94f0.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53328509/original/33c7c17c-ab31-455d-b0c4-2c3850d53847.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53328509/original/7d471858-0845-41ba-a6be-ea25bd199ced.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53328509/original/59a36061-cb96-459e-af39-e19451139b1b.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53328509/original/92c29e66-43cd-4cfc-803d-667865e298f1.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-788677501749872896/original/87a28520-c3df-45a1-b0f0-ea5c3948bdd0.jpeg?im_w=960',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-788677501749872896/original/2dda9202-c8d7-405d-aaf0-c446688ffaf2.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/fa840eb9-5479-40e3-87fa-66cb0981ee9d.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-788677501749872896/original/02f7f4fe-ed12-41a1-88e6-21ab2195fde6.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-788677501749872896/original/bdae6893-9bdc-45de-a06b-796726147698.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/a57ab9ea-80d5-4ed0-aa15-ce536039778d.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/8961370/4466c2e0_original.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/06735e73-9a79-46a1-a640-0f8cb434c1c8.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/ff362ed7-1b1d-4cf8-af70-9a2cbc80e2ef.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/8962359/a09cc255_original.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/ad85abf4-25e3-4e9a-8e53-cc61cb724e70.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/fa840eb9-5479-40e3-87fa-66cb0981ee9d.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/38aa1261-c549-45cc-9109-4fde8edf8ed2.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/10917571-2377-4e31-b50d-bebeb33acc2f.jpg?im_w=1200',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/48e844c8-abc8-435a-9caf-a38af6096a84.jpg?im_w=1200',
        preview: false
      },
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'SpotImages'
    await queryInterface.bulkDelete(options, {});
  }
};
