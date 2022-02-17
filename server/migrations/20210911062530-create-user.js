"use strict";
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable("Users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            image: {type: Sequelize.STRING},
            name: {type: Sequelize.STRING},
            mobile: {type: Sequelize.STRING},
            email: {type: Sequelize.STRING},
            role_id: {type: Sequelize.INTEGER},
            zip_code: {type: Sequelize.STRING},
            state: {type: Sequelize.STRING},
            city: {type: Sequelize.STRING},
            address: {type: Sequelize.STRING},
            password: {type: Sequelize.STRING},
            is_active: {type: Sequelize.DataTypes.BOOLEAN},
            is_approve: {type: Sequelize.DataTypes.BOOLEAN},
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable("Users");
    }
};