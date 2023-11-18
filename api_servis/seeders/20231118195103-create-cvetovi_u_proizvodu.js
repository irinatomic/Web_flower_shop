'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('CvetUProizvodu', [
      {
        cvet_id: 7,
        proizvod_id: (await queryInterface.sequelize.query("SELECT id FROM Proizvod WHERE naziv = 'Midnight boquet'"))[0][0].id,
        kolicina: 10,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cvet_id: 1,
        proizvod_id: (await queryInterface.sequelize.query("SELECT id FROM Proizvod WHERE naziv = 'I love you'"))[0][0].id,
        kolicina: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cvet_id: 5,
        proizvod_id: (await queryInterface.sequelize.query("SELECT id FROM Proizvod WHERE naziv = 'Warm summer day'"))[0][0].id,
        kolicina: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cvet_id: 7,
        proizvod_id: (await queryInterface.sequelize.query("SELECT id FROM Proizvod WHERE naziv = 'Warm summer day'"))[0][0].id,
        kolicina: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        cvet_id: 6,
        proizvod_id: (await queryInterface.sequelize.query("SELECT id FROM Proizvod WHERE naziv = 'Warm summer day'"))[0][0].id,
        kolicina: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('CvetUProizvodu', null, {});
  }
};
