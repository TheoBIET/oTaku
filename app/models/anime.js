const sequelize = require('./../database');
const { DataTypes, Model } = require('sequelize');

class Anime extends Model {}

Anime.init({
  mal_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  en_title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  jp_title: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  medium_picture_url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  large_picture_url: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATEONLY,
  },
  end_date: {
    type: DataTypes.DATEONLY,
  },
  num_episodes: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  synopsis: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  mean: {
    type: DataTypes.FLOAT,
  },
  rank: {
    type: DataTypes.INTEGER,
  },
  broadcast_day: {
    type: DataTypes.TEXT,
  },
  broadcast_time: {
    type: DataTypes.TEXT,
  },
}, {
  sequelize,
  tableName: 'anime'
});

module.exports = Anime;