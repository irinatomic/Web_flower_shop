'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('StavkaNarudzbine', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kolicina: {
        type: Sequelize.INTEGER
      },
      jedinicna_cena: {
        type: Sequelize.INTEGER,
      },
      proizvod_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Proizvod',        // matches Proizvod table name
          key: 'id'
        }
      },
      narudzbina_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Narudzbina',        // matches Narudzbina table name
          key: 'id'
        }
      },
    });

    await queryInterface.addConstraint('StavkaNarudzbine', {    // for upsert
      type: 'unique',
      fields: ['proizvod_id', 'narudzbina_id'],
      name: 'unique_proizvod_narudzbina' 
    });

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('StavkaNarudzbine');
  }
};