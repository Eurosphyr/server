import { userModel } from "../models/userModel";

const userRepository = {
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
      _id: userId,
    });
  },
};

export { userRepository };
