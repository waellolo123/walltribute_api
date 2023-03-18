import { NextFunction, Request, Response } from "express";

export const FindUser = (
  req: Request | any,
  res: Response,
  next: NextFunction
) => {
  if (!req.user) {
    res.status(404);
    throw new Error("Not authorized, verify token or user please");
  } else {
    next();
  }
};
