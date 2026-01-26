import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "商品名稱必填"],
    trim:true,
  },
  price: {
    type: Number,
    required: [true, "價格必填"],
    min: [0, "價格不能小於 0"],
  },
  description: {
    type: String,
    required: [true, "商品描述必填"],
    trim:true,
  },
  image: {
    type: String,
    default: "",
  },
  category: {
    type: String,
    enum: {
      values:["成蟲", "幼蟲", "耗材||工具", "其他"],
      message:'無效的商品類別'
    },
    required: [true, "分類必填"],
  },
  sell: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
  versionKey: false
});

export default model('Products', productSchema);