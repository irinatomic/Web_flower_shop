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
          model: 'Cvet',            // matches Cvet table name
          key: 'id'
        }
      },
      proizvod_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Proizvod',        // matches Proizvod table name
          key: 'id'
        }
      },
      kolicina: {
        type: Sequelize.INTEGER
      }
    });

    await queryInterface.addConstraint('CvetUProizvodu', {    // for upsert
      type: 'unique',
      fields: ['cvet_id', 'proizvod_id'],
      name: 'unique_cvet_proizvod' 
    });

  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('CvetUProizvodu');
  }
};