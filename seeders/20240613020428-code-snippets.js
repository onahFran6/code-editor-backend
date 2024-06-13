'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('codeSnippets', [
      {
        problemId: 1,
        language: 'javascript',
        starterCode:
          'const twoSum = (nums, target) => {\n// start coding here\n};',
        codeExample:
          '// Example usage:\nconst nums1 = [2, 7, 11, 15];\nconst target1 = 9;\nconst result1 = twoSum(nums1, target1);\nconsole.log(result1); // Output: [0, 1]\nconsole.log(JSON.stringify(result1) === JSON.stringify([0, 1]) ? "First test case passed" : "First test case failed");\n\nconst nums2 = [3, 2, 4];\nconst target2 = 6;\nconst result2 = twoSum(nums2, target2);\nconsole.log(result2); // Output: [1, 2]\nconsole.log(JSON.stringify(result2) === JSON.stringify([1, 2]) ? "Second test case passed" : "Second test case failed");\n',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        problemId: 1,
        language: 'python',
        starterCode:
          'def two_sum(nums, target):\n    # start coding here\n    ',
        codeExample:
          '# Example usage:\nnums1 = [2, 7, 11, 15]\ntarget1 = 9\nresult1 = two_sum(nums1, target1)\nprint(result1)  # Output: [0, 1]\nprint("First test case passed" if result1 == [0, 1] else "First test case failed")\n\nnums2 = [3, 2, 4]\ntarget2 = 6\nresult2 = two_sum(nums2, target2)\nprint(result2)  # Output: [1, 2]\nprint("Second test case passed" if result2 == [1, 2] else "Second test case failed")\n',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        problemId: 1,
        language: 'go',
        starterCode:
          '\npackage main\nimport "fmt"\n\nfunc twoSum(nums []int, target int) []int {\n\t// start coding here\n}',
        codeExample:
          '// Example usage\nfunc main() {\n\tnums1 := []int{2, 7, 11, 15}\n\ttarget1 := 9\n\tresult1 := twoSum(nums1, target1)\n\tfmt.Println(result1) // Output: [0 1]\n\tif fmt.Sprintf("%v", result1) == "[0 1]" {\n\t\tfmt.Println("First test case passed")\n\t} else {\n\t\tfmt.Println("First test case failed")\n\t}\n\n\tnums2 := []int{3, 2, 4}\n\ttarget2 := 6\n\tresult2 := twoSum(nums2, target2)\n\tfmt.Println(result2) // Output: [1 2]\n\tif fmt.Sprintf("%v", result2) == "[1 2]" {\n\t\tfmt.Println("Second test case passed")\n\t} else {\n\t\tfmt.Println("Second test case failed")\n\t}\n}',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        problemId: 2,
        language: 'javascript',
        starterCode: 'const fizzBuzz = (n) => {\n// start coding here\n};',
        codeExample:
          '// Example usage:\n\
        const n1 = 3;\n\
        const result1 = fizzBuzz(n1);\n\
        console.log(result1); // Output: ["1", "2", "Fizz"]\n\
        console.log(JSON.stringify(result1) === JSON.stringify(["1", "2", "Fizz"]) ? "First test case passed" : "First test case failed");\n\
        \n\
        const n2 = 5;\n\
        const result2 = fizzBuzz(n2);\n\
        console.log(result2); // Output: ["1", "2", "Fizz", "4", "Buzz"]\n\
        console.log(JSON.stringify(result2) === JSON.stringify(["1", "2", "Fizz", "4", "Buzz"]) ? "Second test case passed" : "Second test case failed");\
        ',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        problemId: 2,
        language: 'python',
        starterCode: 'def fizz_buzz(n):\n    # start coding here \n    ',
        codeExample:
          '\
        # Example usage:\n\
        n1 = 3\n\
        result1 = fizz_buzz(n1)\n\
        print(result1)  # Output: ["1", "2", "Fizz"]\n\
        print("First test case passed" if result1 == ["1", "2", "Fizz"] else "First test case failed")\n\
        \n\
        n2 = 5\n\
        result2 = fizz_buzz(n2)\n\
        print(result2)  # Output: ["1", "2", "Fizz", "4", "Buzz"]\n\
        print("Second test case passed" if result2 == ["1", "2", "Fizz", "4", "Buzz"] else "Second test case failed")\
        ',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        problemId: 2,
        language: 'go',
        starterCode:
          '\npackage main\nimport "fmt"\n\nfunc fizzBuzz(n int) []string {\n\t// start coding here\n}',
        codeExample:
          '// Example usage\nfunc main() {\n\tn1 := 3\n\tresult1 := fizzBuzz(n1)\n\tfmt.Println(result1) // Output: [1 2 Fizz]\n\tif fmt.Sprintf("%v", result1) == "[1 2 Fizz]" {\n\t\tfmt.Println("First test case passed")\n\t} else {\n\t\tfmt.Println("First test case failed")\n\t}\n\n\tn2 := 5\n\tresult2 := fizzBuzz(n2)\n\tfmt.Println(result2) // Output: [1 2 Fizz 4 Buzz]\n\tif fmt.Sprintf("%v", result2) == "[1 2 Fizz 4 Buzz]" {\n\t\tfmt.Println("Second test case passed")\n\t} else {\n\t\tfmt.Println("Second test case failed")\n\t}\n}',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    // Add logic for any additional seed data here if needed

    return Promise.resolve();
  },

  down: async (queryInterface, Sequelize) => {
    // Remove the seeded data
    await queryInterface.bulkDelete('codeSnippets', null, {});
    return Promise.resolve();
  },
};
