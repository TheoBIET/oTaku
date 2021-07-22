const sequelize = require('./../database');
const { DataTypes, Model } = require('sequelize');

class Media extends Model { }

Media.init({
  label: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'media_type'
});

module.exports = Media;