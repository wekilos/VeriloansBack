'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Custumers', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      patronymic: {
        type: Sequelize.STRING
      },
      passport_id: {
        type: Sequelize.STRING
      },
      passport_created_date: {
        type: Sequelize.DATE
      },
      birthday: {
        type: Sequelize.DATE
      },
      age: {
        type: Sequelize.INTEGER
      },
      country: {
        type: Sequelize.STRING
      },
      limit: {
        type: Sequelize.INTEGER
      },
      type: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.BIGINT
      },
      phone2: {
        type: Sequelize.BIGINT
      },
      phone3: {
        type: Sequelize.BIGINT
      },
      notes: {
        type: Sequelize.TEXT
      },
      file: {
        type: Sequelize.STRING
      },
      file2: {
        type: Sequelize.STRING
      },
      file3: {
        type: Sequelize.STRING
      },
      in_blacklist: {
        type: Sequelize.BOOLEAN
      },
      registration: {
        type: Sequelize.TEXT
      },
      registration2: {
        type: Sequelize.TEXT
      },
      work_place: {
        type: Sequelize.TEXT
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
    await queryInterface.dropTable('Custumers');
  }
};