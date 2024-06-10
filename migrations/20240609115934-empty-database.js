"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tables = await queryInterface.showAllTables();
    await Promise.all(
      tables.map((table) => queryInterface.bulkDelete(table, null, {}))
    );
  },

  down: async (queryInterface, Sequelize) => {
    // This is an irreversible operation
    // You may add a message to inform that this migration is not reversible
    throw new Error("This migration is irreversible");
  },
};
