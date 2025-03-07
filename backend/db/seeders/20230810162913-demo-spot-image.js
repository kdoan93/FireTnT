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
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-689034491215725661/original/751e2099-ef3e-4624-9e96-22bc0a856a5b.jpeg?im_w=1200&im_format=avif',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-689034491215725661/original/1e29c01e-6e62-4b52-9531-e554aacc2bde.jpeg?im_w=1200&im_format=avif',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-689034491215725661/original/9f883662-b247-406d-9850-117fff3d62be.jpeg?im_w=1200&im_format=avif',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-689034491215725661/original/0195c3f8-a401-46a8-9ec5-485c14e0eaaf.jpeg?im_w=1200&im_format=avif',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-689034491215725661/original/f3bc036b-b4bd-4e55-bcc6-af7b0469051b.jpeg?im_w=1200&im_format=avif',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-910287057304342656/original/44f27bcc-d830-4b4c-9051-18066e6bb72f.jpeg?im_w=1200',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-910287057304342656/original/5d5cc81c-d004-41a5-a2cb-c95c31570e21.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-910287057304342656/original/70669fef-f621-47ff-b877-1291117f4f1d.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-910287057304342656/original/c9145b9c-de83-46c7-b4fb-5c2ea2a3202a.jpeg?im_w=1200',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-910287057304342656/original/1a3a8902-2d52-4632-8de2-f88308f89a39.jpeg?im_w=1200',
        preview: false
      },
      {
      spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-701384721983228885/original/294c5d86-6ebc-4913-9d6b-c1b971f68f6b.jpeg?im_w=1200',
        preview: true
      },
      {
      spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-701384721983228885/original/853e61f5-b8ec-49c7-90ca-4991063cc864.jpeg?im_w=1200',
        preview: false
      },
      {
      spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-701384721983228885/original/29d7438a-9a67-4688-b5c9-74d6737b3651.jpeg?im_w=1200',
        preview: false
      },
      {
      spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-701384721983228885/original/fd803838-5978-48ff-8f56-87618341172e.jpeg?im_w=1200',
        preview: false
      },
      {
      spotId: 6,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-701384721983228885/original/bb4bfa71-c5c2-45e6-80d2-dc8e716565d7.jpeg?im_w=1200',
        preview: false
      },
      {
      spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-765886237687379456/original/bd33707d-5b0b-49dd-b38f-0bded9f13925.jpeg?im_w=1200',
        preview: true
      },
      {
      spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-765886237687379456/original/c54415fe-b205-4ff2-acd3-bfd72707f009.jpeg?im_w=1200',
        preview: false
      },
      {
      spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-765886237687379456/original/77429a34-c52e-4ac5-ba22-cf9056f45fc4.jpeg?im_w=1200',
        preview: false
      },
      {
      spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-765886237687379456/original/62b57771-bb44-401f-9455-0144232ea517.jpeg?im_w=1200',
        preview: false
      },
      {
      spotId: 7,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-765886237687379456/original/0fce550e-876b-4482-9398-b86cf093eba7.jpeg?im_w=1200',
        preview: false
      },
      {
      spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1008785726031193489/original/a3f77a9d-af1d-4b1e-a740-f8af82a3e72f.jpeg?im_w=1200',
        preview: true
      },
      {
      spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1008785726031193489/original/21a4a2b5-165e-489c-8faf-7c0dc4347f4f.jpeg?im_w=1200',
        preview: false
      },
      {
      spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1008785726031193489/original/a5bb9673-bfaa-4886-86d1-6c9df29dd104.jpeg?im_w=1200',
        preview: false
      },
      {
      spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1008785726031193489/original/c81c8d4e-566c-4376-b74e-47fcb13b670c.jpeg?im_w=1440',
        preview: false
      },
      {
      spotId: 8,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-1008785726031193489/original/06e8d56b-fa84-48e1-b1f4-6f8b0c1ff35b.jpeg?im_w=1440',
        preview: false
      },
      {
      spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/7b57bf26-bbf6-4ae9-9166-8dcb988c3c7b.jpg?im_w=1200',
        preview: true
      },
      {
      spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/838e8be3-be72-454d-a45e-15f7af89d679.jpg?im_w=1440',
        preview: false
      },
      {
      spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/c02587fe-f0de-4b83-a7f9-e746205a8e98.jpg?im_w=1200',
        preview: false
      },
      {
      spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/76b8ed0b-7d85-498f-add9-5da056b90e87.jpg?im_w=1200',
        preview: false
      },
      {
      spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-37654064/original/056f4b63-f18a-4c98-a9ac-da5b47fab73c.jpeg?im_w=1200',
        preview: false
      },
      {
      spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/37fb1d14-b401-45fd-a57b-06b0da5d7d19.jpg?im_w=1200&im_format=avif',
        preview: true
    },
    {
      spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/616bc395-644d-4089-b2c1-13c6c11c50fd.jpg?im_w=1200&im_format=avif',
        preview: false
    },
    {
      spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/91cb13e8-cede-4c17-8295-106369bd4d97.jpg?im_w=1200&im_format=avif',
        preview: false
      },
      {
      spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/4e367eea-801c-43fa-a7f0-4020a57ac21e.jpg?im_w=1200&im_format=avif',
        preview: false
      },
      {
      spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/66c6dbaf-9152-4bd2-844e-499d41591754.jpg?im_w=1200&im_format=avif',
        preview: false
      },
      {
      spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NzUyOTQwMTc3MjgyMjMzMzg5/original/ad47a1c5-e215-4822-a788-835f780b5b72.jpeg?im_w=1200&im_format=avif',
        preview: true
      },
      {
      spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6NzUyOTQwMTc3MjgyMjMzMzg5/original/18b9d4c5-5ca1-42b0-ab9c-d6093a7852cf.jpeg?im_w=1200&im_format=avif',
        preview: false
      },
      {
      spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-752940177282233389/original/eb3e6f21-8117-48e6-8047-864db9aa866c.jpeg?im_w=1200&im_format=avif',
        preview: false
      },
      {
      spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-752940177282233389/original/0d6499fe-6384-4499-917b-a6583ddef1a0.jpeg?im_w=1200&im_format=avif',
        preview: false
      },
      {
      spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-752940177282233389/original/f2db167b-8169-4a7d-a527-ba2281a9cb48.jpeg?im_w=1200&im_format=avif',
        preview: false
      },
      {
      spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/c4c92198-fb3a-4c4b-bbb6-3aa8af8f7e73.jpg?im_w=1200',
        preview: true
      },
      {
      spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/76672df0-df76-490b-8f77-dee11757ceae.jpg?im_w=1440',
        preview: false
      },
      {
      spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/63ee70fc-4a43-4fb8-9bd9-8f9c72cc8dfe.jpg?im_w=1200',
        preview: false
      },
      {
      spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/f81a7ee0-ea83-436d-9ed6-71d53aaae7a6.jpg?im_w=1200',
        preview: false
      },
      {
      spotId: 12,
        url: 'https://a0.muscache.com/im/pictures/f502e121-683a-4011-9ef8-ddf5ddba6256.jpg?im_w=1200',
        preview: false
      },
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'SpotImages'
    await queryInterface.bulkDelete(options, {});
  }
};
