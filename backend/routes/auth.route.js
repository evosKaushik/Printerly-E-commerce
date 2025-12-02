import express from "express";
import { refreshAccessToken } from "../controllers/refreshAccessToken.controller.js";

const router = express.Router();

router.post("/refresh", refreshAccessToken);

export default router;
