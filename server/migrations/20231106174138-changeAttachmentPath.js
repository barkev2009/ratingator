'use strict';
const { DataTypes, STRING } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'attachments', 'path',
      { type: DataTypes.STRING(400), allowNull: false }
    )
  },

  async down(queryInterface, Sequelize) {
    queryInterface.changeColumn(
      'attachments', 'path',
      { type: DataTypes.STRING, allowNull: false }
    )
  }
};
