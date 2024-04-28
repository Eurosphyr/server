var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/index.ts
var import_express = __toESM(require("express"));
var import_cors = __toESM(require("cors"));
var import_dotenv = require("dotenv");
var import_mongoose = __toESM(require("mongoose"));
var app = (0, import_express.default)();
app.use((0, import_cors.default)());
app.use(import_express.default.json());
var PORT = process.env.PORT || 8080;
var schemaData = new import_mongoose.default.Schema(
  {
    name: String,
    email: String,
    phone: String,
    password: String,
    date: { type: Date, default: Date.now }
  },
  {
    timestamps: true
  }
);
var userModel = import_mongoose.default.model("user", schemaData);
app.get("/", async (req, res) => {
  const data = await userModel.find({});
  res.json({ success: true, data });
});
app.post("/create", async (req, res) => {
  console.log(req.body);
  const data = new userModel(req.body);
  await data.save();
  res.send({ success: true, message: "Data has been created successfully", data });
});
app.put(
  "/update",
  async (req, res) => {
    console.log(req.body);
    const { id, ...rest } = req.body;
    console.log(rest);
    const data = await userModel.updateOne({ _id: id }, rest);
    res.send({ success: true, message: "Data has been updated successfully", data });
  }
);
app.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const data = await userModel.deleteOne({ _id: id });
    res.send({ success: true, message: "Data has been deleted successfully", data });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).send({ success: false, message: "Internal server error" });
  }
});
import_mongoose.default.connect("mongodb://localhost:27017/crud").then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
}).catch((err) => {
  console.log(err);
});
