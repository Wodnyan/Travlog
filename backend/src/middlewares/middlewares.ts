import express from "express";
import { User } from "../db/db";

export async function checkUsername(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const body = req.body;
  if (!body || !body.username) {
    const error = new Error("Username missing from body");
    res.status(400);
    next(error);
  }
  try {
    const usernameTaken = await User.findOne({
      username: body.username,
      provider: "local",
    });
    if (!usernameTaken) return next();
    else {
      const error = new Error("Username Taken");
      res.status(409);
      next(error);
    }
  } catch (error) {
    next(error);
  }
}

export function checkAuth(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  if (req.user) {
    next();
  } else {
    const error = new Error("Failed authentication");
    res.status(401);
    next(error);
  }
}

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
