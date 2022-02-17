"use strict";

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Users", [{
            name: "Admin",
            mobile: "9999999999",
            email: "admin@gmail.com",
            password: "$2b$04$iGAH4rQqbMJXGdPYBv5qiu1H9Y2OjD9nNlSjomLS/nq0EtyfJxVS.",
            role_id: "1",
            is_active: true,
            is_approve: true,
            createdAt: new Date(),
            updatedAt: new Date()
        }]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Users", null, {});
    }
};