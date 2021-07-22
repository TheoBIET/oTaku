const sequelize = require('./../database');
const { DataTypes, Model } = require('sequelize');

class Rating extends Model { }

Rating.init({
  label: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'rating'
});

module.exports = Rating;