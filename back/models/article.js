import { Schema, model } from "mongoose";
import validator from "validator";

const articleSchema = new Schema(
  {
    title: { type: String, required: [true, "標題必填"] },
    content: { type: String, required: [true, "內容必填"] },

    //    不建議寫死在後端，否則每次养新蟲都要改程式碼
    // 維度一：進度狀態 (固定且必填)
    isCompleted: {
      type: String,
      enum: ["連載中", "已完成"],
      default: "連載中",
    },

    // 維度二：文章屬性 (預留擴充性)
    category: {
      type: String,
      enum: ["飼育紀錄", "翻譯文章", "科普知識"], // 視需求增加
      required: [true, "請選擇文章屬性"],
    },

    // 維度三：物種分類 (動態增長，不設 enum)
    // 設定為陣列，若沒填或 category 為翻譯文章，則保持空陣列 [] 即可
    aboutSpecies: {
      type: [String],
      default: [],
    },

    image: { type: String, default: "" },
    description: { type: String },
    display: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

export default model("Article", articleSchema, "articles");
