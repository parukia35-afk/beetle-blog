import { Router } from "express";
import * as user from "../controllers/user.js";
import * as auth from "../middlewares/auth.js";

const router = Router();

// 定義路徑
router.post("/register", user.register);
router.post("/login", auth.login, user.login);
router.delete("/logout", auth.token, user.logout);

export default router;
