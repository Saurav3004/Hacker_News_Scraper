import express from "express";
import { getBookmarks } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/bookmarks", protect, getBookmarks);

export default router;