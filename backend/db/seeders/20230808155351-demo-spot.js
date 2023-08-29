'use strict';

const { Spot } = require('../models');

let options = {};
//  Defines your schema through the options object
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;



module.exports = {
  async up (queryInterface, Sequelize) {

    await Spot.bulkCreate([
      {
        ownerId: 1,
        address:"1 Disney Lane",
        city: "Greenville",
        state: "South Carolina",
        country: "USA",
        lat: 37.7645,
        lng: -122.4730,
        name: "Cozy Treehouse",
        description: "A place where web developers are created",
        price: 273.00
      },
      {
        ownerId: 2,
        address:"2 Universal Lane",
        city: "Blue Ridge",
        state: "Georgia",
        country: "USA",
        lat: 40.7645,
        lng: 12.4730,
        name: "New LUXE Chalet",
        description: "Another place where web developers are created",
        price: 1052.00
      },
      {
        ownerId: 3,
        address:"3 Main Street",
        city: "Bolton",
        state: "New York",
        country: "USA",
        lat: -40.7645,
        lng: -2.4730,
        name: "'Highlands Castle' overlooking Lake George",
        description: "A third place where web developers are created",
        price: 2290.00
      },
      {
        ownerId: 4,
        address:"4 Main Street",
        city: "Breckenridge",
        state: "Colorado",
        country: "USA",
        lat: -40.7645,
        lng: -2.4730,
        name: "Three Sisters Lookout",
        description: "A FOURTH place where web developers are created",
        price: 724.00
      },
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {});
  }
};
