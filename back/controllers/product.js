import Product from "../models/product.js";
import { StatusCodes } from "http-status-codes";
import validator from "validator";
import cloudinary from "../cloudinary/cloudinary.js";

// 新增商品
export const create = async (req, res) => {
  try {
    // 1. 強制檢查：如果沒收到檔案，直接回傳錯誤，不要往下執行 .filename
    if (!req.file) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "未收到圖片檔案，請確認欄位名稱或格式" });
    }

    // 2. 只有確定有檔案，才去讀取 filename
    const result = new Product({
      ...req.body,
      image: req.file.filename, // 此時 req.file 確定存在
    });

    await result.save();
    res.status(StatusCodes.CREATED).json({ result });
  } catch (error) {
    console.error("建立商品失敗：", error);
    // ... 後續錯誤處理邏輯
    if (error.name === "ValidationError") {
      const key = Object.keys(error.errors)[0];
      const message = error.errors[key].message;
      res.status(StatusCodes.BAD_REQUEST).json({ message });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "伺服器錯誤" });
    }
  }
};

// 查詢所有商品(限管理員)
export const getAll = async (req, res) => {
  try {
    const result = await Product.find();
    res.status(StatusCodes.OK).json({
      result,
    });
  } catch (error) {
    console.log(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "伺服器錯誤" });
  }
};

// 更新商品
export const update = async (req, res) => {
  try {
    if (!validator.isMongoId(req.params.id)) {
      throw new Error("ID");
    }
    const result = await Product.findById(req.params.id).orFail(
      new Error("ID"),
    );
    // 更新不一定要帶圖片，如果沒有就是沿用舊的；有帶圖片則是刪除舊圖檔
    if (req.file) {
      await cloudinary.uploader.destroy(result.image);
      result.image = req.file.filename;
    }
    // 更新其他資料
    result.set(req.body);
    await result.save();
    res.status(StatusCodes.OK).json({
      result,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const key = Object.keys(error.errors)[0];
      const message = error.errors[key].message;
      res.status(StatusCodes.BAD_REQUEST).json({ message });
    } else if (error.message === "ID") {
      res.status(StatusCodes.NOT_FOUND).json({
        message: "找不到商品",
      });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "伺服器錯誤" });
    }
  }
};

// 刪除商品
export const remove = async (req, res) => {
  try {
    if (!validator.isMongoId(req.params.id)) throw new Error("ID");

    // 1. 先找到這筆資料，我們需要拿到圖片的 public_id
    const result = await Product.findById(req.params.id).orFail(
      new Error("ID"),
    );

    // 2. 刪除 Cloudinary 上的圖片
    // 如果你有預設圖片機制，記得判斷不要刪到預設圖
    if (result.image) {
      await cloudinary.uploader.destroy(result.image);
    }

    // 3. 刪除資料庫紀錄
    await result.deleteOne();

    res.status(StatusCodes.OK).json({ message: "刪除成功" });
  } catch (error) {
    if (error.message === "ID") {
      res.status(StatusCodes.NOT_FOUND).json({ message: "找不到商品" });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "伺服器錯誤" });
    }
  }
};
