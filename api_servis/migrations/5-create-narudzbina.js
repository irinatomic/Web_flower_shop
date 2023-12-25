'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Narudzbina', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      zakazano_vreme: {
        type: Sequelize.DATE,
        allowNull: false
      },
      status_narudzbine: {
        type: Sequelize.STRING,
        allowNull: false
      },
      adresa: {
        type: Sequelize.STRING,
        allowNull: false
      },
      telefon: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      ime_prezime: {
        type: Sequelize.STRING,
        allowNull: false
      },
      korisnik_id: { 
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Korisnik', 
          key: 'id' 
        },
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Narudzbina');
  }
};
