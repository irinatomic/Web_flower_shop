'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Narudzbina', [
      {
        zakazano_vreme: '2023-10-05 18:30:00',
        status_narudzbine: 'Nova',
        adresa: 'Kralja Milana 12/2',
        telefon: '0641234567',
        email: 'ime_prezime',
        ime_prezime: 'ime_prezime'
      },
      {
        zakazano_vreme: '2023-10-06 12:00:00',
        status_narudzbine: 'Prihvaćena',
        adresa: 'Knez Mihailova 6/6',
        telefon: '0641234567',
        email: 'ime_prezime',
        ime_prezime: 'ime_prezime'
      },
      {
        zakazano_vreme: '2023-10-06 14:00:00',
        status_narudzbine: 'Prihvaćena',
        adresa: 'Milutina Milankovića 17',
        telefon: '0641234567',
        email: 'ime_prezime',
        ime_prezime: 'ime_prezime'
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Narudzbina', null, {});
  }
};
