import { Model, ClientSession } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { CatInterface } from './cat.interface'
import { CreateCatInput } from './cat.dto'
import { NumberCatInterface } from './number-cat.interface'

@Injectable()
export class NumberCatService {
  constructor(@InjectModel('NumberCat') private readonly NumberCatModel: Model<NumberCatInterface>) {}

  getModel() {
    return this.NumberCatModel
  }

  async incrementCat (catId, amount): Promise<NumberCatInterface[]> {
    return await this.NumberCatModel.updateOne({ catId }, { $inc: { number: amount }}, { upsert: true })
  }

  findOne (condition, project?) {
    return this.NumberCatModel.findOne(condition, project)
  }
}
