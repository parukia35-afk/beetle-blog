import { Schema, model } from "mongoose";

const recordSchema = new Schema({
  genus: {
    type: String,
    required: [true, "屬名必填"],
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
