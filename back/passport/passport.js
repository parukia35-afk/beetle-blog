// passport.js 定義了驗證的規則
import passport from "passport";
import passportLocal from "passport-local";
import passportJWT from "passport-jwt";
import bcrypt from "bcrypt";
import User from "../models/user.js";

// 用法: passport.use('自訂規則名', 驗證策略(策略設定,策略執行後處理))
passport.use(
  "login", // ※自訂規則名
  new passportLocal.Strategy( // 驗證策略
    { // ※策略設定
      usernameField: "account", // 檢查 account欄位
      passwordField: "password", // 檢查 password欄位
    },
    async (account, password, done) => { // ※策略執行後處理
      try {
        const user = await User.findOne({ account }).orFail( // 去資料找有沒有叫 account的人
          new Error("帳號或密碼錯誤"),
        );
        const match = await bcrypt.compare(password, user.password); // 比對前端傳進來的明碼password和加密過後的亂碼是不是一樣
        if (!match) {
          throw new Error("帳號或密碼錯誤");
        }
        done(null, user); // 都沒問題，放行
      } catch (error) {
        done(error);
      }
    },
  ),
);
