"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const schemaData = new mongoose_1.default.Schema({
    name: String,
    email: String,
    phone: String,
    password: String,
    date: { type: Date, default: Date.now },
}, {
    timestamps: true,
});
const userModel = mongoose_1.default.model("user", schemaData);
exports.userModel = userModel;
