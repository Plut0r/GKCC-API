import { Request, Response } from 'express';
import { register, login, logout } from './authController';

export const registerUser = (req: Request, res: Response) => register(req, res, 'user');
export const loginUser = (req: Request, res: Response) => login(req, res, 'user');
export const logoutUser = logout;