'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('CvetUProizvodu', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      cvet_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Cvet',            // matches actual Cvet table name
          key: 'id'
        }
      },
      proizvod_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Proizvod',        // matches your Proizvod table name
          key: 'id'
        }
      },
      kolicina: {
        type: Sequelize.INTEGER
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CvetUProizvodu');
  }
};