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
  storage: new CloudinaryStorage({
    // 設定應該存放的地方
    cloudinary,
  }),
  limits: {
    fileSize: 1024 * 1024,
  },
  flieFilter: (req, file, callback) => {
    if (["image/png", "image/jpg", "image/jpeg"].includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
});

export default (req, res, next) => {
  upload.single("image")(req, res, (error) => {
    if (error) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: "上傳失敗",
      });
    } else {
      next();
    }
  });
};
