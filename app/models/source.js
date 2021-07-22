const sequelize = require('./../database');
const { DataTypes, Model } = require('sequelize');

class Source extends Model { }

Source.init({
  label: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'source'
});

module.exports = Source;