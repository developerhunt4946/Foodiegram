import mongoose from "mongoose";

const foodPartnerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

const FoodPartnerModel = mongoose.model("foodpartner", foodPartnerSchema);

export default FoodPartnerModel;
