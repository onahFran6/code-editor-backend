"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitCode = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("../config"));
const models_1 = require("../models");
const JUDGE0_API_URL = 'https://judge0-ce.p.rapidapi.com/submissions';
const JUDGE0_API_HEADERS = {
    headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': config_1.default.JUDGE0_API_KEY,
        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
    },
};
const submitCode = (code, language, problemId) => __awaiter(void 0, void 0, void 0, function* () {
    const languageId = getLanguageId(language);
    const problemTestCases = yield models_1.TestCase.findAll({
        where: { problemId },
        attributes: ['input', 'output'],
    });
    const problem = yield models_1.Problem.findByPk(problemId);
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
        const wrappedCode = wrapCodeWithTestCase(code, language, testCase.input, problem.title);
        const response = yield axios_1.default.post(JUDGE0_API_URL, { source_code: wrappedCode, language_id: languageId }, JUDGE0_API_HEADERS);
        const { token } = response.data;
        const resultResponse = yield axios_1.default.get(`${JUDGE0_API_URL}/${token}`, JUDGE0_API_HEADERS);
        const { stdout, stderr, status, expectedOutput, compile_output } = resultResponse.data;
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
});
exports.submitCode = submitCode;
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
const getLanguageId = (language) => {
    // Map language names to Judge0 language IDs
    const languageMap = {
        javascript: 63,
        python: 71,
        // Add more languages as needed
    };
    return languageMap[language.toLowerCase()] || 63; // Default to JavaScript
};
//# sourceMappingURL=judge0Service.js.map