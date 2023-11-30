'use strict';

const { Proizvod, Narudzbina, StavkaNarudzbine } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {

      // Find query results using Sequelize methods
      const proizvod1 = await Proizvod.findOne({ where: { naziv: 'I love you' } });
      const proizvod2 = await Proizvod.findOne({ where: { naziv: 'Warm summer day' } });
      const proizvod3 = await Proizvod.findOne({ where: { naziv: 'Midnight boquet' } });
      const narudzbina1 = await Narudzbina.findOne({ where: { adresa: 'Kralja Milana 12/2' } });
      const narudzbina2 = await Narudzbina.findOne({ where: { adresa: 'Knez Mihailova 6/6' } });
      const narudzbina3 = await Narudzbina.findOne({ where: { adresa: 'Milutina Milankovića 17' } });

      const seedData = [
        {
          proizvod_id: proizvod1.id,
          narudzbina_id: narudzbina1.id,
          kolicina: 1,
          jedinicna_cena: 1440
        },
        {
          proizvod_id: proizvod2.id,
          narudzbina_id: narudzbina1.id,
          kolicina: 1,
          jedinicna_cena: 1800
        },
        {
          proizvod_id: proizvod3.id,
          narudzbina_id: narudzbina2.id,
          kolicina: 1,
          jedinicna_cena: 1200
        },
        {
          proizvod_id: proizvod1.id,
          narudzbina_id: narudzbina3.id,
          kolicina: 1,
          jedinicna_cena: 1440
        },
      ];

      return queryInterface.bulkInsert('StavkaNarudzbine', seedData);
    } catch (error) {
      console.error("Error seeding data:", error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('StavkaNarudzbine', null, {});
  }
};
