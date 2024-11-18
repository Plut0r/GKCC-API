import { Request, Response } from "express";
import { register, login, logout } from "./authController";

export const registerAdmin = (req: Request, res: Response) =>
    register(req, res, "admin");
export const loginAdmin = (req: Request, res: Response) =>
  login(req, res, "admin");
export const logoutAdmin = logout;
