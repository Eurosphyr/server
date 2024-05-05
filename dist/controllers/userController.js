"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const express_1 = __importDefault(require("express"));
const userService_1 = require("../services/userService");
const router = express_1.default.Router();
exports.userController = router;
router.get("/", async (req, res) => {
    try {
        const data = await (0, userService_1.getAllUsers)();
        res.json({ success: true, data });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
router.post("/create", async (req, res) => {
    try {
        const data = await (0, userService_1.createUser)(req.body);
        res.send({
            success: true,
            message: "Data has been created successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
router.put("/update", async (req, res) => {
    try {
        const data = await (0, userService_1.updateUser)(req.body);
        res.send({
            success: true,
            message: "Data has been updated successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
router.delete("/delete/:id", async (req, res) => {
    try {
        const data = await (0, userService_1.deleteUser)(req.params.id);
        res.send({
            success: true,
            message: "Data has been deleted successfully",
            data,
        });
    }
    catch (error) {
        res.status(500).json({ success: false, message: "Internal server error" });
    }
});
