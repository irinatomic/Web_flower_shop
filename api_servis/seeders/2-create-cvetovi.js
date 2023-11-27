'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Cvet', [
      { naziv: 'Crvene ruže' }, 
      { naziv: 'Roze ruže' }, 
      { naziv: 'Žute ruže' },
      { naziv: 'Orhideje' }, 
      { naziv: 'Karanfili' }, 
      { naziv: 'Ljiljani' },
      { naziv: 'Astromerija' }, 
      { naziv: 'Narcisi' }, 
      { naziv: 'Lale' },
      { naziv: 'Frezije' }, 
      { naziv: 'Zumbuli' }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cvet', null, {});
  }
};