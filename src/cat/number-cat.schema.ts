import * as mongoose from 'mongoose'

export const NumberCatSchema = new mongoose.Schema({
  catId: {
    type: String,
    require: true
  },
  number: {
    type: Number,
    require: true
  }
}, { collection: 'numberCats', versionKey: false })
