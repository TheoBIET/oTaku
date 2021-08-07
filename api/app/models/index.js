const Role = require("./role");
const User = require("./user");
const Token = require("./token");

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

// TODO : Make a relation 1:1 and not 1:N
User.hasMany(Token, {
    as: "tokens",
    foreignKey: "user_id",
    onDelete: 'CASCADE'
});

Token.belongsTo(User, {
    as: "user",
    foreignKey: {
        name: "user_id",
        allowNull: false,
        onDelete: 'CASCADE',
    },
});

module.exports = {
    Role,
    User,
    Token,
};
