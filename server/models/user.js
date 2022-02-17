"use strict";
const {Model} = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        static associate(models) {
            // User.hasOne(models.UserKyc,{
            //     foreignKey:"user_id",
            //     as:"kyc"
            // });

            User.belongsTo(models.Role, {
                foreignKey: "role_id",
                as: "role"
            });

            User.belongsToMany(models.Permission, {
                through: models.UserPermission,
                foreignKey: "user_id",
                otherKey: "permission_id",
                as: "permissions"
            });

            User.hasOne(models.Kitchen, {
                foreignKey: "chef_id",
                as: "kitchen"
            });
        }
    }

    User.init({
        image: DataTypes.STRING,
        name: DataTypes.STRING,
        mobile: DataTypes.STRING,
        email: DataTypes.STRING,
        role_id: DataTypes.INTEGER,
        zip_code: DataTypes.STRING,
        state: DataTypes.STRING,
        city: DataTypes.STRING,
        address: DataTypes.STRING,
        password: DataTypes.STRING,
        is_active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        is_approve: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    }, {
        sequelize,
        modelName: "User",
    });
    return User;
};