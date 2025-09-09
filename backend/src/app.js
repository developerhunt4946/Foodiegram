import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "../src/routes/auth.routes.js";
import foodRoutes from "../src/routes/food.routes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", userRoutes);
app.use("/api/food", foodRoutes);

app.get("/", (req, res) => {
  res.send("Hello Ayush");
});

export default app;
