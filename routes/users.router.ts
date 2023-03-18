import express from "express";
import Login from "../controllers/users/auth/Login";
import Logout from "../controllers/users/auth/Logout";
import Register from "../controllers/users/auth/Register";
import {
  DeleteById,
  GetById,
  List,
} from "../controllers/users/users.controller";
import PROTECT from "../middleware/authMiddleware";
import { FindUser } from "../middleware/findUserMiddleware";
import { inRole, ROLES } from "../middleware/roleMiddleware";
const router = express.Router();

// ######################### User router #########################/;

/*
 * Method("POST")
 * Public
 */
router.post("/register", Register);

/*
 * Method("POST")
 * Public
 */
router.post("/login", Login);

/*
 * Method("POST")
 * Public
 */
router.post("/logout", Logout);

/*
 * Method("GET")
 * Private
 */
router.get(
  "/users",
  PROTECT,
  FindUser,
  inRole(ROLES.ADMIN, ROLES.DEVELOER),
  List
);

/*
 * Method("GET")
 * Param(":id")
 * Private
 */
router.get(
  "/users/:id",
  PROTECT,
  FindUser,
  inRole(ROLES.ADMIN, ROLES.DEVELOER),
  GetById
);

/*
 * Method("DELETE")
 * Param(":id")
 * Private
 */
router.delete(
  "/users/:id",
  PROTECT,
  FindUser,
  inRole(ROLES.ADMIN, ROLES.DEVELOER),
  DeleteById
);

export default router;
