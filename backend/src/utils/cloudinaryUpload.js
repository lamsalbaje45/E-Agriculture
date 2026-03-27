import { cloudinary, isCloudinaryConfigured } from "../config/cloudinary.js";

function createUploadError(message, status = 500) {
  const error = new Error(message);
  error.status = status;
  return error;
}

export async function uploadImageBuffer({ buffer, folder, publicIdPrefix }) {
  if (!isCloudinaryConfigured()) {
    throw createUploadError(
      "Cloudinary credentials are missing. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET."
    );
  }

  if (!buffer) {
    throw createUploadError("No image data found in upload request.", 400);
  }

  return new Promise((resolve, reject) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "image",
        public_id: `${publicIdPrefix}-${uniqueSuffix}`,
      },
      (error, result) => {
        if (error || !result) {
          reject(createUploadError(error?.message || "Failed to upload image to Cloudinary."));
          return;
        }

        resolve({
          secureUrl: result.secure_url,
          publicId: result.public_id,
        });
      }
    );

    stream.end(buffer);
  });
}

export function extractCloudinaryPublicIdFromUrl(url) {
  if (!url || typeof url !== "string" || !url.includes("res.cloudinary.com")) {
    return null;
  }

  const match = url.match(/\/upload\/(?:v\d+\/)?(.+?)\.[a-zA-Z0-9]+(?:\?.*)?$/);
  return match?.[1] || null;
}

export async function destroyCloudinaryImageByUrl(url) {
  if (!isCloudinaryConfigured()) {
    return;
  }

  const publicId = extractCloudinaryPublicIdFromUrl(url);
  if (!publicId) {
    return;
  }

  await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
}
