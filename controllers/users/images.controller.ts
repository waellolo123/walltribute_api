import { Request, Response } from "express";
import fs from "fs";
import path from "path";
import Stripe from "stripe";
import imagesModel from "../../models/images.model";
import Upload from "../../util/upload";
import imageValidation from "../../validations/Image.validation";

// ######################### Add image #########################/;

function Add(req: Request | any, res: Response) {
  Upload(req, res, async (err) => {
    const { errors, isValid } = imageValidation(req);
    if (err) {
      errors.file = err.message;
      return res.status(404).json(errors);
    } else {
      if (!isValid) {
        return res.status(404).json(errors);
      } else {
        const image = {
          user: req?.user?._id,
          title: req.body.title,
          description: req.body.description,
          sharedLink: req.body.sharedLink,
          position: req.body.position,
          image: path.join(`/images/${req?.user?._id}/${req?.file?.filename}`),
        };
        await imagesModel.create(image);
        res.status(200).json({
          message: "Image added with success",
        });
      }
    }
  });
}

// ######################### List of all images #########################/;

async function List(req: Request, res: Response) {
  await imagesModel
    .find()
    .populate("user", "-password")
    .then((result) => {
      res.status(200).json(result);
    });
}

// ######################### Delete image by Id #########################/;

async function Delete(req: Request, res: Response) {
  const homeDir =
    process.env.NODE_ENV === "development"
      ? path.resolve(__dirname).replace("/dist/controllers/users", "")
      : path.resolve(__dirname).replace("/controllers/users", "");
  const ImageDir = path.join(homeDir, "public", "images");

  await imagesModel
    .findOne({ _id: req?.params.id_image })
    .populate("user", "-password")
    .then(async (result: any) => {
      if (result) {
        const pathImage = `${path.join(
          ImageDir,
          result.image.replace("/images", "")
        )}`;
        fs.unlink(pathImage, async (err) => {
          if (err) {
            return res.status(500).json({
              message:
                "Problem into delete image file, this action cant' be completed",
            });
          }
          await imagesModel.deleteOne({ _id: req.params.id_image });
          res.status(200).json({ message: "Image deleted with success" });
        });
      } else {
        res.status(404).json({ message: "Image not found" });
      }
    });
}

// ######################### Get image by Id #########################/;

async function GetImageByUser(req: Request, res: Response) {
  await imagesModel
    .find({ user: req?.params.id_user })
    .populate("user", "-password")
    .then((result) => {
      res.status(200).json(result);
    });
}

// ######################### Get image by Id #########################/;

async function GetImageById(req: Request, res: Response) {
  await imagesModel
    .findOne({ _id: req?.params.id })
    .populate("user", "-password")
    .then((result) => {
      res.status(200).json(result);
    });
}

// ######################### Get image by Id #########################/;

async function Search(req: Request | any, res: Response) {
  const keywords = req.query.search
    ? {
        $or: [
          { title: { $regex: req.query.search, $options: "i" } },
          { description: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};
  const data = await imagesModel
    .find(keywords)
    .find({
      _id: { $ne: req?.user?._id },
    })
    .populate("user", "-password");
  res.send(data);
}

// ######################### Payment #########################/;

async function Payment(req: Request, res: Response) {
  const stripe = new Stripe(process.env.STRIPE_SECRET!, {
    apiVersion: "2022-11-15",
  });
  let status;
  const { token, amount } = req.body;
  try {
    await stripe.charges.create({
      source: token.id,
      amount,
      currency: "USD",
    });
    status = "success";
  } catch (error) {
    console.log(error);
    status = "failure";
  }
  res.json({ status });
}

export { Add, List, Delete, GetImageByUser, Payment, GetImageById, Search };
