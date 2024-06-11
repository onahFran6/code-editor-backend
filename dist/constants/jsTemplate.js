"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsTemplates = {
    'Two Sum': `
  const input = \`{{input}}\`;
  const [nums, target] = input.split('\\n').map(JSON.parse);
  {{code}}
  console.log(JSON.stringify(twoSum(nums, target)));
    `,
    'Reverse String': `
  const input = \`{{input}}\`.trim().split('');
  {{code}}
  reverseString(input);
  console.log(JSON.stringify(input));
    `,
};
exports.default = jsTemplates;
//# sourceMappingURL=jsTemplate.js.map