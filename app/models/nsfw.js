const sequelize = require('./../database');
const { DataTypes, Model } = require('sequelize');

class NSFW extends Model { }

NSFW.init({
  label: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'nsfw_color'
});

module.exports = NSFW;