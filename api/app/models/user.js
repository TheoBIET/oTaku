const sequelize = require("./../database");
const { DataTypes, Model } = require("sequelize");

class User extends Model {}

User.init(
    {
        username: {
            type: DataTypes.TEXT,
            allowNull: false,
            unique: true,
        },
        first_name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        last_name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        my_anime_list_username: {
            type: DataTypes.TEXT,
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
