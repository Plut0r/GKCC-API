import mongoose from "mongoose";

const createTokenUser = (user: { name: string; _id: mongoose.Types.ObjectId; role: string }) => {
  return { name: user.name, userId: user._id, role: user.role };
};

export default createTokenUser;
