import express from "express";
const router = express.Router();
import { authenticateUser, authorizeRoles } from "../middleware/authentication";

import {
  createPolicy,
  getPolicy,
  updatePolicy,
} from "../controllers/policyController";

router
  .route("/")
  .post(authenticateUser, authorizeRoles("admin"), createPolicy)
  .get(getPolicy);
router
  .route("/:id")
  .patch(authenticateUser, authorizeRoles("admin"), updatePolicy);
  
export default router;
