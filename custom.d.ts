import mongoose from "mongoose";

declare global {
  namespace Express {
    interface Request {
      user?: { name: string; userId: mongoose.Types.ObjectId; role: string };
    }
  }
}
