'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Empty the user table
    await queryInterface.bulkDelete('users', null, {});
  },

  async down(queryInterface, Sequelize) {
    // No need to define a down function for emptying data
    // If needed, you can add a down function to revert the changes made in the up function
  },
};
