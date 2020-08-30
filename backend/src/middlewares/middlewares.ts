import express from "express";

export function notFoundHandler(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

export function errorHandler(
  error: any,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  switch (error.message) {
    case "Couldn't find user":
      res.status(404);
      return res.json({
        message: error.message,
        code: 404,
        stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
      });
    case "Incorrect Password":
      res.status(401);
      return res.json({
        message: error.message,
        code: 401,
        stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
      });
    default:
      const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
      res.status(statusCode);
      res.json({
        message: error.message,
        code: statusCode,
        stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
      });
  }
}
