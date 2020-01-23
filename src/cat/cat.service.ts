import { Model, ClientSession } from 'mongoose'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { CatInterface } from './cat.interface'
import { CreateCatInput } from './cat.dto'

@Injectable()
export class CatService {
  constructor(@InjectModel('Cat') private readonly catModel: Model<CatInterface>) {}

  getModel() {
    return this.catModel
  }

  async create(createCat: CreateCatInput, session: ClientSession): Promise<CatInterface> {
    const createdCat = new this.catModel({...createCat})
    return await createdCat.save(session)
  }

  async findAll(): Promise<CatInterface[]> {
    const result = await this.catModel.find()
    return result
  }
}
