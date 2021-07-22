const sequelize = require('./../database');
const { DataTypes, Model } = require('sequelize');

class Episode extends Model { }

Episode.init({
  episode_num: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  streaming_link: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  probable_season:{
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  playlist_no: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  website: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  language: {
    type: DataTypes.TEXT,
    allowNull: false
  },
}, {
  sequelize,
  tableName: 'anime_episode'
});

module.exports = Episode;