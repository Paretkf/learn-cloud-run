import { Document } from 'mongoose'
export interface CatInterface extends Document {
  name: string
  age: number
  breed: string
  status: string
}
