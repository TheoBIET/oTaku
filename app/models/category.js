const sequelize = require('./../database');
const { DataTypes, Model } = require('sequelize');

class Category extends Model { }

Category.init({
  mal_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  label: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  sequelize,
  tableName: 'category'
});

module.exports = Category;