import mongoose from "mongoose";

const schemaData = new mongoose.Schema(
  {
    name: String,
    email: String,
    phone: String,
    password: String,
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const userModel = mongoose.model("user", schemaData);

export { userModel };
