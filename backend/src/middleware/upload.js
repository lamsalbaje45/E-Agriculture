import multer from "multer";
import fs from "fs";
import path from "path";

const uploadDir = path.resolve("d:/SYP/backend/uploads/profiles");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, uploadDir);
  },
  filename(req, file, cb) {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const safeExt = ext || ".jpg";
    cb(null, `profile-${req.user?.id || "user"}-${Date.now()}${safeExt}`);
  },
});

function fileFilter(req, file, cb) {
  if (file.mimetype?.startsWith("image/")) {
    cb(null, true);
    return;
  }

  cb(new Error("Only image uploads are allowed."));
}

export const uploadProfilePhoto = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
