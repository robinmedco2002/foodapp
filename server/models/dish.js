'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Dish extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Dish.belongsTo(models.Kitchen, {
                foreignKey: "kitchen_id",
                as: "kitchen"
            });
        }
    };
    Dish.init({
        kitchen_id: DataTypes.INTEGER,
        name: DataTypes.STRING,
        status: DataTypes.STRING,
        about: DataTypes.STRING,
        price: DataTypes.STRING,
        ingredients: DataTypes.STRING,
        portion_size: DataTypes.STRING,
        preparation_time: DataTypes.STRING,
        image: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Dish',
    });
    return Dish;
};