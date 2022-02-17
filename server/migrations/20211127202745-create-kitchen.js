'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Kitchens', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            chef_id: {
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.STRING
            },
            main_category_id: {
                type: Sequelize.INTEGER
            },
            sub_category_id: {
                type: Sequelize.INTEGER
            },
            delivery_option: {
                type: Sequelize.STRING
            },
            open_time: {
                type: Sequelize.DATE
            },
            close_time: {
                type: Sequelize.DATE
            },
            address: {
                type: Sequelize.STRING
            },
            zip_code: {
                type: Sequelize.STRING
            },
            about: {
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.STRING
            },
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
        await queryInterface.dropTable('Kitchens');
    }
};