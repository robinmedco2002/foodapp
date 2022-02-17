"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Roles", [
            {
                name: "Super Admin",
                slug: "super-admin",
                is_active: false,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Chef",
                slug: "chef",
                is_active: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Delivery User",
                slug: "delivery-user",
                is_active: true,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "User",
                slug: "user",
                is_active: true,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        ]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Roles", null, {});
    }
};