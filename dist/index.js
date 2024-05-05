"use strict";
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
var import_express2 = __toESM(require("express"));
var import_cors = __toESM(require("cors"));
var import_dotenv = __toESM(require("dotenv"));
var import_mongoose2 = __toESM(require("mongoose"));

// src/controllers/userController.ts
var import_express = __toESM(require("express"));

// src/models/userModel.ts
var import_mongoose = __toESM(require("mongoose"));
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

// src/repositories/userRepository.ts
var userRepository = {
  getAll: async () => {
    return await userModel.find({});
  },
  create: async (userData) => {
    const data = new userModel(userData);
    return await data.save();
  },
  update: async (userData) => {
    const { id, ...rest } = userData;
    return await userModel.updateOne({ _id: id }, rest);
  },
  deleteById: async (userId) => {
    return await userModel.deleteOne({
      _id: userId
    });
  }
};

// src/services/userService.ts
var getAllUsers = async () => {
  return await userRepository.getAll();
};
var createUser = async (userData) => {
  return await userRepository.create(userData);
};
var updateUser = async (userData) => {
  return await userRepository.update(userData);
};
var deleteUser = async (userId) => {
  return await userRepository.deleteById(userId);
};

// src/controllers/userController.ts
var router = import_express.default.Router();
router.get("/", async (req, res) => {
  try {
    const data = await getAllUsers();
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
router.post("/create", async (req, res) => {
  try {
    const data = await createUser(req.body);
    res.send({
      success: true,
      message: "Data has been created successfully",
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
router.put("/update", async (req, res) => {
  try {
    const data = await updateUser(req.body);
    res.send({
      success: true,
      message: "Data has been updated successfully",
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
router.delete("/delete/:id", async (req, res) => {
  try {
    const data = await deleteUser(req.params.id);
    res.send({
      success: true,
      message: "Data has been deleted successfully",
      data
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// src/index.ts
import_dotenv.default.config();
var app = (0, import_express2.default)();
app.use((0, import_cors.default)());
app.use(import_express2.default.json());
var PORT = process.env.PORT || 8080;
var DATABASE = process.env.DATABASE_URL || "";
import_mongoose2.default.connect(DATABASE).then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});
app.use("/", router);
