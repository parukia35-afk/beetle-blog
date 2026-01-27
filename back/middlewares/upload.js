import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { StatusCodes } from "http-status-codes";
import cloudinary from "../cloudinary/cloudinary.js";

// 設定上傳
const upload = multer({
  storage: new CloudinaryStorage({
    // 設定應該存放的地方
    cloudinary,
  }),
  limits: {
    fileSize: 1024 * 1024,
  },
  fileFilter: (req, file, callback) => {
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
      console.log(req.file)
      next();
    }
  });
};
