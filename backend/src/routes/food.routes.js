import express from "express";
import { createFood } from "../controllers/food.controller.js";
import { authFoodPartnerMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/add-food-item", authFoodPartnerMiddleware, createFood);

export default router;
