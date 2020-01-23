import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { CatService } from './cat.service'
import { CatSchema } from './cat.schema'
import { CatController } from './cat.controller'
import { CatLogic } from './cat.logic'
import { NumberCatSchema } from './number-cat.schema'
import { NumberCatService } from './number-cat.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Cat', schema: CatSchema },
      { name: 'NumberCat', schema: NumberCatSchema }
    ])
  ],
  controllers: [
    CatController
  ],
  providers: [
    CatService,
    NumberCatService,
    CatLogic
  ],
})
export class CatsModule {}
