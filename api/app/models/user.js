const sequelize = require("./../client");
const { DataTypes, Model } = require("sequelize");

class User extends Model {}

User.init(
    {
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        email: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        first_name: {
            type: DataTypes.TEXT,
        },
        last_name: {
            type: DataTypes.TEXT,
        },
        description: {
            type: DataTypes.TEXT,
        },
        my_anime_list_username: {
            type: DataTypes.TEXT,
        },
        avatar_url: {
            type: DataTypes.TEXT,
        },
    },
    {
        sequelize,
        tableName: "user",
    }
);

module.exports = User;
