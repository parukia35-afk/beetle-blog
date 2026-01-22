// auth.js 是middleware，就像守門員，會照 passport.js定義的規則檢查 req。
import passport from "passport";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

export const login = (req,res,next)=>{
  passport.authenticate('login',{session:false},(error,user,info)=>{
    if(error||!user){
      if(error?.message ==='帳號或密碼錯誤'||info?.message === 'Missing credentials'){
        res.status(StatusCodes.UNAUTHORIZED).json({
          message:'帳號或密碼錯誤'
        })
      }else{
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
          message:'伺服器錯誤'
        })
      }
    }else{
      req.user = user // 在前端傳來的資料中，開一個key為user的欄位，然後將我們在 passport.js從資料庫比對後產生的特殊物件放進去當值
      // 在「後端處理這筆請求的公文袋 (req)」中，開一個自訂的 user 欄位，把 Passport 幫我們從資料庫撈出的「整份身分檔案 (user 物件)」放進去，好讓後面的程式碼使用。
      // 前端傳來的原始資料：通常住在 req.body 裡面（例如 account 和 password）。後端產生的加工資料：住在 req 的其他地方。  by Gemini
      next()
    }
  })(req,res,next)
}