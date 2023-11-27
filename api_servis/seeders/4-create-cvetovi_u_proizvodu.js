const { Proizvod, CvetUProizvodu } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {

      // Find Proizvod instances by their names using Sequelize methods
      const proizvod1 = await Proizvod.findOne({ where: { naziv: 'Midnight boquet' } });
      const proizvod2 = await Proizvod.findOne({ where: { naziv: 'I love you' } });
      const proizvod3 = await Proizvod.findOne({ where: { naziv: 'Warm summer day' } });

      const seedData = [
        {
          cvet_id: 7,
          proizvod_id: proizvod1.id,
          kolicina: 10
        },
        {
          cvet_id: 1,
          proizvod_id: proizvod2.id,
          kolicina: 12
        },
        {
          cvet_id: 5,
          proizvod_id: proizvod3.id,
          kolicina: 6
        },
        {
          cvet_id: 7,
          proizvod_id: proizvod3.id,
          kolicina: 2
        },
        {
          cvet_id: 6,
          proizvod_id: proizvod3.id,
          kolicina: 2
        },
      ];

      return queryInterface.bulkInsert('CvetUProizvodu', seedData);
    } catch (error) {
      console.error("Error seeding data:", error);
      throw error;
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await CvetUProizvodu.destroy({ where: {} });
    } catch (error) {
      console.error("Error deleting data:", error);
      throw error;
    }
  }
};
