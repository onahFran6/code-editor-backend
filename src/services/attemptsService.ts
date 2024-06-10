import { Attempt, Problem, User } from '../models';

export const getAttemptByIdService = async ({
  attemptId,
  userId,
}: {
  attemptId: number;
  userId?: number;
}): Promise<any> => {
  const attempt = await Attempt.findByPk(attemptId, {
    attributes: ['id', 'code', 'status', 'output', 'createdAt', 'language'],
    include: [
      {
        model: Problem,
        as: 'problem',
        attributes: ['id', 'title', 'description', 'difficulty'],
      },
      {
        model: User,
        as: 'user',
        attributes: ['id', 'firstName', 'lastName', 'email'],
      },
    ],
  });

  if (!attempt) {
    return null;
  }

  return {
    ...attempt.toJSON(),
  };
};

export const getAttemptsByProblemIdService = async ({
  problemId,
  userId,
}: {
  problemId: number;
  userId?: number;
}): Promise<any[]> => {
  const attempts = await Attempt.findAll({
    where: { problemId },
    attributes: ['id', 'code', 'status', 'output', 'createdAt', 'language'],
    include: [
      {
        model: Problem,
        as: 'problem',
        attributes: ['id', 'title', 'description', 'difficulty'],
      },
      {
        model: User,
        as: 'user',
        attributes: ['id', 'firstName', 'lastName', 'email'],
      },
    ],
    order: [['createdAt', 'DESC']],
  });

  return attempts.map((attempt) => ({
    ...attempt.toJSON(),
  }));
};
