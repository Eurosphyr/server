"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getAllUsers = void 0;
const userRepository_1 = require("../repositories/userRepository");
const getAllUsers = async () => {
    return await userRepository_1.userRepository.getAll();
};
exports.getAllUsers = getAllUsers;
const createUser = async (userData) => {
    return await userRepository_1.userRepository.create(userData);
};
exports.createUser = createUser;
const updateUser = async (userData) => {
    return await userRepository_1.userRepository.update(userData);
};
exports.updateUser = updateUser;
const deleteUser = async (userId) => {
    return await userRepository_1.userRepository.deleteById(userId);
};
exports.deleteUser = deleteUser;
