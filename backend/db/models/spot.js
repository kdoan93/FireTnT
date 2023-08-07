'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {

    static associate(models) {
      // define association here
      Spot.belongsTo(models.User, {
        foreignKey: 'ownerId'
      })
      Spot.hasMany(models.SpotImage, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true
      })
      Spot.hasMany(models.Booking, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true
      })
      Spot.hasMany(models.Review, {
        foreignKey: 'spotId',
        onDelete: 'CASCADE',
        hooks: true
      })
    }
  }
  Spot.init({
    ownerId: DataTypes.INTEGER,
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isRequired(value) {
      //     if (!value) throw new Error('Street address is required')
      //   }
      // }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isRequired(value) {
      //     if (!value) throw new Error('City is required')
      //   }
      // }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isRequired(value) {
      //     if (!value) throw new Error('State is required')
      //   }
      // }
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   isRequired(value) {
      //     if (!value) throw new Error('Country is required')
      //   }
      // }
    },
    lat: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      // validate: {
      //   isValid(value) {
      //     if (!value) throw new Error('Latitude is not valid')
      //   }
      // }
    },
    lng: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      // validate: {
      //   isValid(value) {
      //     if (!value) throw new Error('Longitude is not valid')
      //   }
      // }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50],

      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};
