import express from "express";
import { refreshAccessToken } from "../controllers/refreshAccessToken.controller.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import { isAuthenticated } from "../middleware/isAuthenticated.middleware.js";

const router = express.Router();

router.post("/refresh", refreshAccessToken);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    try {
      const token = jwt.sign(
        { id: req.user._id, role: req.user.role },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: "15m" }
      );
      res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`);
    } catch (error) {
      console.log("Google login error :", error);
      res.redirect(`${process.env.CLIENT_URL}/login?error=google_failed`);
    }
  }
);

router.get("/me", isAuthenticated, (req, res) =>
  res.json({ success: true, user: req.user })
);

export default router;
