import Policy from "../models/Policy";
import { StatusCodes } from "http-status-codes";
import CustomError from "../errors";
import { Request, Response } from "express";

export const createPolicy = async (req: Request, res: Response) => {
  const { content, type } = req.body;

  const existingPolicy = await Policy.findOne({ type });
  if (existingPolicy) {
    throw new CustomError.BadRequestError(
      `Policy of type ${type} already exists.`
    );
  }

  const policy = await Policy.create({ content, type });
  res.status(StatusCodes.CREATED).json({ policy });
};

export const getPolicy = async (req: Request, res: Response) => {
  const { type } = req.query;
  const query = type ? { type } : {};;

  const policy = await Policy.find(query);

  res.status(StatusCodes.OK).json({ policy });
};

export const updatePolicy = async (req: Request, res: Response) => {
  const { id: policyId } = req.params;

  const policy = await Policy.findOneAndUpdate({ _id: policyId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!policy) {
    throw new CustomError.NotFoundError(`No policy with id: ${policyId}`);
  }

  res.status(StatusCodes.OK).json({ policy });
};
