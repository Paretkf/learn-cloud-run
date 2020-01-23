import { Document } from 'mongoose'
export interface NumberCatInterface extends Document {
  catId: string
  number: number
}
