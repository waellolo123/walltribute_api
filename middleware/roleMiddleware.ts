import { NextFunction, Response } from "express";

interface DATAROLE {
  ADMIN: string;
  USER: string;
  DEVELOER: string;
}
const ROLES = {
  ADMIN: "1",
  USER: "2",
  DEVELOER: "3",
};

const inRole =
  (...roles: any[]) =>
  (req: any, res: Response, next: NextFunction) => {
    const role = roles.find((r: string) => req.user.roles.indexOf(r) !== -1);

    if (!role) {
      return res.status(401).json({ message: "No Access to this page" });
    }
    next();
  };

export { inRole, ROLES };
