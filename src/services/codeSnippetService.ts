// src/services/codeSnippetService.ts

import CodeSnippet from '../models/codeSnippetModel';

interface CodeSnippetInput {
  problemId: number;
  language: string;
  starterCode: string;
  codeExample: string;
}

export const createCodeSnippet = async ({
  problemId,
  language,
  starterCode,
  codeExample,
}: CodeSnippetInput) => {
  const newCodeSnippet = await CodeSnippet.create({
    problemId,
    language,
    starterCode,
    codeExample,
  });
  return newCodeSnippet;
};
