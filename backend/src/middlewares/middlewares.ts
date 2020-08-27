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
  console.log(req.statusCode);
  res.send("oops");
}
