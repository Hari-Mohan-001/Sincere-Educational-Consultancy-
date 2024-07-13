import cloudinary from "../config/cloudinaryConfig";

export const cloudinaryUpload = async (image: string): Promise<string> => {
  try {
    const result = await cloudinary.uploader.upload(image, {
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
      console.log("erort");

      throw new Error("An unknown error occurred");
    }
  }
};
