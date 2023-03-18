import { Request, Response } from "express";
import UserModel from "../../../models/users.model";
import RegisterValidation from "../../../validations/Register.validation";
import bcrypt from "bcryptjs";

// ######################### Register Controller #########################/;

async function Register(req: Request, res: Response) {
  const { isValid, errors } = RegisterValidation(req.body);
  if (!isValid) {
    return res.status(404).json(errors);
  }
  const ExistUser = await UserModel.findOne({ email: req.body.email });
  if (!ExistUser) {
    /* Hash password */
    const hash = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hash;

    /* Create user if not exist */
    await UserModel.create(req.body)
      .then((result) =>
        res.status(201).json({
          message: "success",
        })
      )
      .catch((err) => console.log(err));
  } else {
    return res.status(404).json({ email: "Email exist try with another" });
  }
}

export default Register;
