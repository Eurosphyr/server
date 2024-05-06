import express from "express";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../services/userService";

const router = express.Router();

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
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.put("/update/:_id", async (req, res) => {
  try {
    const { _id } = req.params; 
    const data = await updateUser(_id, req.body); 
    res.send({
      success: true,
      message: "Data has been updated successfully",
      data,
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
      data,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

export { router as userController };
