import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinaryConfig";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
    params: {
    //@ts-ignore
    folder: "ebooks",
    format: async (req, file) => {
      // You can also check the file type and return appropriate format
      return file.mimetype.startsWith("image/") ? "jpg" : "pdf";
    },
    public_id: (req, file) => {
      // Generating a unique ID for each file
      return file.originalname.split(".")[0];
    },
  },
});

const upload = multer({ storage: storage });

export default upload;
