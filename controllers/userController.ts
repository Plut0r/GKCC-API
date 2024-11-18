import { Request, Response } from "express";
import User from "../models/User";
import { StatusCodes } from "http-status-codes";

const getAllUsers = async (req: Request, res: Response) => {
  const { page = 1, limit = 25 } = req.query;

  // Convert to numbers
  const pageNum = parseInt(page as string, 10);
  const limitNum = parseInt(limit as string, 10);

  // Calculate total users and total pages
  const totalUsers = await User.countDocuments({ role: "user" });
  const totalPages = Math.ceil(totalUsers / limitNum);

  const users = await User.find({ role: "user" })
    .select("-password")
    .skip((pageNum - 1) * limitNum)
    .limit(limitNum);

  // Calculate the sum of totalRevenueGenerated and purchasedEbooks
  const totalRevenueGenerated = users.reduce(
    (acc, user) => acc + user.totalRevenueGenerated,
    0
  );
  const totalPurchasedEbooks = users.reduce(
    (acc, user) => acc + user.purchasedEbooks,
    0
  );

  res.status(StatusCodes.OK).json({
    users,
    count: users.length,
    totalRevenueGenerated,
    totalPurchasedEbooks,
    pagination: {
      totalUsers,
      totalPages,
      currentPage: pageNum,
      limit: limitNum,
    },
  });
};

const showCurrentUser = async (req: Request, res: Response) => {
  // @ts-ignore
  res.status(StatusCodes.OK).json({ user: req.user });
};

export { getAllUsers, showCurrentUser };
