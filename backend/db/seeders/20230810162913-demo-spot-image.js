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
        url: 'https://a0.muscache.com/im/pictures/b4db5900-b90e-4cc3-b12b-6d17953d0079.jpg?im_w=1200',
        preview: true
      },
      {
      spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/64986466-734d-4c39-ab52-69f6b9c1059b.jpg?im_w=1200',
        preview: false
      },
      {
      spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/abd1ddb2-33bb-48d8-8000-d10015d52a7c.jpg?im_w=1200',
        preview: false
      },
      {
      spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/76f43fbe-2524-4469-8eb3-ab12ac0738e0.jpg?im_w=1440',
        preview: false
      },
      {
      spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/6c3932d1-484c-4953-b1ba-d4074f2e40e6.jpg?im_w=1200',
        preview: false
      },
      {
      spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47336678/original/fae24879-7e22-43b8-b186-3212346ed35b.jpeg?im_w=1200',
        preview: true
      },
      {
      spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47336678/original/5d19214e-0e5a-40de-8457-b5e2a4aa3271.jpeg?im_w=1200',
        preview: false
      },
      {
      spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47336678/original/91280dc8-9780-4a02-9f86-8c8cf9bb8268.jpeg?im_w=1200',
        preview: false
      },
      {
      spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47336678/original/f99282f1-f24e-490e-8261-018ba8a11027.jpeg?im_w=1440',
        preview: false
      },
      {
      spotId: 11,
        url: 'https://a0.muscache.com/im/pictures/prohost-api/Hosting-47336678/original/1aaaca5c-b1a3-4f5c-9bda-bbbe47c648d8.jpeg?im_w=1200',
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
