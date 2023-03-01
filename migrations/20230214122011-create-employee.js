"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("Employees", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            password: {
                type: Sequelize.STRING,
            },
            username: {
                type: Sequelize.STRING,
            },
            firstname: {
                type: Sequelize.STRING,
            },
            phone: {
                type: Sequelize.BIGINT,
            },
            active: {
                type: Sequelize.BOOLEAN,
                defaultValue: true,
            },
            deleted: {
                type: Sequelize.BOOLEAN,
                defaultValue: false,
            },
            EmployeeStatusId: {
                type: Sequelize.INTEGER,
            },
            StoreId: {
                type: Sequelize.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("Employees");
    },
};
