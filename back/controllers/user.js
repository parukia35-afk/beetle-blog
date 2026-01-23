import User from "../models/user.js";
import { StatusCodes } from "http-status-codes";
import validator from "validator";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const result = new User(req.body);
    await result.save();
    res.status(StatusCodes.CREATED).json({ message:'註冊成功' });
  } catch (error) {
    console.log("USER_CONTROLLER", error);
    if (error.name === "ValidationError") {
      const key = Object.keys(error.errors)[0];
      const message = error.errors[key].message;
      res.status(StatusCodes.BAD_REQUEST).json({ message });
    } else if (error.name === "MongoServerError" && error.code === 11000) {
      res.status(StatusCodes.CONFLICT).json({ message: "該帳號已存在" });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "伺服器錯誤" });
    }
  }
};

export const login = async (req, res) => {
  try {
    const token = jwt.sign({ _id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "7 days",
    });
    req.user.tokens.push(token);
    await req.user.save();
    res.status(StatusCodes.OK).json({
      result: {
        account: req.user.account,
        role: req.user.role,
        token,
      },
    });
  } catch (error) {
    console.log("USER_CONTROLLER", error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "伺服器錯誤",
    });
  }
};

export const logout = async(req,res)=>{
  try {
    
  } catch (error) {
    
  }
}