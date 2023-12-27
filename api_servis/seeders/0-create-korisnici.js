'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    try {
      const seedData = [
        {
          username: 'admin',
          password: bcrypt.hashSync("admin", 10),
          admin: true,
          email: 'admin@example.com'
        },
        {
          username: 'username_one',
          password: bcrypt.hashSync("password", 10),
          admin: false,
          email: 'username_one@example.com',
        },
        {
          username: 'username_two',
          password: bcrypt.hashSync("password", 10),
          admin: false,
          email: 'username_two@example.com',
        },
      ];

      await queryInterface.bulkInsert('Korisnik', seedData, {});
    } catch (error) {
      console.error('Error seeding Korisnik:', error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    try {
      await queryInterface.bulkDelete('Korisnik', null, {});
    } catch (error) {
      console.error('Error removing Korisnik seeds:', error);
    }
  }
};
