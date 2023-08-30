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
        preview: true
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53328509/original/d1c74d77-386a-452e-937f-957d62ef3079.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53328509/original/59a36061-cb96-459e-af39-e19451139b1b.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-53328509/original/687c6f97-8d74-460b-9968-0c19ca284f4c.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-788677501749872896/original/87a28520-c3df-45a1-b0f0-ea5c3948bdd0.jpeg?im_w=960',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-788677501749872896/original/2dda9202-c8d7-405d-aaf0-c446688ffaf2.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-788677501749872896/original/99adadda-8425-4040-b19e-c7313a56371b.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-788677501749872896/original/02f7f4fe-ed12-41a1-88e6-21ab2195fde6.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-788677501749872896/original/bdae6893-9bdc-45de-a06b-796726147698.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/a57ab9ea-80d5-4ed0-aa15-ce536039778d.jpg?im_w=960',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-677112/original/a9014d8d-7a98-4dd2-91ab-7b69e140606d.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/32607798-4dfb-4fd9-8a1a-f71441acabb0.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/14e1aadd-5256-421d-9f12-21600f39a8b4.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-677112/original/5a901655-4049-4675-a06d-a8b48162a9d0.jpeg?im_w=720',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/ad85abf4-25e3-4e9a-8e53-cc61cb724e70.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/9d1d8c71-155c-43e8-8cc2-1e639477d21e.jpg?im_w=720',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/38aa1261-c549-45cc-9109-4fde8edf8ed2.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/10917571-2377-4e31-b50d-bebeb33acc2f.jpg?im_w=1200',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/2cecdc3a-fcd6-45f2-a18f-604951b355b8.jpg?im_w=720',
        preview: true
      },
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'SpotImages'
    await queryInterface.bulkDelete(options, {});
  }
};
