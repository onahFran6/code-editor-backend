"use strict";

const sampleSolutions = [
  {
    language: "javascript",
    code: `
      function twoSum(nums, target) {
        const map = new Map();
        for (let i = 0; i < nums.length; i++) {
          const complement = target - nums[i];
          if (map.has(complement)) {
            return [map.get(complement), i];
          }
          map.set(nums[i], i);
        }
        return [];
      }
    `,
    problemId: 1,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    language: "python",
    code: `
      def twoSum(nums, target):
        seen = {}
        for i, num in enumerate(nums):
          complement = target - num
          if complement in seen:
            return [seen[complement], i]
          seen[num] = i
        return []
    `,
    problemId: 1,
    userId: 2,
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
    await queryInterface.bulkInsert("solutions", sampleSolutions, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete("solutions", null, {});
  },
};
