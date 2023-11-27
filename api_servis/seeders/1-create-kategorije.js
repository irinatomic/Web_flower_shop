'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Kategorija', [
      {
        naziv: 'Buket'
      },
      {
        naziv: 'Aranžman'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Kategorija', null, {});
  }
};
