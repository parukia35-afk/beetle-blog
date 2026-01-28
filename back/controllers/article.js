import Article from "../models/article.js";
import { StatusCodes } from "http-status-codes";

// 1. 抓取資料庫中所有出現過的物種標籤 (不重複)
export const aboutSpecies = async (req, res) => {
  try {
    // 即使 aboutSpecies 是陣列，distinct 依然會幫你把所有文章的陣列「攤平」並找出唯一值
    // 例如：文章 A 有 ['鋸鍬'], 文章 B 有 ['鋸鍬', '大鍬'] -> 會回傳 ['鋸鍬', '大鍬']
    const result = await Article.distinct("aboutSpecies");
    res.status(StatusCodes.OK).json({ result });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "伺服器錯誤" });
  }
};

// 2. 建立文章
export const createArticle = async (req, res) => {
  try {
    const result = await Article.create({
      ...req.body,
      image: req.file?.filename || "", // 封面圖 Cloudinary ID
    });
    res.status(StatusCodes.OK).json({
      message: "文章建立成功",
      result,
    });
  } catch (error) {
    if (error.name === "ValidationError") {
      const key = Object.keys(error.errors)[0];
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: error.errors[key].message });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: "伺服器錯誤" });
    }
  }
};

// 3. 獲取所有文章清單 (給前台卡片用，排除龐大的 content 欄位)
export const getAllArticles = async (req, res) => {
  try {
    // 關鍵亮點：使用 .select('-content') 
    // 這樣在抓清單時不會抓到萬字長文的 HTML，讓 API 回應速度快 10 倍！
    const result = await Article.find({ display: true }).select('-content')
    res.status(StatusCodes.OK).json({ result })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '伺服器錯誤' })
  }
}

// 4. 根據 ID 獲取單篇文章內容 (給文章內頁用，這時才抓 content)
export const getByArticleId = async (req, res) => {
  try {
    const result = await Article.findById(req.params.id)
    if (!result) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: '找不到文章' })
    }
    res.status(StatusCodes.OK).json({ result })
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: '伺服器錯誤' })
  }
}