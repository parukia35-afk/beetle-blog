import { Schema, model } from "mongoose";
import cloudinary from "../cloudinary/cloudinary.js";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "商品名稱必填"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "價格必填"],
      min: [0, "價格不能小於 0"],
    },
    description: {
      type: String,
      required: [true, "商品描述必填"],
      trim: true,
    },
    image: {
      type: String,
      default: "",
    },
    category: {
      type: String,
      enum: {
        values: ["成蟲", "幼蟲", "耗材||工具", "其他"],
        message: "無效的商品類別",
      },
      required: [true, "分類必填"],
    },
    sell: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true }, // 加了才會出現虛擬欄位
    toObject: { virtuals: true }, // 加了才會出現虛擬欄位
  },
);

/* 
虛擬動態欄位(並不存在資料庫)
schema.virtual(欄位名稱).get(資料產生方式)
*/
productSchema.virtual('imageUrl').get(function(){
  const product = this // this = 現在處理的這筆資料
  return cloudinary.url(product.image) // 用 cloudinary圖片ID 取得圖片網址
})

export default model("Products", productSchema);
