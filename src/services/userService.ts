import User from '../models/userModel';
import { ValidationError, UnauthorizedError } from '../utils/customError';
import { generateAccessToken } from '../utils';
import { comparePassword, hashPassword } from '../utils/passwordUtil';

export const registerUser = async ({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  if (!firstName || !lastName || !email || !password) {
    throw new ValidationError(
      'First name, last name, email, and password are required.',
    );
  }

  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) {
    throw new ValidationError('Email already registered.');
  }

  const hashedPassword = await hashPassword({ password });
  const accessToken = generateAccessToken({ email });

  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hashedPassword,
    accessToken,
  });

  return { userId: user.id, accessToken };
};

export const loginUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  if (!email || !password) {
    throw new ValidationError('Email and password are required');
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const validPassword = await comparePassword({
    password,
    hashedPassword: user.password,
  });
  if (!validPassword) {
    throw new UnauthorizedError('Invalid email or password');
  }

  const accessToken = generateAccessToken({ email });

  return {
    token: accessToken,
    userId: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    role: user.role,
  };
};
