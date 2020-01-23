import { Injectable} from '@nestjs/common'
import { CreateCatInput } from './cat.dto'
import { CatService } from './cat.service'
import { NumberCatService } from './number-cat.service'
import { runTransaction, runTransactionWithRetry } from './cat.utils'
@Injectable()
export class CatLogic {
  constructor(
    private readonly catService: CatService,
    private readonly numberCateService: NumberCatService
  ) {}

  async createCatLogic(cat: CreateCatInput) {
    const colorModel = this.catService.getModel()
    await colorModel.createCollection()
    const session = await colorModel.db.startSession()
    const cb = async (param) => {
      const cat = param.cat
      const createData = await this.catService.create(cat, session)
      await this.numberCateService.incrementCat(createData['_id'], 1)
      return createData
    }
    return await runTransaction(session, cb, { cat })
  }

  async incrementCatV1 (catId, amount) {
    const colorModel = this.catService.getModel()
    await colorModel.createCollection()
    const session = await colorModel.db.startSession()
    const cb = async (param) => {
      const { catId, amount } = param
      await this.numberCateService.incrementCat(catId, amount)
      return await this.numberCateService.findOne({ catId })
    }
    return await runTransaction(session, cb, { catId, amount })
  }

  async incrementCatV2 (caiId, amount) {
    const colorModel = this.catService.getModel()
    await colorModel.createCollection()
    const session = await colorModel.db.startSession()
    const cb = async (param) => {
      const { caiId, amount } = param
      await this.numberCateService.incrementCat(caiId, amount)
      return await this.numberCateService.findOne({ caiId })
    }
    return await runTransactionWithRetry(session, cb, { caiId, amount })
  }
}
