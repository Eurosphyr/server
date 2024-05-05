import express from "express";
import cors from "cors";
import "dotenv";
import mongoose from "mongoose";
import { userController } from "./controllers/userController";

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 8080;
const DATABASE: string = process.env.DATABASE_URL || '';

mongoose.connect("mongodb+srv://Miguel:Eurosphyr2016@cluster0.ooo9se4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });


app.use("/", userController);
