import express from "express";
import cors from "cors";
import "dotenv";
import mongoose from "mongoose";
import { userController } from "./controllers/userController";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;

mongoose
  .connect("mongodb://localhost:27017/crud")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/", userController);
