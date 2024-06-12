import axios from 'axios';
import config from '../config';
import { Problem, TestCase } from '../models';

const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com/submissions';

const JUDGE0_API_HEADERS = {
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': config.JUDGE0_API_KEY,
    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
  },
};

export const submitCode = async (
  code: string,
  language: string,
  problemId: number,
): Promise<{ status: string; output: string }> => {
  const languageId = getLanguageId(language);

  const problemTestCases = await TestCase.findAll({
    where: { problemId },
    attributes: ['input', 'output'],
  });

  const problem: Problem | null = await Problem.findByPk(problemId);

  if (problem === null) {
    throw new Error(`Problem with ID ${problemId} not found.`);
  }

  if (problemTestCases.length === 0) {
    return {
      status: 'fail',
      output: 'No test cases found for the given problem',
    };
  }

  for (const testCase of problemTestCases) {
    const wrappedCode = wrapCodeWithTestCase(
      code,
      language,
      testCase.input,
      problem.title,
    );
    const response = await axios.post(
      JUDGE0_API_URL,
      { source_code: wrappedCode, language_id: languageId },
      JUDGE0_API_HEADERS,
    );

    const { token } = response.data;
    const resultResponse = await axios.get(
      `${JUDGE0_API_URL}/${token}`,
      JUDGE0_API_HEADERS,
    );
    const { stdout, stderr, status, expectedOutput, compile_output } =
      resultResponse.data;

    if (status.id !== 3 || stderr) {
      return { status: 'fail', output: stderr || 'Compilation Error' };
    }
    if (stdout.replace(/\s+/g, '') !== testCase.output.replace(/\s+/g, '')) {
      const fomattedStdOut = stdout.replace(/\s+/g, '');
      return {
        status: 'fail',
        output: `Expected ${testCase.output}, but got ${fomattedStdOut}`,
      };
    }
  }

  return { status: 'success', output: 'All test cases passed!' };
};

const wrapCodeWithTestCase = (
  code: string,
  language: string,
  input: string,
  problemTitle: string,
): string => {
  if (language === 'javascript') {
    if (problemTitle === 'Two Sum') {
      return `
        const input = \`${input}\`;
        const [nums, target] = input.split('\\n').map(JSON.parse);
        ${code}
        console.log(JSON.stringify(twoSum(nums, target)));
      `;
    } else if (problemTitle === 'Fizz Buzz') {
      return `
        const input = ${input};
        ${code}
        console.log(JSON.stringify(fizzBuzz(input)));
      `;
    }
  } else if (language === 'python') {
    if (problemTitle === 'Two Sum') {
      return `
input = """${input}"""
nums, target = map(eval, input.split('\\n'))
${code}
print(twoSum(nums, target))
      `;
    } else if (problemTitle === 'Fizz Buzz') {
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

const getLanguageId = (language: string): number => {
  // Map language names to Judge0 language IDs
  const languageMap: { [key: string]: number } = {
    javascript: 63,
    python: 71,
    // Add more languages as needed
  };

  return languageMap[language.toLowerCase()] || 63; // Default to JavaScript
};
