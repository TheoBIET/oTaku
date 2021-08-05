const Role = require("./role");
const User = require("./user");

Role.hasMany(User, {
    as: "users",
    foreignKey: "role_id",
});

User.belongsTo(Role, {
    as: "role",
    foreignKey: {
        name: "role_id",
        allowNull: false,
        defaultValue: 1,
    },
});

module.exports = {
    Role,
};
