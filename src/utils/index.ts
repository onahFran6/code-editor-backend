import jwt from "jsonwebtoken";

export const generateAccessToken = (email: string) => {
  const token = jwt.sign({ email }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
  return token;
};
