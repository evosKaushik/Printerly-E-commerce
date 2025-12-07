import express from "express";
import {
  login,
  register,
  profile,
  verify,
  logout,
  resendVerificationLink,
  updateUser,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.middleware.js";
import { singleUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify", verify);
router.get("/profile", isAuthenticated, profile);
router.post("/logout", isAuthenticated, logout);
router.post("/resendVerificationLink", resendVerificationLink);
router.put("/update-profile/:id", isAuthenticated, singleUpload, updateUser);

export default router;
