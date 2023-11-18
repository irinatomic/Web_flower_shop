'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Kategorija', [
      {
        naziv: 'Buket',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        naziv: 'Aranžman',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Kategorija', null, {});
  }
};
