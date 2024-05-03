import { userRepository } from "../repositories/userRepository";

export const getAllUsers = async () => {
  return await userRepository.getAll();
};

export const createUser = async (userData) => {
  return await userRepository.create(userData);
};

export const updateUser = async (userData) => {
  return await userRepository.update(userData);
};

export const deleteUser = async (userId) => {
  return await userRepository.deleteById(userId);
};
