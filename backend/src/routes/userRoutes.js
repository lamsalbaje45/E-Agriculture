import express from "express";
import { authenticate } from "../middleware/auth.js";
import { authorize } from "../middleware/role.js";
import { deleteUser, listUsers, updateProfile } from "../controllers/userController.js";
import { uploadProfilePhoto } from "../middleware/upload.js";

const router = express.Router();

router.get("/", authenticate, authorize("admin"), listUsers);
router.put("/profile", authenticate, uploadProfilePhoto.single("photo"), updateProfile);
router.delete("/:id", authenticate, authorize("admin"), deleteUser);

export default router;
