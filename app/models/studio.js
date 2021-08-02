const sequelize = require("./../database");
const { DataTypes, Model } = require("sequelize");

class Studio extends Model {}

Studio.init(
    {
        mal_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        label: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: "studio",
    }
);

module.exports = Studio;
