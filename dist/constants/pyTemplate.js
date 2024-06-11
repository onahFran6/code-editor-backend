"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pythonTemplates = {
    'Two Sum': `
  input = """"{{input}}""""
  nums, target = map(eval, input.split('\\n'))
  {{code}}
  print(twoSum(nums, target))
  `,
    'Reverse String': `
  input = """{{input}}""".strip().split()
  {{code}}
  reverseString(input)
  print(input)
  `,
};
exports.default = pythonTemplates;
//# sourceMappingURL=pyTemplate.js.map