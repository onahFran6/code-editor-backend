import { Request, Response, NextFunction } from 'express';
import { registerUser, loginUser } from '../services/userService';
import { sendCustomResponse } from '../utils/customResponse';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const result = await registerUser({
      firstName,
      lastName,
      email,
      password,
    });
    sendCustomResponse({
      res,
      statusCode: 201,
      message: 'User registered successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const result = await loginUser({ email, password });
    res.json(result);
  } catch (error) {
    next(error);
  }
};
