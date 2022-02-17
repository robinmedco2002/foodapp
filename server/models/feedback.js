'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Feedback extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    };
    Feedback.init({
        type: DataTypes.STRING,
        name: DataTypes.STRING,
        email: DataTypes.STRING,
        mobile: DataTypes.STRING,
        subject: DataTypes.STRING,
        description: DataTypes.STRING,
        address: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'Feedback',
    });
    return Feedback;
};