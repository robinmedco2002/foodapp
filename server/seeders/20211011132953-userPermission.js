"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("UserPermissions", [{
            user_id: 1,
            permission_id: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
            {
                user_id: 1,
                permission_id: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                user_id: 1,
                permission_id: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                user_id: 1,
                permission_id: 4,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                user_id: 1,
                permission_id: 5,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                user_id: 1,
                permission_id: 5,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                user_id: 1,
                permission_id: 6,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                user_id: 1,
                permission_id: 7,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                user_id: 1,
                permission_id: 8,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                user_id: 1,
                permission_id: 9,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                user_id: 1,
                permission_id: 10,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                user_id: 1,
                permission_id: 11,
                createdAt: new Date(),
                updatedAt: new Date()
            }]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("UserPermissions", null, {});
    }
};