import express, { Request, Response } from "express";
import Stripe from "stripe";
import {
  Add,
  Delete,
  GetImageById,
  GetImageByUser,
  List,
  Payment,
  Search,
} from "../controllers/users/images.controller";
import PROTECT from "../middleware/authMiddleware";
import { FindUser } from "../middleware/findUserMiddleware";
import { inRole, ROLES } from "../middleware/roleMiddleware";
const router = express.Router();

/*
 * Method("POST")
 * Private
 */
router.post(
  "/uploads",
  PROTECT,
  FindUser,
  inRole(ROLES.USER, ROLES.DEVELOER),
  Add
);

/*
 * Method("GET")
 * Private
 */
router.get("/images", List);

/*
 * Method("GET")
 * Public
 */
router.get("/images/one/:id", GetImageById);

/*
 * Method("GET")
 * Public
 */
router.get("/search", Search);

/*
 * Method("GET")
 * Param(":id_image")
 * Private
 */
router.get("/images/:id_user", PROTECT, FindUser, GetImageByUser);

/*
 * Method("DELETE")
 * Param(":id_image")
 * Private
 */
router.delete(
  "/images/:id_image",
  PROTECT,
  FindUser,
  inRole(ROLES.USER, ROLES.ADMIN, ROLES.DEVELOER),
  Delete
);

/*
 * Method("POST")
 * Private
 */
router.post("/images/payment", PROTECT, FindUser, Payment);

export default router;
