import express from "express";
import upload from "../middleware/uploadMiddleware";
import {
  createEbook,
  deleteEbook,
  getAllEbooks,
  getPurchasedEbooks,
  getSingleEbook,
  markEbookAsPaid,
  updateEbook,
} from "../controllers/ebookController";
import { authenticateUser, authorizeRoles } from "../middleware/authentication";

const router = express.Router();

router
  .route("/")
  .post(
    authenticateUser,
    authorizeRoles("admin"),
    upload.fields([
      { name: "cover_img", maxCount: 1 },
      { name: "ebook_file", maxCount: 1 },
    ]),
    createEbook
  )
  .get(getAllEbooks);

router.get(
  "/purchased",
  authenticateUser,
  authorizeRoles("user"),
  getPurchasedEbooks
);

router
  .route("/:id")
  .get(getSingleEbook)
  .patch(
    authenticateUser,
    authorizeRoles("admin"),
    upload.fields([
      { name: "cover_img", maxCount: 1 },
      { name: "ebook_file", maxCount: 1 },
    ]),
    updateEbook
  )
  .delete(authenticateUser, authorizeRoles("admin"), deleteEbook);

router.get(
  "/:id/mark-paid",
  authenticateUser,
  authorizeRoles("user"),
  markEbookAsPaid
);

export default router;
