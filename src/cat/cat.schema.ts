import * as mongoose from 'mongoose'
import { CatStatusEnum } from './cat.enum'

export const CatSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  age: {
    type: Number,
    require: true
  },
  breed: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    enum: Object.values(CatStatusEnum),
    default: CatStatusEnum.ACTIVE
  }
}, { collection: 'cats', versionKey: false })
