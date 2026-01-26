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

// 2. 新增一筆新的紀錄
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

// 3. 更新紀錄
export const updateRecord = async (req, res) => {
  try {
    // findByIdAndUpdate 會根據 ID 找到資料並用 req.body 更新
    const result = await Record.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, // 回傳更新後的資料
      runValidators: true // 更新時也要執行 Schema 驗證
    });
    if (!result) return res.status(StatusCodes.NOT_FOUND).json({ message: "找不到資料" });
    res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: "更新失敗" });
  }
};

// 4. 刪除紀錄
export const deleteRecord = async (req, res) => {
  try {
    await Record.findByIdAndDelete(req.params.id);
    res.status(StatusCodes.OK).json({ message: "刪除成功" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "刪除失敗" });
  }
};