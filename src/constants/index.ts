import { ProblemTestCasesType } from '../types/index.type';

export const ProblemTestCases: ProblemTestCasesType = {
  1: [
    { input: '[2,7,11,15]\n9', expectedOutput: '[0,1]' },
    { input: '[3,2,4]\n6', expectedOutput: '[1,2]' },
  ],
  2: [
    { input: '["h","e","l","l","o"]', expectedOutput: '["o","l","l","e","h"]' },
    {
      input: '["H","a","n","n","a","h"]',
      expectedOutput: '["h","a","n","n","a","H"]',
    },
  ],
};