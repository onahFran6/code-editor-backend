import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/customError';
import logger from '../utils/logger';

export const customErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (err instanceof CustomError) {
    logger.error(
      `${err.statusCode} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
    );
    return res.status(err.statusCode).json({ message: err.message });
  }

  logger.error(
    `500 - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`,
  );
  console.error(err.stack);

  res.status(500).json({
    message: 'Something went wrong',
  });
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const err = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(err);
};
