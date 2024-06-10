import bcrypt from 'bcrypt';

export const hashPassword = async ({
  password,
}: {
  password: string;
}): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const comparePassword = async ({
  password,
  hashedPassword,
}: {
  password: string;
  hashedPassword: string;
}): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};
