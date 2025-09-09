import FoodModel from "../models/food.model.js";

const createFood = async (req, res, next) => {
  res.send("food item created");
};

export { createFood };
