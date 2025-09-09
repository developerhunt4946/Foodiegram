import { HttpStatus } from "../constants/httpStatusCodes.js";

export const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(HttpStatus.NOT_FOUND);
  next(error);
};

export const errorHandler = (err, req, res, next) => {
  const statusCode =
    res.statusCode === HttpStatus.OK
      ? HttpStatus.INTERNAL_SERVER_ERROR
      : res.statusCode;

  res.status(statusCode).json({
    success: false,
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
