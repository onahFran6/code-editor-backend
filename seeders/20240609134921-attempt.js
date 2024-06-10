"use strict";

const sampleAttempts = [
  {
    code: "function twoSum(nums, target) { ... }",
    language: "javascript",
    status: "success",
    output: "[0, 1]",
    userId: 1,
    problemId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    code: "function reverseString(s) { ... }",
    language: "javascript",
    status: "fail",
    output: "Invalid input",
    userId: 2,
    problemId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    code: "def twoSum(nums, target): ...",
    language: "python",
    status: "success",
    output: "[1, 2]",
    userId: 1,
    problemId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    code: "def reverseString(s): ...",
    language: "python",
    status: "success",
    output: "['o', 'l', 'l', 'e', 'h']",
    userId: 2,
    problemId: 2,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     */
    await queryInterface.bulkInsert("Attempts", sampleAttempts, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete("Attempts", null, {});
  },
};
