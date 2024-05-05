import { userRepository } from "../repositories/userRepository";

export const getAllUsers = async () => {
  return await userRepository.getAll();
};

export const createUser = async (userData : any) => {
  return await userRepository.create(userData);
};

export const updateUser = async (userData :any) => {
  return await userRepository.update(userData);
};

export const deleteUser = async (userId : any) => {
  return await userRepository.deleteById(userId);
};
