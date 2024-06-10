import jwt from 'jsonwebtoken';
import config from '../config';

export const generateAccessToken = ({ email }: { email: string }): string => {
  const token = jwt.sign({ email }, config.JWT_SECRET, {
    expiresIn: config.JWT_TOKEN_EXPIRE,
  });
  return token;
};
