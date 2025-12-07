import express from "express";

import { isAuthenticated } from "../middleware/isAuthenticated.middleware.js";
import { getAllUsers } from "../controllers/admin.controller.js";
import { isAdmin } from "../middleware/isAdmin.middleware.js";

const router = express.Router();

router.get("/get-all-users", isAuthenticated, isAdmin, getAllUsers);

export default router;
