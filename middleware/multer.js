import cloudinary from "../config/cloudinary.js";
import { CloudinaryStorage } from 'multer-storage-cloudinary'
import multer from "multer";

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "imagesforbookmark",
        allowed_formats: ["jpg", "jpeg", "png"]
    }
})

const upload = multer({ storage })
export default upload