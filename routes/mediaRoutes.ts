import express from "express";
const router = express.Router();
import {
  authenticateUser,
  authorizeRoles,
} from "../middleware/authentication";

import {
  createMedia,
  getMedia,
  updateMedia,
} from "../controllers/mediaController";

router
  .route("/")
  .post([authenticateUser, authorizeRoles("admin")], createMedia)
  .get(getMedia);
router
  .route("/:id")
  .patch([authenticateUser, authorizeRoles("admin")], updateMedia);

export default router;
