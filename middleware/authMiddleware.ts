import { NextFunction, Request, Response } from "express";

import JWT from "jsonwebtoken";
import UserModel from "../models/users.model";
import asyncHandler from "express-async-handler";
import fs from "fs";
import path from "path";
import usersModel from "../models/users.model";

const publicKey = fs.readFileSync(
  path.join(__dirname.replace("/dist", ""), "../config/keys/public_key.pem")
);

const PROTECT = asyncHandler(
  async (req: Request | any, res: Response, next: NextFunction) => {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        token = req.headers.authorization.split(" ")[1];

        // decodes token id
        const decoded: any = JWT.verify(token, publicKey, {
          algorithms: ["RS256"],
        });

        req.user = await usersModel.findById(decoded.id).select("-password");

        next();
      } catch (error) {
        res.status(401);
        throw new Error("Not authorized, token failed");
      }
    }

    if (!token) {
      res.status(401);
      throw new Error("Not authorized, no token");
    }
  }
);

export default PROTECT;
