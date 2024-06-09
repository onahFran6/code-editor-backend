// src/utils/customResponse.ts
import { Response } from "express";

interface CustomResponseParams {
  res: Response;
  statusCode: number;
  message: string;
  data?: any;
}

export const sendCustomResponse = ({
  res,
  statusCode,
  message,
  data,
}: CustomResponseParams) => {
  res.status(statusCode).json({
    status: statusCode >= 200 && statusCode < 300,
    message,
    data,
  });
};
