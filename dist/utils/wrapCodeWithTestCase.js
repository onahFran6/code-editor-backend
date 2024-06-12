"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.wrapCodeWithTestCase = void 0;
const wrapCodeWithTestCase = (code, language, input, problemTitle) => {
    if (language === 'javascript') {
        if (problemTitle === 'Two Sum') {
            return `
          const input = \`${input}\`;
          const [nums, target] = input.split('\\n').map(JSON.parse);
          ${code}
          console.log(JSON.stringify(twoSum(nums, target)));
        `;
        }
        else if (problemTitle === 'Fizz Buzz') {
            return `
          const input = ${input};
          ${code}
          console.log(JSON.stringify(fizzBuzz(input)));
        `;
        }
    }
    else if (language === 'python') {
        if (problemTitle === 'Two Sum') {
            return `
  input = """${input}"""
  nums, target = map(eval, input.split('\\n'))
  ${code}
  print(twoSum(nums, target))
        `;
        }
        else if (problemTitle === 'Fizz Buzz') {
            return `
  input = ${input}
  ${code}
  import json
  print(json.dumps(fizzBuzz(input)))
        `;
        }
    }
    return code;
};
exports.wrapCodeWithTestCase = wrapCodeWithTestCase;
//# sourceMappingURL=wrapCodeWithTestCase.js.map