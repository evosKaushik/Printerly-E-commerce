import jwt from "jsonwebtoken";
import { Session } from "../models/Session.model.js";

export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({ message: "No refresh token found" });

    const session = await Session.findOne({ refreshToken, isValid: true });
    if (!session) return res.status(403).json({ message: "Invalid session" });

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    // 🔑 Create new access token
    const newAccessToken = jwt.sign(
      { id: decoded.id, role: decoded.role },
      process.env.JWT_ACCESS_SECRET,
      { expiresIn: "15m" }
    );

    res.json({ success: true, accessToken: newAccessToken });
  } catch (err) {
    return res
      .status(403)
      .json({ message: "Invalid or expired refresh token" });
  }
};
