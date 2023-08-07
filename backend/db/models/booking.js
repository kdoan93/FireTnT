'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {

    static associate(models) {
      // define association here
      Booking.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      })
      Booking.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Booking.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
