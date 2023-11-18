'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Cvet', [
      {
        naziv: 'Crvene ruže',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        naziv: 'Roze ruže',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        naziv: 'Žute ruže',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        naziv: 'Orhideje',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        naziv: 'Karanfili',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        naziv: 'Ljiljani',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        naziv: 'Astromerija',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        naziv: 'Narcisi',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        naziv: 'Lale',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        naziv: 'Frezije',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        naziv: 'Zumbuli',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cvet', null, {});
  }
};
