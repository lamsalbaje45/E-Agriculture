import multer from "multer";
import fs from "fs";
import path from "path";

const uploadsRootDir = path.resolve("d:/SYP/backend/uploads");

function createImageUploader({ subDir, filePrefix }) {
  const uploadDir = path.join(uploadsRootDir, subDir);
  fs.mkdirSync(uploadDir, { recursive: true });

  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, uploadDir);
    },
    filename(req, file, cb) {
      const ext = path.extname(file.originalname || "").toLowerCase();
      const safeExt = ext || ".jpg";
      cb(null, `${filePrefix}-${req.user?.id || "user"}-${Date.now()}${safeExt}`);
    },
  });

  return multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
  });
}

function fileFilter(req, file, cb) {
  if (file.mimetype?.startsWith("image/")) {
    cb(null, true);
    return;
  }

  cb(new Error("Only image uploads are allowed."));
}

export const uploadProfilePhoto = createImageUploader({
  subDir: "profiles",
  filePrefix: "profile",
});

export const uploadProductPhoto = createImageUploader({
  subDir: "products",
  filePrefix: "product",
});
