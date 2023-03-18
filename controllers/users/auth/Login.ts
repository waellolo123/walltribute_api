import { Request, Response } from "express";
import UserModel from "../../../models/users.model";
import LoginValidation from "../../../validations/Login.validation";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import fs from "fs";
import path from "path";

// ######################### Generate token RS256 #########################/;
const GenerateToken = (payload: {}) => {
  const privateKey = fs.readFileSync(
    path.join(__dirname, "../../../config/keys/private_key.pem")
  );
  const token = JWT.sign(payload, privateKey, { algorithm: "RS256" });
  return token;
};

// ######################### Login Controller #########################/;

async function Login(req: Request, res: Response) {
  const { isValid, errors } = LoginValidation(req.body);
  if (!isValid) {
    return res.status(404).json(errors);
  }
  const ExistUser = await UserModel.findOne({ email: req.body.email });
  if (ExistUser) {
    /* Create user if not exist */
    const isMatch = await bcrypt.compare(req.body.password, ExistUser.password);
    if (!isMatch) {
      return res.status(404).json({ password: "Invalid password" });
    }
    const token = GenerateToken({
      id: ExistUser._id,
      fullname: ExistUser.fullname,
      roles: ExistUser.roles,
    });
    return res.status(200).json({ message: "success", token });
  } else {
    return res.status(404).json({ email: "Invalid user" });
  }
}

export default Login;
