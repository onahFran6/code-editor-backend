'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('testcases', {
      fields: ['problemId'],
      type: 'foreign key',
      name: 'testcases_1',
      references: {
        table: 'problems',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('testcases', 'testcases_1');
  },
};
