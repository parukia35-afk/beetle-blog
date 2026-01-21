import { Schema, model } from "mongoose";

const recordSchema = new Schema({
  genus: {
    type: String,
    required: [true, "屬名必填"],
    unique:true,
    sparse: true, // 允許存在多筆空值而不觸發 unique 的檢查(如果這筆資料的這個欄位是空的，就不要把它放進唯一性的檢查清單裡。)
  },
  commonName: {
    type: String,
  },
  scientificName: {
    type: String,
    required: [true, "學名必填"],
  },
  captiveRecord: {
    type: Number,
    min:0,
  },
  wildRecord: {
    type: Number,
    min:0,
  },
  japaneseName: {
    type: String,
    required: [true, "日文名必填"],
  },
  year: {
    type: Number,
  },
},{
  timestamps: true,
  versionKey: false
});

export default model('Record', recordSchema,'BekuwaRecords')
