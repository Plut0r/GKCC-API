import express from "express";
const router = express.Router();

import { authenticateUser, authorizeRoles } from "../middleware/authentication";
import { showCurrentUser, getAllUsers } from "../controllers/userController";

router.route("/").get(authenticateUser, authorizeRoles("admin"), getAllUsers);
router.route("/showMe").get(authenticateUser, showCurrentUser);

export default router;
