"use strict";

const sampleProblems = [
  {
    title: "Two Sum",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    difficulty: "Easy",
    status: "Published",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    title: "Reverse String",
    description:
      "Write a function that reverses a string. The input string is given as an array of characters s.",
    difficulty: "Easy",
    status: "Published",
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
    await queryInterface.bulkInsert("Problems", sampleProblems, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete("Problems", null, {});
  },
};
