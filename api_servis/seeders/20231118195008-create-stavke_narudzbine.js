'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('StavkaNarudzbine', [
      {
        proizvod_id: (await queryInterface.sequelize.query("SELECT id FROM Proizvod WHERE naziv = 'I love you'"))[0][0].id,
        narudzbina_id: (await queryInterface.sequelize.query("SELECT id FROM Narudzbina WHERE zakazano_vreme = '2023-10-05 18:30:00'"))[0][0].id,
        kolicina: 1,
        jedinicna_cena: 1440,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        proizvod_id: (await queryInterface.sequelize.query("SELECT id FROM Proizvod WHERE naziv = 'Warm summer day'"))[0][0].id,
        narudzbina_id: (await queryInterface.sequelize.query("SELECT id FROM Narudzbina WHERE zakazano_vreme = '2023-10-05 18:30:00'"))[0][0].id,
        kolicina: 1,
        jedinicna_cena: 1800,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        proizvod_id: (await queryInterface.sequelize.query("SELECT id FROM Proizvod WHERE naziv = 'Midnight boquet'"))[0][0].id,
        narudzbina_id: (await queryInterface.sequelize.query("SELECT id FROM Narudzbina WHERE zakazano_vreme = '2023-10-06 12:00:00'"))[0][0].id,
        kolicina: 1,
        jedinicna_cena: 1200,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        proizvod_id: (await queryInterface.sequelize.query("SELECT id FROM Proizvod WHERE naziv = 'I love you'"))[0][0].id,
        narudzbina_id: (await queryInterface.sequelize.query("SELECT id FROM Narudzbina WHERE zakazano_vreme = '2023-10-06 14:00:00'"))[0][0].id,
        kolicina: 1,
        jedinicna_cena: 1440,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StavkaNarudzbine', null, {});
  }
};
