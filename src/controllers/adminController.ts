import { Request, Response, NextFunction } from 'express';
import {
  getUsers,
  getUserById,
  getUserStats,
  getUserAttemptDetails,
  getUsersWithStats,
} from '../services/userService';
import { sendCustomResponse } from '../utils/customResponse';

export const getUsersController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const usersWithStats = await getUsersWithStats();
    sendCustomResponse({
      res,
      statusCode: 200,
      message: 'Users retrieved successfully',
      data: usersWithStats,
    });
  } catch (error) {
    next(error);
  }
};

export const getUserStatsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const user = await getUserById(userId);

    if (!user) {
      return sendCustomResponse({
        res,
        statusCode: 404,
        message: 'User not found',
      });
    }

    const stats = await getUserStats(userId);

    sendCustomResponse({
      res,
      statusCode: 200,
      message: 'User stats retrieved successfully',
      data: { user, stats },
    });
  } catch (error) {
    next(error);
  }
};

export const getUserAttemptDetailsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const user = await getUserById(userId);

    if (!user) {
      return sendCustomResponse({
        res,
        statusCode: 404,
        message: 'User not found',
      });
    }

    const attempts = await getUserAttemptDetails(userId);

    sendCustomResponse({
      res,
      statusCode: 200,
      message: 'User attempt details retrieved successfully',
      data: { user, attempts },
    });
  } catch (error) {
    next(error);
  }
};
