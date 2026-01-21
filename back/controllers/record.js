import Record from "../models/record.js";
import { StatusCodes } from "http-status-codes";

// 1. 取得所有紀錄
export const getAllRecords = async (req, res) => {
  try {
    const result = await Record.find();
    res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "伺服器錯誤",
    });
  }
};

// 2. 新增一筆新的紀錄 (測試用，現在暫且用不到)
export const createNewRecord = async (req, res) => {
  try {
    const result = new Record(req.body);
    await result.save();
    res.status(StatusCodes.CREATED).json({
      result,
    });
  } catch (error) {
    console.log(error);
    if (error.name === "ValidationError") {
      const key = Object.keys(error.errors)[0];
      const message = error.errors[key].message;
      res.status(StatusCodes.BAD_REQUEST).json({
        message,
      });
    } else if (error.name === "MongoServerError" && error.code === 11000) {
      res.status(StatusCodes.CONFLICT).json({
        message: "資料已存在",
      });
    } else {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: "伺服器錯誤",
      });
    }
  }
};
