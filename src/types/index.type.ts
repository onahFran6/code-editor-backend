export type EnvironmentConfig = {
  PORT: number;
  DB_HOST: string;
  DB_USER: string;
  DB_PASS: string;
  DB_DIALECT: string;
  DB_NAME: string;
  JWT_SECRET: string;
  JWT_TOKEN_EXPIRE: string;
  DB_PORT?: number;
  JUDGE0_API_KEY: string;
};

export type TestCase = {
  input: string;
  expectedOutput: string;
};

export type ProblemTestCasesType = {
  [problemId: number]: TestCase[];
};

// export interface UploadedFilesType {
//   [fieldname: string]: Express.Multer.File[];
// }
