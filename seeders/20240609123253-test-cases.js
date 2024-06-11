// testCasesSeeder.js

'use strict';

const { TestCase } = require('../models');

const testCases = [
  {
    input: '[2,7,11,15]\n9',
    output: '[0,1]',
    problemId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    input: '[3,2,4]\n6',
    output: '[1,2]',
    problemId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    input: '3',
    output: '["1","2","Fizz"]',
    problemId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    input: '5',
    output: '["1","2","Fizz","4","Buzz"]',
    problemId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('testCases', testCases, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('testCases', null, {});
  },
};
