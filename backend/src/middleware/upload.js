import multer from "multer";

function createImageUploader() {
  const storage = multer.memoryStorage();

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

export const uploadProfilePhoto = createImageUploader();

export const uploadProductPhoto = createImageUploader();
