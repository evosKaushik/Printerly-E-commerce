import express from "express";
import {
  login,
  register,
  profile,
  verify,
  logout,
  resendVerificationLink,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/verify", verify);
router.get("/profile", isAuthenticated, profile);
router.post("/logout", isAuthenticated, logout);
router.post("/resendVerificationLink", resendVerificationLink);

export default router;
