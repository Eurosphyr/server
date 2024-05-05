import bcrypt from 'bcryptjs';
import { userModel } from "../models/userModel";

const userRepository = {
  getAll: async () => {
    return await userModel.find({});
  },

  create: async (userData :any) => {
    const { password, ...rest } = userData;
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = new userModel({ ...rest, password: hashedPassword });
    return await data.save();
  },

  update: async (userData:any) => {
    const { id, password, ...rest } = userData;
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      return await userModel.updateOne({ _id: id }, { ...rest, password: hashedPassword });
    } else {
      return await userModel.updateOne({ _id: id }, rest);
    }
  },

  deleteById: async (userId:any) => {
    return await userModel.deleteOne({
      _id: userId,
    });
  },
};

export { userRepository };
