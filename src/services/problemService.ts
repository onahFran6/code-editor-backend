import { Attempt, Problem, TestCase, User } from '../models';
import Solution from '../models/solutionModel';

export const getAllProblems = async ({ userId }: { userId?: number }) => {
  const problems = await Problem.findAll({
    attributes: ['id', 'title', 'description', 'difficulty'],
  });

  if (userId) {
    const userAttempts = await Attempt.findAll({
      where: { userId },
      attributes: ['problemId', 'status'],
    });

    const problemsWithStatus = problems.map((problem) => {
      const attemptStatus = userAttempts.find(
        (attempt) => attempt.problemId === problem.id,
      )?.status;
      return {
        ...problem.toJSON(),
        status: attemptStatus || '',
      };
    });

    return problemsWithStatus;
  }

  return problems.map((problem) => ({
    ...problem.toJSON(),
    status: '',
  }));
};

export const getProblemById = async ({
  problemId,
  userId,
}: {
  problemId: number;
  userId?: number;
}) => {
  const problem = await Problem.findByPk(problemId);
  if (!problem) {
    return null;
  }

  if (userId) {
    const attempt = await Attempt.findOne({
      where: { userId, problemId },
      attributes: ['status'],
    });

    return {
      ...problem.toJSON(),
      status: attempt?.status || '',
    };
  }

  return {
    ...problem.toJSON(),
    status: '',
  };
};

export const getProblemWithTestsById = async ({
  problemId,
  userId,
}: {
  problemId: number;
  userId?: number;
}) => {
  const problem = await Problem.findOne({
    where: { id: problemId, status: 'Published' },
    attributes: ['id', 'title', 'description', 'difficulty'],
    include: [
      {
        model: Solution,
        as: 'solutions',
        attributes: ['id', 'language', 'code'],
        include: [
          {
            model: User,
            as: 'user',
            attributes: ['firstName', 'lastName', 'email'],
          },
        ],
      },
      {
        model: TestCase,
        as: 'testCases',
        attributes: ['id', 'input', 'output'],
      },
    ],
  });

  if (!problem) {
    return null;
  }

  if (userId) {
    const attempt = await Attempt.findOne({
      where: { userId, problemId },
      attributes: ['status'],
    });

    return {
      ...problem.toJSON(),
      status: attempt?.status || '',
    };
  }

  return {
    ...problem.toJSON(),
    status: '',
  };
};
