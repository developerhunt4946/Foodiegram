import express from "express";
import {
  createNewFoodPartner,
  createNewUser,
  loginFoodPartner,
  loginUser,
  logoutFoodPartner,
  logoutUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/user/register", createNewUser);
router.post("/user/login", loginUser);
router.post("/user/logout", logoutUser);

router.post("/food-partner/register", createNewFoodPartner);
router.post("/food-partner/login", loginFoodPartner);
router.post("/food-partner/logout", logoutFoodPartner);

export default router;
