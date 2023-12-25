'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    try {
      const seedData = [
        {
            username: 'admin',
            password: 'admin',
            admin: true,
            email: 'admin@example.com'
        },
        {
          username: 'username_one',
          password: 'password',
          admin: false,
          email: 'username_one@example.com',
        },
        {
          username: 'username_two',
          password: 'password',
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
