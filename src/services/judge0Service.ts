import axios, { AxiosRequestConfig } from 'axios';

const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com/submissions';
const JUDGE0_API_KEY = 'bd526631fcmsh14b210f86f7dc59p1d123ajsn0e7c4e3b8a39';

const JUDGE0_API_HEADERS = {
  headers: {
    'content-type': 'application/json',
    'X-RapidAPI-Key': JUDGE0_API_KEY,
    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
  },
};

interface SubmissionResult {
  stdout: string;
  stderr: string;
  status: { id: number; description: string };
}

interface TestCase {
  input: string;
  expectedOutput: string;
}

interface ProblemTestCases {
  [problemId: number]: TestCase[];
}

const ProblemTestCases: ProblemTestCases = {
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

const checkStatus = async (
  token: string,
  testCase: TestCase,
): Promise<{ status: string; output: string }> => {
  const options: AxiosRequestConfig = {
    method: 'GET',
    url: `${JUDGE0_API_URL}/${token}`,
    params: { base64_encoded: 'true', fields: '*' },
    headers: JUDGE0_API_HEADERS.headers,
  };

  try {
    const resultResponse = await axios.request(options);
    const { stdout, stderr, status } = resultResponse.data;

    if (status.id === 1 || status.id === 2) {
      // Still processing
      await new Promise((resolve) => setTimeout(resolve, 2000));
      return await checkStatus(token, testCase);
    } else {
      // Processed - we have a result
      if (status.id === 3 && !stderr) {
        const decodedOutput = Buffer.from(stdout, 'base64').toString('utf-8');
        if (decodedOutput.trim() !== testCase.expectedOutput.trim()) {
          return {
            status: 'fail',
            output: `Expected ${testCase.expectedOutput}, but got ${decodedOutput}`,
          };
        }
      } else {
        const decodedError = Buffer.from(stderr, 'base64').toString('utf-8');
        return { status: 'fail', output: decodedError || 'Compilation Error' };
      }
    }
  } catch (err) {
    console.error('Error checking submission status:', err);
    return { status: 'fail', output: 'An error occurred' };
  }

  return { status: 'success', output: 'Test case passed' };
};

export const submitCode = async (
  code: string,
  language: string,
  problemId: number,
): Promise<{ status: string; output: string }> => {
  const languageId = getLanguageId(language);
  const testCases = ProblemTestCases[problemId] || [];

  for (const testCase of testCases) {
    const wrappedCode = wrapCodeWithTestCase(code, language, testCase.input);
    try {
      const response = await axios.post(
        JUDGE0_API_URL,
        { source_code: wrappedCode, language_id: languageId },
        JUDGE0_API_HEADERS,
      );
      const { token } = response.data;
      const result = await checkStatus(token, testCase);
      if (result.status === 'fail') {
        return result;
      }
    } catch (err) {
      console.error('Error submitting code:', err);
      return { status: 'fail', output: 'An error occurred' };
    }
  }

  return { status: 'success', output: 'All test cases passed!' };
};

const wrapCodeWithTestCase = (
  code: string,
  language: string,
  input: string,
): string => {
  if (language === 'javascript') {
    return `
      const input = \`${input}\`;
      const [nums, target] = input.split('\\n').map(JSON.parse);
      ${code}
      console.log(JSON.stringify(twoSum(nums, target)));
    `;
  } else if (language === 'python') {
    return `
input = """${input}"""
nums, target = map(eval, input.split('\\n'))
${code}
print(twoSum(nums, target))
    `;
  }
  // Add more languages as needed
  return code;
};
const getLanguageId = (language: string): number => {
  // Map language names to Judge0 language IDs
  const languageMap: { [key: string]: number } = {
    javascript: 63,
    python: 71,
    java: 62,
  };

  return languageMap[language.toLowerCase()] || 63; // Default to JavaScript
};
