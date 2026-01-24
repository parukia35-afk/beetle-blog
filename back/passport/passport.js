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
    {
      // ※策略設定
      usernameField: "account", // 檢查 account欄位
      passwordField: "password", // 檢查 password欄位
    },
    async (account, password, done) => {
      // ※策略執行後處理
      try {
        const user = await User.findOne({ account }).orFail(
          // 去資料找有沒有叫 account的人
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

passport.use(
  "jwt",
  new passportJWT.Strategy(
    {
      jwtFromRequest: passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken(), // 去Headers的Authorization欄位，看Bearer後面的字
      secretOrKey: process.env.JWT_SECRET, // 用.env設定的 JWT_SECRET 解碼
      passReqToCallback: true,
      ignoreExpiration: true, // 忽略過期檢查
    },
    async (req, payload, done) => {
      try {
        const token = passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken()(req); // 從req取token
        // JWT由三段構成。前段Header(alg)；中段Payload，解密後是一個物件，放著_id(該帳號在資料庫的_id)、exp(過期時間)、iat(簽發時間)；後段Signature，作用是防偽標籤，由JWT_SECRET運算產生。
        const expired = payload.exp * 1000 < Date.now(); // 檢查是否過期
        const url = req.baseUrl + req.path; // 組合請求路徑
        if (expired && url !== "/user/refresh" && url !== "/user/logout") {
          throw new Error("EXP");
        }
        const user = await User.findOne({
          // 去資料庫檢查該使用者是否存在、是否有這個 token，並把該使用者的完整原始資料帶出來存進 user變數
          _id: payload._id,
          tokens: token,
        }).orFail(new Error("USER"));
        done(null, { user, token }); // 驗證成功，下一步
      } catch (error) {
        done(error);
      }
    },
  ),
);
