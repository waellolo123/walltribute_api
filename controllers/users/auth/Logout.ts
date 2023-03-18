import { Request, Response } from "express";

// ######################### Register Controller #########################/;

async function Logout(req: Request, res: Response) {
  try {
    req.headers.authorization = "";
    return res.status(200).json({ message: "Logout with success" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
}

export default Logout;
