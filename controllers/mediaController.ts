import Media from "../models/Media";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors";
import { Request, Response } from "express";

export const createMedia = async (req: Request, res: Response) => {
  const { type } = req.body;

  const existingMedia = await Media.findOne({ type });
  if (existingMedia) {
    throw new CustomError.BadRequestError(
      `Media of type ${type} already exists.`
    );
  }

  const media = await Media.create(req.body);
  res.status(StatusCodes.CREATED).json({ media });
};

export const getMedia = async (req: Request, res: Response) => {
  const { type } = req.query;
  let query = {};

  if (type) {
    query = { type };
  }
  const media = await Media.find(query);

  res.status(StatusCodes.OK).json({ media });
};

export const updateMedia = async (req: Request, res: Response) => {
  const { id: mediaId } = req.params;

  const media = await Media.findOneAndUpdate({ _id: mediaId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!media) {
    throw new CustomError.NotFoundError(`No media with id : ${mediaId}`);
  }

  res.status(StatusCodes.OK).json({ media });
};
