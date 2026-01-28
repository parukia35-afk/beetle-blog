import { Router } from "express";
import * as article from "../controllers/article.js";
import * as auth from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const router = Router();

router.get("/", article.getAllArticles); // 文章一覽載入全部文章
router.get("/:id", article.getByArticleId); // 載入單一文章全部內容

router.post("/", auth.token, auth.admin, upload, article.createArticle); // 發文章

router.get("/aboutSpecies",article.aboutSpecies) // 後台或前台抓取分類標籤
export default router;
