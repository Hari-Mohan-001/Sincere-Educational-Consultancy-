import { NextFunction, Request, Response } from "express";

// Defining an interface for your custom error
interface CustomError extends Error {
  statusCode?: number;
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`Not Found`) as CustomError;
  error.statusCode = 404; // Set a status code for the error
  next(error); // Pass the error to the next middleware (error handler)
};

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  
  res.status(statusCode).json({
    success: false,
    message,
    statusCode
  });
};
