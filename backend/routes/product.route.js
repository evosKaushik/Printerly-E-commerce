import express from "express";
import {
  addProduct,
  deleteProduct,
  getAllProduct,
  updateProduct,
} from "../controllers/product.controller.js";
import { isAuthenticated } from "../middleware/isAuthenticated.middleware.js";
import { isAdmin } from "../middleware/isAdmin.middleware.js";
import { multipleUpload, productUpload } from "../middleware/multer.js";

const router = express.Router();

router.post("/add", isAuthenticated, isAdmin, productUpload, addProduct);
router.get("/get-all-product",  getAllProduct);
router.delete("/delete/:productId", isAuthenticated, isAdmin, deleteProduct);
router.put(
  "/update/:productId",
  isAuthenticated,
  isAdmin,
  multipleUpload,
  updateProduct
);

export default router;
