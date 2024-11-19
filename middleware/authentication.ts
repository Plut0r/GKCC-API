import mongoose from "mongoose";
import CustomError from "../errors";
import { isTokenValid } from "../utils/jwt";
import { Request, Response } from "express";

const authenticateUser = async (
  req: Request,
  res: Response,
  next: (err?: any) => void
) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError("Authentication Invalid");
  }

  try {
    const payload: {
      name: string;
      userId: mongoose.Types.ObjectId;
      role: string;
    } = isTokenValid({ token });

    // Attach the user and his permissions to the req object
    // @ts-ignore
    req.user = {
      name: payload.name,
      userId: payload.userId,
      role: payload.role,
    };

    next();
  } catch (error) {
    console.error(error);
    throw new CustomError.UnauthenticatedError("Authentication invalid");
  }
};

const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError.UnauthorizedError(
        "Unauthorized to access this route"
      );
    }
    next();
  };
};

export { authenticateUser, authorizeRoles };
