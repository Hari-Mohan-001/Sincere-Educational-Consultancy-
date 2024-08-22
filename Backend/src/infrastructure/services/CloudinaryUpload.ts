import cloudinary from "../config/cloudinaryConfig";

export const cloudinaryUpload = async (
  image: string,
  folder: string
): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: folder,
      upload_preset: "Image-Preset",
      allowed_formats: ["jpg", "png", "svg", "webp", "ico"],
    });
    return result.secure_url;
  } catch (error) {
    if (error instanceof Error) {
      console.log("err", error.message);
      if (error.message.includes("Invalid format")) {
        throw new Error("Invalid file format. Please upload an image file.");
      }
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};

export const cloudinaryUploadMultiple = async (
  images: string[],
  folder: string
): Promise<string[]> => {
  try {
    const uploadAllImages = images.map((image) =>
      cloudinaryUpload(image, folder)
    );
    const result = await Promise.all(uploadAllImages);
    return result;
  } catch (error) {
    if (error instanceof Error) {
      console.log("err", error.message);
      throw new Error(error.message);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
