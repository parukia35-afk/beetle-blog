import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { StatusCodes } from "http-status-codes";

// 設定 cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 設定上傳
const upload = multer({
  storage:new CloudinaryStorage({ // 設定應該存放的地方
    cloudinary,
  }),
  limits:
})