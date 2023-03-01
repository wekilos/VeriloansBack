'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Loans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING
      },
      discount: {
        type: Sequelize.FLOAT
      },
      total: {
        type: Sequelize.FLOAT
      },
      amount_price: {
        type: Sequelize.FLOAT
      },
      amount_price_month: {
        type: Sequelize.FLOAT
      },
      credit_month: {
        type: Sequelize.INTEGER
      },
      check_numbers: {
        type: Sequelize.TEXT
      },
      check_numbers_price: {
        type: Sequelize.TEXT
      },
      is_draft: {
        type: Sequelize.BOOLEAN
      },
      is_closed: {
        type: Sequelize.BOOLEAN
      },
      StoreId: {
        type: Sequelize.INTEGER
      },
      EmployeeId: {
        type: Sequelize.INTEGER
      },
      CustumerId: {
        type: Sequelize.INTEGER
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      deleted: {
        type: Sequelize.BOOLEAN
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Loans');
  }
};