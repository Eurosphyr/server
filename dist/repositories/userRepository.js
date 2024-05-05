"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
const userModel_1 = require("../models/userModel");
const userRepository = {
    getAll: async () => {
        return await userModel_1.userModel.find({});
    },
    create: async (userData) => {
        const data = new userModel_1.userModel(userData);
        return await data.save();
    },
    update: async (userData) => {
        const { id, ...rest } = userData;
        return await userModel_1.userModel.updateOne({ _id: id }, rest);
    },
    deleteById: async (userId) => {
        return await userModel_1.userModel.deleteOne({
            _id: userId,
        });
    },
};
exports.userRepository = userRepository;
