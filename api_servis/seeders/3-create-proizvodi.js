'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Proizvod', [
      {
        naziv: 'Midnight boquet',
        opis: 'Midnight buket stvara tramnu i misterioznu atmosferu - 10 astromerija',
        cena: 1200,
        kategorija_id: 1
      },
      {
        naziv: 'I love you',
        opis: 'Savršen poklon za voljenu osobu (12 crvenih ruža)',
        cena: 1440,
        kategorija_id: 1
      },
      {
        naziv: 'Warm summer day',
        opis: 'Kada želite da osunčate Vaš dom (6 karanfila, 2 astromerije i 2 ljiljana).',
        cena: 1800,
        kategorija_id: 1
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Proizvod', null, {});
  }
};
