'use strict';

const { Booking } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') options.schema = process.env.SCHEMA;

module.exports = {
  async up (queryInterface, Sequelize) {

    await Booking.bulkCreate([
      {
        spotId: 1,
        userId: 2,
        startDate: "2023-01-10",
        endDate: "2023-01-15"
      },
      {
        spotId: 2,
        userId: 3,
        startDate: "2023-01-14",
        endDate: "2023-01-17"
      },
      {
        spotId: 3,
        userId: 2,
        startDate: "2023-02-01",
        endDate: "2023-02-03"
      },
      {
        spotId: 3,
        userId: 1,
        startDate: "2023-03-10",
        endDate: "2023-01-20"
      },
      {
        spotId: 2,
        userId: 1,
        startDate: "2023-04-10",
        endDate: "2023-04-11"
      },
    ])
  },

  async down (queryInterface, Sequelize) {

    options.tableName = "Bookings"
    await queryInterface.bulkDelete(options, {});
  }
};
