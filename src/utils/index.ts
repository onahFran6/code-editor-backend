import jwt from 'jsonwebtoken';
import config from '../config';

export const generateAccessToken = ({ email }: { email: string }): string => {
  const token = jwt.sign({ email }, config.JWT_SECRET, {
    expiresIn: config.JWT_TOKEN_EXPIRE,
  });
  return token;
};

export const isEqualJson = (obj1: any, obj2: any): boolean => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const stringifyArrayWithoutSpaces = (arr: any[]): string => {
  return `[${arr.join(',')}]`;
};
