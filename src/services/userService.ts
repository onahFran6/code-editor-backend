import User from '../models/userModel';
import { ValidationError, UnauthorizedError } from '../utils/customError';
import { generateAccessToken } from '../utils';
import { comparePassword, hashPassword } from '../utils/passwordUtil';
import { Attempt, Problem } from '../models';

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

export const getUsers = async () => {
  const users = await User.findAll({
    attributes: ['id', 'firstName', 'lastName', 'email', 'role'],
  });
  return users;
};

export const getUsersWithStatsOld = async () => {
  const users = await User.findAll({
    attributes: ['id', 'firstName', 'lastName', 'email', 'role'],
  });

  const userStatsPromises = users.map(async (user) => {
    const attempts = await Attempt.findAll({
      where: { userId: user.id },
      attributes: ['status'],
    });

    const totalAttempts = attempts.length;
    const successfulAttempts = attempts.filter(
      (attempt) => attempt.status === 'success',
    ).length;
    const failedAttempts = attempts.filter(
      (attempt) => attempt.status === 'fail',
    ).length;

    return {
      ...user.toJSON(),
      totalAttempts,
      successfulAttempts,
      failedAttempts,
    };
  });

  const usersWithStats = await Promise.all(userStatsPromises);
  return usersWithStats;
};

export const getUsersWithStats = async () => {
  const users = await User.findAll({
    where: { role: 'user' },
    attributes: ['id', 'firstName', 'lastName', 'email', 'role'],
    raw: true,
  });

  const userIds = users.map((user) => user.id);

  const attempts = await Attempt.findAll({
    where: { userId: userIds },
    attributes: ['userId', 'status'],
    raw: true,
  });

  const userStats = users.map((user) => {
    const userAttempts = attempts.filter(
      (attempt) => attempt.userId === user.id,
    );
    const totalAttempts = userAttempts.length;
    const successfulAttempts = userAttempts.filter(
      (attempt) => attempt.status === 'success',
    ).length;
    const failedAttempts = userAttempts.filter(
      (attempt) => attempt.status === 'fail',
    ).length;

    return {
      ...user,
      totalAttempts,
      successfulAttempts,
      failedAttempts,
    };
  });

  return userStats;
};

export const getUserById = async (userId: number) => {
  const user = await User.findByPk(userId, {
    attributes: ['id', 'firstName', 'lastName', 'email', 'profilePicture'],
  });
  return user;
};

export const getUserStats = async (userId: number) => {
  const attempts = await Attempt.findAll({
    where: { userId },
    attributes: ['id', 'status'],
  });

  const totalAttempts = attempts.length;
  const successfulAttempts = attempts.filter(
    (attempt) => attempt.status === 'success',
  ).length;
  const failedAttempts = attempts.filter(
    (attempt) => attempt.status === 'fail',
  ).length;
  const successRatio =
    totalAttempts > 0 ? successfulAttempts / totalAttempts : 0;
  const failRatio = totalAttempts > 0 ? failedAttempts / totalAttempts : 0;

  const stats = {
    totalAttempts,
    successfulAttempts,
    failedAttempts,
    successRatio,
    failRatio,
  };

  return stats;
};

export const getUserAttemptDetails = async (userId: number) => {
  const attempts = await Attempt.findAll({
    where: { userId },
    include: [{ model: Problem, as: 'problem' }],
    order: [['createdAt', 'DESC']],
  });

  return attempts;
};
