'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {

    static associate(models) {
      // define association here
      Review.belongsTo(models.Spot, {
        foreignKey: 'spotId'
      })
      Review.belongsTo(models.User, {
        foreignKey: 'userId'
      })
      Review.hasMany(models.ReviewImage, {
        foreignKey: 'reviewId',
        onDelete: 'CASCADE',
        hooks: true
      })
    }
  }
  Review.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    review: {
      type: DataTypes.STRING,
      allowNull: false
    },
    stars: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [1, 5]
      }
    }
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};
