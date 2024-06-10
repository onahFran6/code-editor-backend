import { Request, Response, NextFunction } from 'express';
import { Attempt, Solution } from '../models';
import { submitCode } from '../services/judge0Service';
import {
  getAttemptByIdService,
  getAttemptsByProblemIdService,
} from '../services/attemptsService';

export const createAttempt = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { problemId, code, language } = req.body;

    const userId = req.user?.id;
    const result = await submitCode(code, language, problemId);
    const status = result.status === 'success' ? 'success' : 'fail';

    const attempt = await Attempt.create({
      userId: userId as number,
      problemId: problemId,
      code,
      language,
      output: result.output,
      status,
    });

    if (status === 'success') {
      // Create a new solution if the attempt is successful
      await Solution.create({
        language,
        code,
        userId: userId as number,
        problemId: problemId as number,
      });
    }

    res.status(201).json({
      message: 'Attempt submitted',
      attemptId: attempt.id,
      status,
      output: result.output,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserAttempts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const problemId = parseInt(req.params.problemId, 10);
    const attempts = await Attempt.findAll({
      where: { userId: req.user?.id, problemId: problemId },
      order: [['createdAt', 'DESC']],
    });
    res.json(attempts);
  } catch (error) {
    next(error);
  }
};

export const getAttemptById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const attemptId = parseInt(req.params.id, 10);
    const attempt = await getAttemptByIdService({ attemptId });
    res.json(attempt);
  } catch (error) {
    next(error);
  }
};

export const getAttemptsByProblemId = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const problemId = parseInt(req.params.problemId, 10);
    const attempts = await getAttemptsByProblemIdService({
      problemId,
      userId: req.user?.id,
    });
    res.json(attempts);
  } catch (error) {
    next(error);
  }
};
