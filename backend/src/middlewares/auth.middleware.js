import { HttpStatus } from "../constants/httpStatusCodes.js";
import FoodPartnerModel from "../models/foodpartner.model.js";
import jwt from "jsonwebtoken";

const authFoodPartnerMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      message: "Please login or create an account to upload food item.",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const foodPartner = await FoodPartnerModel.findById(decodedToken.id);

    req.foodPartner = foodPartner;
    next();
  } catch (error) {
    res.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      message: "Invalid Token",
    });
  }
};

export { authFoodPartnerMiddleware };
