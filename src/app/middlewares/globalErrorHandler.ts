import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { ZodError, ZodIssue } from "zod";
import { AppError } from "../../lib/AppError";
import { envVariables } from "../../config";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 500;
  let message = "Something went wrong!";
  let errorSources = [
    {
      path: "",
      message: "Something went wrong",
    },
  ];

  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
    errorSources = err.issues.map((issue: ZodIssue) => ({
      path: issue.path[issue.path.length - 1].toString(),
      message: issue.message,
    }));
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err.message;
    errorSources = [
      {
        path: "",
        message: err?.message,
      },
    ];
  }

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors: errorSources.map((err) => ({
      name: err.path || "",
      error: err.message,
    })),
  });
};

export default globalErrorHandler;
