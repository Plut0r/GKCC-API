import express from "express";
const router = express.Router();

import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
} from "../controllers/adminAuthController";

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/logout", logoutAdmin);

export default router;


