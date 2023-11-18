'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Proizvod', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      naziv: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      opis: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      cena: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      kategorija_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Kategorija',
          key: 'id'
        }
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Proizvod');
  }
};
