import { Request, Response } from "express";
import usersModel from "../../models/users.model";

// ######################### List all users #########################/;

async function List(req: Request | any, res: Response) {
  const data = await usersModel.find().select("-password");
  res.status(200).json(data);
}

// ######################### Get user by Id #########################/;

async function GetById(req: Request | any, res: Response) {
  usersModel
    .findById(req?.params?.id)
    .select("-password")
    .then((result) => {
      return res.status(200).json({ data: result });
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ message: "Error occured contact administrator please" });
    });
}

// ######################### Delete user by Id #########################/;

async function DeleteById(req: Request | any, res: Response) {
  usersModel
    .deleteOne({ _id: req?.params?.id })
    .then((result) => {
      return res.status(200).json({ message: "User deleted with success" });
    })
    .catch((err) => {
      return res
        .status(404)
        .json({ message: "Error occured contact administrator please" });
    });
}

export { List, GetById, DeleteById };
