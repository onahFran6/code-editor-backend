"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Drop all tables
    const tables = await queryInterface.showAllTables();
    await Promise.all(tables.map((table) => queryInterface.dropTable(table)));
  },

  async down(queryInterface, Sequelize) {
    // This migration is irreversible
    throw new Error("This migration is irreversible");
  },
};
