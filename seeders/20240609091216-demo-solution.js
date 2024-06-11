'use strict';

const sampleSolutions = [
  {
    language: 'javascript',
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
    language: 'python',
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
  {
    language: 'javascript',
    code: `
      function fizzBuzz(n) {
        const answer = [];
        for (let i = 1; i <= n; i++) {
          if (i % 3 === 0 && i % 5 === 0) {
            answer.push("FizzBuzz");
          } else if (i % 3 === 0) {
            answer.push("Fizz");
          } else if (i % 5 === 0) {
            answer.push("Buzz");
          } else {
            answer.push(i.toString());
          }
        }
        return answer;
      }
    `,
    problemId: 2,
    userId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    language: 'python',
    code: `
      def fizzBuzz(n):
        answer = []
        for i in range(1, n + 1):
          if i % 3 == 0 and i % 5 == 0:
            answer.append("FizzBuzz")
          elif i % 3 == 0:
            answer.append("Fizz")
          elif i % 5 == 0:
            answer.append("Buzz")
          else:
            answer.append(str(i))
        return answer
    `,
    problemId: 2,
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
    await queryInterface.bulkInsert('solutions', sampleSolutions, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     */
    await queryInterface.bulkDelete('solutions', null, {});
  },
};
