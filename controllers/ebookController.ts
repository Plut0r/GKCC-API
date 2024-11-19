import Ebook from "../models/Ebook";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors";
import { Request, Response } from "express";
import User from "../models/User";
import PurchasedEbook from "../models/PurchasedEbook";
import cloudinary from "../utils/cloudinaryConfig";

export const createEbook = async (req: Request, res: Response) => {
  const { title, description, tags, free, price } = req.body;

  // Check if req.files and the required fields are present
  if (!req.files || !req.files["cover_img"] || !req.files["ebook_file"]) {
    throw new CustomError.BadRequestError("File uploads are required");
  }

  // Access uploaded files' URLs from req.files
  const coverImgUrl = req.files.cover_img[0].path;
  const ebookFileUrl = req.files.ebook_file[0].path;

  // Upload cover image
  // const coverImgResult = await cloudinary.uploader.upload(
  //   req.files.cover_img[0].path,
  //   { folder: "ebooks/cover_images", resource_type: "image" }
  // );

  // Upload ebook file
  // const ebookFileResult = await cloudinary.uploader.upload(
  //   req.files.ebook_file[0].path,
  //   { folder: "ebooks/files", resource_type: "raw" }
  // );

  const ebook = await Ebook.create({
    title,
    description,
    tags,
    ebook_file: ebookFileUrl,
    cover_img: coverImgUrl,
    free,
    price,
  });

  res.status(StatusCodes.CREATED).json({ ebook });
};

export const getAllEbooks = async (req: Request, res: Response) => {
  const ebooks = await Ebook.find({});
  res.status(StatusCodes.OK).json({ ebooks, count: ebooks.length });
};

export const getSingleEbook = async (req: Request, res: Response) => {
  const { id: ebookId } = req.params;

  const ebook = await Ebook.findOne({ _id: ebookId });
  if (!ebook) {
    throw new CustomError.NotFoundError(`No ebook with ${ebookId}`);
  }

  res.status(StatusCodes.OK).json({ ebook });
};

export const updateEbook = async (req: Request, res: Response) => {
  const { id: ebookId } = req.params;

  // Find the ebook by ID
  const ebook = await Ebook.findOne({ _id: ebookId });
  if (!ebook) {
    throw new CustomError.NotFoundError(`No ebook with id: ${ebookId}`);
  }

  // Update the fields with the values from the request body
  const fieldsToUpdate = ["title", "description", "tags", "free", "price"];
  fieldsToUpdate.forEach((field) => {
    if (req.body[field] !== undefined) {
      ebook[field] = req.body[field];
    }
  });

  // Check and handle new cover image upload
  if (req.files && req.files["cover_img"]) {
    const coverImgUrl = req.files["cover_img"][0].path;
    ebook.cover_img = coverImgUrl;
  }

  // Check and handle new ebook file upload
  if (req.files && req.files["ebook_file"]) {
    const ebookFileUrl = req.files["ebook_file"][0].path;
    ebook.ebook_file = ebookFileUrl;
  }

  // Save the updated ebook
  await ebook.save();

  res.status(StatusCodes.OK).json({ ebook });
};

export const deleteEbook = async (req: Request, res: Response) => {
  const { id: ebookId } = req.params;

  const ebook = await Ebook.findById(ebookId);
  if (!ebook) {
    throw new CustomError.NotFoundError(`No ebook with id: ${ebookId}`);
  }

  // Delete cover image and ebook file from Cloudinary
  await cloudinary.uploader.destroy(ebook.cover_img, {
    resource_type: "image",
  });
  await cloudinary.uploader.destroy(ebook.ebook_file, {
    resource_type: "raw",
  });

  // Delete the ebook document from the database
  await Ebook.findByIdAndDelete(ebookId);

  res.status(StatusCodes.OK).json({ msg: "Success! Ebook removed." });
};

export const markEbookAsPaid = async (req: Request, res: Response) => {
  const { id: ebookId } = req.params;
  // @ts-ignore
  const userId = req.user?.userId;

  const ebook = await Ebook.findOne({ _id: ebookId });
  if (!ebook) {
    throw new CustomError.NotFoundError(`No ebook with id: ${ebookId}`);
  }

  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${userId}`);
  }

  // Check if purchasedEbook document already exists for the user
  let purchasedEbook = await PurchasedEbook.findOne({ user: userId });
  if (purchasedEbook) {
    // Add the new ebook to the existing purchasedEbook document
    purchasedEbook.ebooks.push({ ebook: ebookId, purchasedAt: new Date() });
  } else {
    // Create a new purchasedEbook document
    purchasedEbook = await PurchasedEbook.create({
      user: userId,
      ebooks: [{ ebook: ebookId, purchasedAt: new Date() }],
    });
  }

  // Update user's purchasedEbooks count and totalRevenueGenerated
  user.purchasedEbooks += 1;
  user.totalRevenueGenerated += ebook.price;

  // Update ebook's sales and revenue
  ebook.sales += 1;
  ebook.revenue += ebook.price;

  // Save the updated user
  await user.save();
  await ebook.save();
  await purchasedEbook.save();

  res.status(StatusCodes.OK).json({
    purchasedEbook,
  });
};

export const getPurchasedEbooks = async (req: Request, res: Response) => {
  // @ts-ignore
  const userId = req.user?.userId;

  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError.NotFoundError(`No user with id: ${userId}`);
  }

  const purchasedEbooks = await PurchasedEbook.find({ user: userId }).populate({
    path: "ebooks.ebook",
    model: "Ebook",
  });

  res.status(StatusCodes.OK).json({ purchasedEbooks });
};

export const getTopFiveSellingEbooks = async (req: Request, res: Response) => {
  const topSellingEbooks = await Ebook.aggregate([
    { $sort: { sales: -1 } },
    // Sort by sales in descending order
    { $limit: 5 },
    // Limit to 5 results
  ]);

  res.status(StatusCodes.OK).json({ topSellingEbooks });
};
