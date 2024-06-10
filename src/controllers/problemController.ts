import { Request, Response, NextFunction } from 'express';
import { sendCustomResponse } from '../utils/customResponse';
import * as problemService from '../services/problemService';

export const getProblems = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = req.user?.id;
    const problems = await problemService.getAllProblems({ userId });

    sendCustomResponse({
      res,
      statusCode: 200,
      message: 'Problems retrieved successfully',
      data: problems,
    });
  } catch (error) {
    next(error);
  }
};

export const getProblem = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const problemId = parseInt(req.params.id, 10);
    const userId = req.user?.id;
    const problem = await problemService.getProblemById({ problemId, userId });

    if (!problem) {
      return sendCustomResponse({
        res,
        statusCode: 404,
        message: 'Problem not found',
      });
    }

    sendCustomResponse({
      res,
      statusCode: 200,
      message: 'Problem retrieved successfully',
      data: problem,
    });
  } catch (error) {
    next(error);
  }
};

export const getProblemWithTests = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const problemId = parseInt(req.params.id, 10);
    const userId = req.user?.id;
    const problem = await problemService.getProblemWithTestsById({
      problemId,
      userId,
    });

    if (!problem) {
      return sendCustomResponse({
        res,
        statusCode: 404,
        message: 'Problem not found',
      });
    }

    sendCustomResponse({
      res,
      statusCode: 200,
      message: 'Problem retrieved successfully',
      data: problem,
    });
  } catch (error) {
    next(error);
  }
};
