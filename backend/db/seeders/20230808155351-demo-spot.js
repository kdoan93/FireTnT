'use strict';

const { Spot } = require('../models')

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up (queryInterface, Sequelize) {

    await Spot.bulkCreate([
      {
        ownerId: 1,
        address:"1 Disney Lane",
        city: "San Francisco",
        state: "California",
        country: "USA",
        lat: 37.7645358,
        lng: -122.4730327,
        name: "App Academy",
        description: "A place where web developers are created",
        price: 123.00
      },
      {
        ownerId: 2,
        address:"2 Universal Lane",
        city: "San Francisco",
        state: "California",
        country: "USA",
        lat: 40.7645358,
        lng: 12.4730327,
        name: "App Academy II",
        description: "Another place where web developers are created",
        price: 124.00
      },
      {
        ownerId: 3,
        address:"3 Main Street",
        city: "San Francisco",
        state: "California",
        country: "USA",
        lat: -40.7645358,
        lng: -2.4730327,
        name: "App Academy III",
        description: "A third place where web developers are created",
        price: 125.00
      },
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'Spot';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(options, {
      name: { [Op.or]: [ "App Academy", "App Academy II", "App Academy III" ] }
    }, {});
  }
};
