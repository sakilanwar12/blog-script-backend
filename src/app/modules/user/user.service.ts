import { IUser } from "./user.interface";
import User from "./user.model";

const createUser = async (userData: IUser) => {
  const user = new User(userData);
  return await user.save();
};

const getUserByEmail = async (email: string) => {
  return await User.findOne({ email });
};

const getUserById = async (id: string) => {
  return await User.findById(id);
};

const getAllUsers = async () => {
  return await User.find();
};

const updateUser = async (id: string, updateData: Partial<IUser>) => {
  return await User.findByIdAndUpdate(id, updateData, { new: true });
};

const deleteUser = async (id: string) => {
  return await User.findByIdAndDelete(id);
};

export const UserService = {
  createUser,
  getUserByEmail,
  getUserById,
  getAllUsers,
  updateUser,
  deleteUser,
};
