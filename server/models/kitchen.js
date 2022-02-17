'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Kitchen extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Kitchen.belongsTo(models.User, {
                foreignKey: "chef_id",
                as: "chef"
            })

            Kitchen.hasMany(models.Dish, {
                foreignKey: "kitchen_id",
                as: "dish"
            })

            Kitchen.belongsTo(models.Category, {
                foreignKey: "main_category_id",
                as: "main_category",
            });

            Kitchen.belongsTo(models.Category, {
                foreignKey: "sub_category_id",
                as: "sub_category"
            });
        }
    }

    Kitchen.init({
        chef_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        status: DataTypes.STRING,
        main_category_id: DataTypes.INTEGER,
        sub_category_id: DataTypes.INTEGER,
        delivery_option: DataTypes.STRING,
        open_time: DataTypes.DATE,
        close_time: DataTypes.DATE,
        address: DataTypes.STRING,
        zip_code: DataTypes.STRING,
        about: DataTypes.STRING,
        image: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Kitchen',
    });
    return Kitchen;
};