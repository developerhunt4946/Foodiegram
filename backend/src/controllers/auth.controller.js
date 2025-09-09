import UserModal from "../models/user.model.js";
import FoodPartnerModel from "../models/foodpartner.model.js";
import { HttpStatus } from "../constants/httpStatusCodes.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createNewUser = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    const isUserAlreadyExists = await UserModal.findOne({ email });

    if (isUserAlreadyExists) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await UserModal.create({
      fullName,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" } // set expiry
    );

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true, // prevents JS access
      secure: process.env.NODE_ENV === "production", // only HTTPS in prod
      sameSite: "strict", // CSRF protection
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Exclude password in response
    const { password: _, ...safeUser } = user.toObject();

    res.status(HttpStatus.CREATED).json({
      success: true,
      message: "User registered successfully",
      data: safeUser,
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if user exists or not
    const user = await UserModal.findOne({ email });

    // if user not found
    if (!user) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    //is user found then we will match the password

    const isPasswordValid = await bcrypt.compare(password, user?.password);

    if (!isPasswordValid) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" } // set expiry
    );

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true, // prevents JS access
      secure: process.env.NODE_ENV === "production", // only HTTPS in prod
      sameSite: "strict", // CSRF protection
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    const { password: _, ...safeUser } = user.toObject();

    res.status(HttpStatus.OK).json({
      success: true,
      message: "User Logged in succesfully",
      data: safeUser,
    });
  } catch (error) {
    next(error);
  }
};

const logoutUser = async (req, res, next) => {
  try {
    // clear the cookie by setting token with empty value and immediate expiry
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(HttpStatus.OK).json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

const createNewFoodPartner = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    const isFoodPartnerAlreadyExists = await FoodPartnerModel.findOne({
      email,
    });

    if (isFoodPartnerAlreadyExists) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Food partner already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const foodPartner = await FoodPartnerModel.create({
      fullName,
      email,
      password: hashedPassword,
    });

    // Generate JWT
    const token = jwt.sign(
      { id: foodPartner._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" } // set expiry
    );

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true, // prevents JS access
      secure: process.env.NODE_ENV === "production", // only HTTPS in prod
      sameSite: "strict", // CSRF protection
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    // Exclude password in response
    const { password: _, ...safeUser } = foodPartner.toObject();

    res.status(HttpStatus.CREATED).json({
      success: true,
      message: "Food partner registered successfully",
      data: safeUser,
    });
  } catch (error) {
    next(error);
  }
};

const loginFoodPartner = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // check if user exists or not
    const foodPartner = await FoodPartnerModel.findOne({ email });

    // if user not found
    if (!foodPartner) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    //is user found then we will match the password

    const isPasswordValid = await bcrypt.compare(
      password,
      foodPartner?.password
    );

    if (!isPasswordValid) {
      return res.status(HttpStatus.BAD_REQUEST).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    const token = jwt.sign(
      { id: foodPartner._id },
      process.env.JWT_SECRET,
      { expiresIn: "30d" } // set expiry
    );

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true, // prevents JS access
      secure: process.env.NODE_ENV === "production", // only HTTPS in prod
      sameSite: "strict", // CSRF protection
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    const { password: _, ...safeUser } = foodPartner.toObject();

    res.status(HttpStatus.OK).json({
      success: true,
      message: "Food partner logged in succesfully",
      data: safeUser,
    });
  } catch (error) {
    next(error);
  }
};

const logoutFoodPartner = async (req, res, next) => {
  try {
    // clear the cookie by setting token with empty value and immediate expiry
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.status(HttpStatus.OK).json({
      success: true,
      message: "FoodPartner logged out successfully",
    });
  } catch (error) {
    next(error);
  }
};

export {
  createNewUser,
  loginUser,
  logoutUser,
  createNewFoodPartner,
  loginFoodPartner,
  logoutFoodPartner,
};
