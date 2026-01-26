import Product from "../models/product.js";
import { StatusCodes } from "http-status-codes";
import validate from "validator";

export const create = async (req, res) => {
  try {
    const result = new Product({ ...req.body, image: req.file.filename });
    await result.save();
    res.status(StatusCodes.CREATED).json({
      result,
    });
  } catch (error) {
    console.log(error);
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

export const update = async (req, res) => {
  try {
    if (!validator.isMongoID(req.params.id)) {
      throw new Error("ID");
    }
    const result = await Product.findByIdAndUpdate(
      req.params.id,
      { ...req.body, image: req.file.path },
      { new: true, runValidators: true },
    ).orFail(new Error("ID"));
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
