// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UnauthorizedError } from '../utils/customError';
import { sendCustomResponse } from '../utils/customResponse';
import User from '../models/userModel';

declare module 'express' {
  interface Request {
    user?: { id: number; role: string };
  }
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  const authHeader = req.headers.authorization;
  const accessToken = authHeader && authHeader.split(' ')[1];

  if (!accessToken) {
    return sendCustomResponse({
      res,
      statusCode: 401,
      message: 'Missing authentication token',
    });
  }

  try {
    const decoded = await verifyToken(accessToken);
    const user = await User.findOne({ where: { email: decoded.email } });

    if (!user) {
      return sendCustomResponse({
        res,
        statusCode: 401,
        message: 'Invalid Credentials',
      });
    }

    req.user = { id: user.id, role: user.role };
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return sendCustomResponse({
        res,
        statusCode: 401,
        message: 'Invalid access token',
      });
    }

    return sendCustomResponse({
      res,
      statusCode: 500,
      message: 'Internal Server Error',
    });
  }
};

const verifyToken = (token: string): Promise<JwtPayload> => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET as string, (err, payload) => {
      if (err) {
        reject(err);
      } else {
        resolve(payload as JwtPayload);
      }
    });
  });
};

export const authorize = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      return sendCustomResponse({
        res,
        statusCode: 403,
        message: 'Forbidden',
      });
    }
    next();
  };
};
