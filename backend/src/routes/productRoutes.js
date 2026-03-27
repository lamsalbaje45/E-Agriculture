import express from "express";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";
import { uploadProductPhoto } from "../middleware/upload.js";
import {
  createProduct,
  deleteProduct,
  getProductById,
  listProducts,
  updateProduct,
} from "../controllers/productController.js";

const router = express.Router();

router.get("/", listProducts);
router.get("/:id", getProductById);
router.post("/", authenticate, authorize("farmer", "admin"), uploadProductPhoto.single("image"), createProduct);
router.put("/:id", authenticate, authorize("farmer", "admin"), uploadProductPhoto.single("image"), updateProduct);
router.delete("/:id", authenticate, authorize("farmer", "admin"), deleteProduct);

export default router;
