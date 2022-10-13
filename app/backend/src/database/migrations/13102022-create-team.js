'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('teams', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
     teamName: {
        allowNull: false,
        type: Sequelize.STRING(50),
        field: 'team_name',
      },
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('teams');
  }
};